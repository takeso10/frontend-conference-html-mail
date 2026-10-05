import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Section,
  Text,
} from '@react-email/components';
import { FC } from 'react';
import { colors, fontFamily, light, logos } from '../../styles/theme';

/**
 * MailCombinedSafe に、CSS の背景色で塗った黄色を戻した比較用の例。
 * 黄色を「明るさ 50% 前後」の色にすると、自動反転でどれくらい変わらずに済むかを確かめる。
 *
 * 自動反転は、おおむね色相を保ったまま明るさだけをひっくり返す。
 *   - #FFD43B（HSL の明るさ 62%）: 反転すると 38% になり、くすんだからし色になる
 *   - #FFBF00（HSL の明るさ 50%）: 反転しても 50% のままなので、理屈の上ではほぼ変わらない
 *
 * 確かめたいこと
 *   1. ヘッダーとボタンの黄色が、Gmail / Outlook の自動反転でどれくらい変わるか
 *   2. 黄色の上の黒文字が、反転で白くなって読みにくくならないか
 *
 * カード・箱・枠線・注釈の色づかいは MailCombinedSafe と同じ。
 */

/** ライトモードの色。 */
const palette = {
  page: light.bgPage,
  card: colors.white,
  codeBox: colors.gray100,
  line: '#D5DAE0',
  text: colors.black,
  muted: colors.gray700,
  brand: '#FFBF00',
  brandText: colors.black,
} as const;

/** ダークモードで見せたい色。Apple Mail ではこの通りになる。 */
const style = `
  @media (prefers-color-scheme: dark) {
    .bg-page { background-color: #0E0F11 !important; }
    .bg-card { background-color: #1E2024 !important; border-color: #3A3E44 !important; }
    .code-box { background-color: #2E3238 !important; border-color: #3A3E44 !important; }
    .text-primary { color: ${colors.white} !important; }
    .text-muted { color: ${colors.gray400} !important; }
    .divider { border-top-color: #3A3E44 !important; }
    /* ブランド色は変えない */
    .brand { background-color: ${palette.brand} !important; color: ${palette.brandText} !important; }
  }
`;

export const MailCombinedSafeYellow: FC = () => {
  return (
    <Html lang="ja">
      <Head>
        <meta content="width=device-width" name="viewport" />
        <meta content="light dark" name="color-scheme" />
        <meta content="light dark" name="supported-color-schemes" />
        <style>{style}</style>
      </Head>
      <Body style={{ margin: 0, fontFamily }}>
        <Section
          className="bg-page"
          style={{ backgroundColor: palette.page, padding: '40px 0' }}
        >
          <Container style={{ width: '100%', maxWidth: '600px', margin: '0 auto' }}>
            {/* ロゴは白い板付きの PNG。暗い背景でも沈まない。 */}
            <Section style={{ paddingBottom: '24px', textAlign: 'center' }}>
              <Img
                alt="Sample"
                height={48}
                src={logos.plate}
                style={{ margin: '0 auto' }}
              />
            </Section>

            {/* 1・2: CSS で塗った黄色のヘッダーに、黒文字の見出し。 */}
            <Section
              className="brand"
              style={{
                backgroundColor: palette.brand,
                borderRadius: '16px 16px 0 0',
                padding: '24px 40px',
                textAlign: 'center',
              }}
            >
              <Text
                className="brand"
                style={{
                  margin: 0,
                  fontSize: '20px',
                  fontWeight: 'bold',
                  color: palette.brandText,
                }}
              >
                ログイン認証コード
              </Text>
            </Section>

            {/* カードはページとの差を広げ、枠線で区切る。上のヘッダーとつながるよう上辺の線は消す。 */}
            <Section
              className="bg-card"
              style={{
                backgroundColor: palette.card,
                border: `1px solid ${palette.line}`,
                borderTop: 'none',
                borderRadius: '0 0 16px 16px',
                padding: '40px',
              }}
            >

              <Text
                className="text-primary"
                style={{
                  margin: 0,
                  fontSize: '16px',
                  lineHeight: 1.7,
                  color: palette.text,
                }}
              >
                ログイン画面で、以下の認証コードを入力してください。
              </Text>

              {/* コードの箱も枠線で区切る。反転後に背景色の差が縮んでも、箱の形が残る。 */}
              <Section
                className="code-box"
                style={{
                  backgroundColor: palette.codeBox,
                  border: `1px solid ${palette.line}`,
                  borderRadius: '12px',
                  margin: '24px 0',
                  padding: '24px',
                }}
              >
                <Text
                  className="text-primary"
                  style={{
                    margin: 0,
                    fontSize: '32px',
                    fontWeight: 'bold',
                    letterSpacing: '8px',
                    lineHeight: 1.2,
                    textAlign: 'center',
                    color: palette.text,
                  }}
                >
                  123456
                </Text>
              </Section>

              {/* 1・2: CSS で塗った黄色のボタンに、黒文字。 */}
              <Section style={{ textAlign: 'center' }}>
                <Button
                  className="brand"
                  href="https://example.com/login"
                  style={{
                    backgroundColor: palette.brand,
                    borderRadius: '8px',
                    color: palette.brandText,
                    fontSize: '16px',
                    fontWeight: 'bold',
                    padding: '14px 32px',
                  }}
                >
                  ログイン画面を開く
                </Button>
              </Section>

              <Hr
                className="divider"
                style={{
                  border: 'none',
                  borderTop: `1px solid ${palette.line}`,
                  margin: '32px 0 24px',
                }}
              />

              {/* 注釈は濃いめのグレー。反転後も背景との差が保たれる。 */}
              <Text
                className="text-muted"
                style={{
                  margin: 0,
                  fontSize: '13px',
                  lineHeight: 1.7,
                  color: palette.muted,
                }}
              >
                このコードの有効期限は10分です。心当たりがない場合は、このメールを破棄してください。
              </Text>
            </Section>

            <Text
              className="text-muted"
              style={{
                margin: '32px 0 0',
                fontSize: '12px',
                textAlign: 'center',
                color: palette.muted,
              }}
            >
              Sample Inc.
            </Text>
          </Container>
        </Section>
      </Body>
    </Html>
  );
};

export default MailCombinedSafeYellow;
