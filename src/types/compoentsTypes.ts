export type Classnames<T extends string> = {
  [P in T]?: string;
};

export type SizeType =
  | 'qr'
  | 'tr'
  | 'big'
  | 'db'
  | 'xxl'
  | 'xl'
  | 'lg'
  | 'df'
  | 'md'
  | 'sm'
  | 'xs'
  | 'xxs'
  | 'us'
  | 'uxs'
  | 'uxxs';
export type ColorType =
  | 'black'
  | 'white'
  | 'body'
  | 'grey'
  | 'grey-2'
  | 'grey-3'
  | 'grey-4'
  | 'grey-5'
  | 'grey-6'
  | 'accent'
  | 'accent-light'
  | 'error'
  | 'success'
  | 'warning'
  | 'info'
  | 'invert'
  | 'invert-light'
  | 'hover';
export type IconPositionType = 'before' | 'after';

// Button
export type ButtonThemeType = 'fill' | 'outline' | 'text';
export type ButtonSizeType = Extract<SizeType, 'tr' | 'db'>;
export type ButtonColorType = Extract<
  ColorType,
  | 'grey'
  | 'grey-2'
  | 'invert'
  | 'invert-light'
  | 'accent'
  | 'error'
  | 'success'
  | 'warning'
>;

// ButtonIcon
export type ButtonIconThemeType = 'fill' | 'outline' | 'ghost';
export type ButtonIconSizeType = Extract<SizeType, 'tr' | 'big' | 'db' | 'xxl'>;
export type ButtonIconColorType = Extract<
  ColorType,
  | 'grey'
  | 'grey-2'
  | 'invert'
  | 'invert-light'
  | 'accent'
  | 'error'
  | 'success'
  | 'warning'
>;

// Divider
export type DividerThemeType = 'line' | 'vertical' | 'space';

// Icon
export type IconColorType = TypoColorType;

// Typo
export type TypoFamilyType = 'main' | 'mono';
export type TypoTagType = 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'label' | 'span';
export type TypoSizeType = Exclude<SizeType, 'us' | 'uxs' | 'uxxs'>;
export type TypoWeightType = 'regular' | 'medium' | 'semi' | 'bold';
export type TypoLineHeightType = 'default' | 'paragraph';
export type TypoColorType = Extract<
  ColorType,
  'grey' | 'grey-2' | 'invert' | 'invert-light' | 'accent' | 'error'
>;
