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