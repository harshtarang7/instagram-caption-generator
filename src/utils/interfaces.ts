// interfaces.ts
import { SelectChangeEvent } from "@mui/material";

export interface BoosterConfig<T = string | number> {
  id: string;
  label: string;
  value: T;
  onChange: (event: SelectChangeEvent<T>) => void;
  options: Array<{ value: T | ""; label: string }>;
  minWidth?: number;
}

export interface CustomDialogBoxProps{
  shortCaption?:string;
  longCaption?:string;
  open:boolean;
  onClose:()=>void;
}

export interface CaptionGenerationPayload {
  description: string;
  hashtags?: number;
  captionLength?: string;
  seo?: string;
  captionVibe?: string;
  aiProvider?: string;
}

export interface CaptionGenerationResponse {
  caption: string;
  success: boolean;
  metadata?: {
    hashtags: number;
    captionLength: string;
    seo: string;
    captionVibe: string;
    aiProvider: string;
  };
  error?: string;
}