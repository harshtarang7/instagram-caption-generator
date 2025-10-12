import { GoogleGenerativeAI } from "@google/generative-ai";
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import * as dotenv from 'dotenv';
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

interface CaptionGenerationParams {
  description: string;
  hashtags?: number;
  captionLength?: string;
  seo?: string;
  captionVibe?: string;
}

function isCaptionGenerationParams(args:unknown): args is CaptionGenerationParams{
  return(
    typeof args === 'object' &&
    args !== null &&
    "description" in args &&
    typeof (args as any).description === "string" &&
    (args as any).description.trim().length > 0
  );
}

class InstagramCaptionServer {
  private server: Server;
  constructor() {
    this.server = new Server(
      {
        name: "instagram-caption-generator-server",
        version: "1.0.0",
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.setupToolHandlers();

    this.server.onerror = (error) => {
      console.log("[MCP Error]", error);
    };

    process.on("SIGINT", async () => {
      await this.server.close();
      process.exit(0);
    });
  }

  private setupToolHandlers() {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: [
        {
          name: "generate_instagram_caption",
          description:
            "Generate an Instagram caption based on description and parameters",
          inputSchema: {
            type: "object",
            properties: {
              description: {
                type: "string",
                description: "Description of what the caption should be about",
              },
              hashtags: {
                type: "number",
                description: "Number of hashtags to include (0, 5, 10, 20, 25)",
                enum: [0, 5, 10, 20, 25],
              },
              captionLength: {
                type: "string",
                description: "Length of the caption",
                enum: ["short", "long", "one liner"],
              },
              seo: {
                type: "string",
                description: "SEO optimization level",
                enum: ["low", "medium", "high"],
              },
              captionVibe: {
                type: "string",
                description: "Tone/vibe of the caption",
                enum: [
                  "funny",
                  "serious",
                  "wholesome",
                  "motivational",
                  "aesthetic",
                  "introspective",
                ],
              },
            },
            required: ["description"],
          },
        },
      ],
    }));

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      if (request.params.name === "generate_instagram_caption") {
        const args = request.params.arguments;
        
         if (!isCaptionGenerationParams(args)) {
          throw new Error(
            "Invalid arguments for caption generation. 'description' is required and must be a non-empty string."
          );
        }

        return await this.generateCaption(args as CaptionGenerationParams);
      }

      throw new Error(`Unknown tool :${request.params.name}`);
    });
  }

  private async generateCaption(params: CaptionGenerationParams) {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      // Build the prompt
      let prompt = `Generate an engaging Instagram caption based on the following:\n\n`;
      prompt += `Description: ${params.description}\n\n`;

      if (params.captionLength) {
        prompt += `Length: ${params.captionLength}\n`;
      }

      if (params.captionVibe) {
        prompt += `Tone/Vibe: ${params.captionVibe}\n`;
      }

      if (params.seo) {
        prompt += `SEO Level: ${params.seo} (include relevant keywords naturally)\n`;
      }

      if (params.hashtags && params.hashtags > 0) {
        prompt += `\nInclude ${params.hashtags} relevant hashtags at the end of the caption.\n`;
      }

      prompt += `\nMake it engaging, authentic, and suitable for Instagram. The caption should feel natural and connect with the audience.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const caption = response.text();

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({
              caption: caption,
              success: true,
            }),
          },
        ],
      };
    } catch (error) {
      console.error("Error generating caption:", error);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({
              error: error instanceof Error ? error.message : "Unknown error",
              success: false,
            }),
          },
        ],
        isError: true,
      };
    }
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error("Instagram Caption Generator MCP server running on stdio");
  }
}

const server = new InstagramCaptionServer();
server.run().catch(console.error);
