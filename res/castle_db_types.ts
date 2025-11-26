// These interfaces describe the raw JSON structure coming from CastleDB
// This helps keep the parser type-safe.

export interface CastleDBColumn {
  typeStr: string;
  name: string;
  kind?: string | null;
  scope?: string | null;
  opt?: boolean;
}

export interface CastleDBLine {
  [key: string]: any;
}

export interface CastleDBSheet {
  name: string;
  columns: CastleDBColumn[];
  lines: CastleDBLine[];
  props?: {
    hide?: boolean;
    isProps?: boolean;
  };
  separators?: any[];
}

export interface CastleDBJson {
  sheets: CastleDBSheet[];
  customTypes: any[];
  compress: boolean;
}
