interface BaseBlock {
  type: string;
}

export interface Header {
  parent: string;
  level: 1 | 2 | 3 | 4 | 5 | 6;
  title: string;
  id: string;
}

export interface HeadingBlock extends BaseBlock {
  type: 'heading';
  level: 1 | 2 | 3 | 4 | 5 | 6;
  text: string;
  id: string;
}

export interface ParagraphBlock extends BaseBlock {
  type: 'paragraph';
  text: string;
}

export interface NumberedListBlock extends BaseBlock {
  type: 'numbered_list';
  items: string[];
}

export interface BulletedListBlock extends BaseBlock {
  type: 'bulleted_list';
  items: string[];
}

export interface TableBlock extends BaseBlock {
  type: 'table';
  title?: string;
  subtitle?: string;
  headers: string[];
  rows: string[][];
}

export interface ImageBlock extends BaseBlock {
  type: 'image';
  src: string;
  alt?: string;
  caption?: string;
}

export interface ChartBlock extends BaseBlock {
  type: 'chart';
  chartType: 'line' | 'bar' | 'pie';
  data: Record<string, unknown>[];
  xAxisKey?: string;
  yAxisKey?: string;
}

export interface ComponentBlock extends BaseBlock {
  type: 'component';
  name: string;
  props?: Record<string, unknown>;
}

export type ContentBlock = 
  | HeadingBlock
  | ParagraphBlock
  | NumberedListBlock
  | BulletedListBlock
  | TableBlock
  | ImageBlock
  | ChartBlock
  | ComponentBlock;

export interface Article {
  title: string;
  headers: string[][];
  sections: ContentBlock[];
}
