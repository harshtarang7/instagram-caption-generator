import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      description,
      hashtags = 0,
      captionLength = "",
      seo = "",
      captionVibe = "",
      aiProvider = "gemini",
    } = body;
    if (!description || description.trim().length === 0) {
      return NextResponse.json(
        { error: "Description is required" },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    let prompt = `You are an expert Instagram caption writer. Generate an engaging and authentic Instagram caption based on the following requirements:\n\n`;

    prompt += `Content Description: ${description}\n\n`;

    if (captionLength) {
      const lengthGuide = {
        short: "Keep it brief and punchy (1-2 sentences)",
        long: "Write a longer, detailed caption (4-6 sentences)",
        "one liner": "Create a single impactful line",
      };
      prompt += `Length: ${
        lengthGuide[captionLength as keyof typeof lengthGuide] || captionLength
      }\n`;
    }

    //  vibes
    if (captionVibe) {
      const vibeGuide = {
        funny: "Make it humorous and entertaining",
        serious: "Keep it professional and thoughtful",
        wholesome: "Make it warm, positive, and feel-good",
        motivational: "Make it inspiring and uplifting",
        aesthetic: "Focus on visual and artistic descriptions",
        introspective: "Make it reflective and thought-provoking",
      };
      prompt += `Tone: ${
        vibeGuide[captionVibe as keyof typeof vibeGuide] || captionVibe
      }\n`;
    }

    if (seo) {
      const seoGuide = {
        low: "Include a few basic keywords naturally",
        medium: "Include relevant keywords and phrases for discoverability",
        high: "Optimize heavily with trending keywords and searchable phrases",
      };
      prompt += `SEO Level: ${seoGuide[seo as keyof typeof seoGuide] || seo}\n`;
    }

    // Add hashtag requirement
    if (hashtags > 0) {
      prompt += `\nHashtags: Include exactly ${hashtags} relevant and trending hashtags at the end of the caption. Mix popular hashtags with niche-specific ones.\n`;
    }

    prompt += `\nIMPORTANT:
- Make the caption authentic and relatable
- Use emojis sparingly and naturally
- Ensure it sounds conversational, not robotic
- Format hashtags on a new line if included
- Don't use quotation marks around the caption
- Return ONLY the caption text, nothing else`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let caption = response.text();

    caption = caption.trim();
    caption = caption.replace(/^["']|["']$/g, "");

    return NextResponse.json({
      caption,
      success: true,
      metadata: {
        hashtags,
        captionLength,
        seo,
        captionVibe,
        aiProvider,
      },
    },
    {status:200}
);
  } catch (error) {
     console.error("Error generating caption:", error);
    
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to generate caption",
        success: false,
      },
      { status: 500 }
    );
  }
}
