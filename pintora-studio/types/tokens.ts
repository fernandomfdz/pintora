export type TokenType = 'color' | 'typography' | 'spacing' | 'shadow' | 'radius' | 'opacity' | 'z-index' | 'breakpoint' | 'custom'

export interface Token {
  id: string;
  name: string;
  value: string;
  description?: string;
  type: TokenType;
  group?: string;
}

export interface ColorToken extends Token {
  type: 'color';
  value: string; // Hex color code
}

export interface TypographyToken extends Token {
  type: 'typography';
  value: string; // Font size in px, rem, etc.
  fontFamily?: string;
  fontWeight?: string;
  lineHeight?: string;
  letterSpacing?: string;
}

export interface SpacingToken extends Token {
  type: 'spacing';
  value: string; // Spacing value in px, rem, etc.
}

export interface ShadowToken extends Token {
  type: 'shadow';
  value: string; // Shadow value
}

export interface RadiusToken extends Token {
  type: 'radius';
  value: string; // Border radius value
}

export interface BreakpointToken extends Token {
  type: 'breakpoint';
  value: string; // Breakpoint value
}

export type AnyToken = ColorToken | TypographyToken | SpacingToken | ShadowToken | RadiusToken | BreakpointToken;

export interface TokenGroup {
  id: string;
  name: string;
  type: TokenType;
  tokens: Token[];
}

export interface TokenSystem {
  id: string;
  name: string;
  description?: string;
  groups: TokenGroup[];
}

export type ExportFormat = 'css' | 'scss' | 'json' | 'tailwind';

export interface ExportOptions {
  format: ExportFormat;
  prefix?: string;
  includeTypes?: TokenType[];
}

export interface TokenExportFormat {
  id: string;
  name: string;
  extension: string;
  formatter: (tokens: TokenGroup[]) => string;
}

export interface TokenState {
  groups: TokenGroup[];
  selectedGroup: TokenGroup | null;
  selectedToken: Token | null;
}

export interface TokenExportOptions {
  format: string;
  prefix?: string;
  includeTypes: TokenType[];
} 