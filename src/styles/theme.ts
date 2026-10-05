/** 架空サービス「Sample」のデモ用トークン。 */
export const colors = {
  black: '#16181A',
  white: '#FFFFFF',
  whiteAlpha: '#FFFFFF99',
  blue400: '#8FA8F5',
  blue600: '#2F62E8',
  gray100: '#EEF1F4',
  gray200: '#DDE2E7',
  gray400: '#A6ADB5',
  gray700: '#5A5F65',
  gray900: '#26282B',
  navy900: '#1B2A4A',
} as const;

/** ライトモードで使う色。インラインスタイルにはこの値をそのまま書く。 */
export const light = {
  textPrimary: colors.black,
  textSecondary: colors.gray700,
  bgPage: colors.gray100,
  bgCard: colors.white,
  border: colors.gray200,
} as const;

/** ダークモードで上書きする色。light と同じキーを必ず持たせて、対で管理する。 */
export const dark: Record<keyof typeof light, string> = {
  textPrimary: colors.white,
  textSecondary: colors.gray400,
  bgPage: colors.gray900,
  bgCard: colors.black,
  border: colors.whiteAlpha,
};

const CDN = 'https://cdn.jsdelivr.net/gh/takeso10/frontend-conference-html-mail@main/public';

export const logos = {
  /** 透過PNG。ダークモードで背景が反転すると沈む。 */
  transparent: `${CDN}/logo-transparent.png?v=2`,
  /** 白い板と余白を焼き込んだPNG。どちらのモードでも同じ見え方になる。 */
  plate: `${CDN}/logo-plate.png?v=2`,
  /** 黄色の帯にロゴを焼き込んだヘッダー（600×72 の 2 倍）。画像は自動変換されないので、黄色が保たれる。 */
  brandHeader: `${CDN}/header-brand.png`,
} as const;

export const fontFamily =
  "'Helvetica Neue', Arial, 'Hiragino Sans', 'Yu Gothic', Meiryo, sans-serif";
