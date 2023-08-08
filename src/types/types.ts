export type TextStyle = {
  italic: boolean;
  bold: boolean;
  underline: boolean;
  link: boolean;
  heading: boolean;
};

export type JustifyValue = "left" | "center" | "right";

export type TextSegment = {
  insert: string;
  attributes: TextStyle;
};

export type Paragraph = {
  textSegments: TextSegment[];
  justify: JustifyValue;
};

export type TextConvertedToJSON = {
  paragraphs: Paragraph[];
} | null;

export type CursorPosition = {
  paragraphIndex: number;
  textSegmentIndex: number;
  position: number;
} | null;
