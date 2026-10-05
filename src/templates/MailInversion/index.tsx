import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Section,
  Text,
} from '@react-email/components';
import { FC } from 'react';
import { colors, fontFamily, light } from '../../styles/theme';

/**
 * 「自分で決めたダークの色」と「クライアントが勝手に変えた色」を比べる例。
 *
 * ブランド色が黄色のサービスを想定し、ヘッダーとボタンに黄色を使っている。
 * ダークモードでも、ブランド色の黄色はそのまま残したい。
 *
 *   - Apple Mail: @media が効くので、黄色は黄色のまま、周りだけが暗くなる
 *   - Gmail / Outlook: @media が届かず、自動反転がかかる。
 *                      明るい黄色は「明るい背景」とみなされて暗い色に変わり、ブランド色が崩れる
 */

/** ブランド色。明るい色ほど、自動反転で大きく変わる。 */
const brand = {
  bg: '#FFD43B',
  text: colors.black,
} as const;

/** ダークモードで見せたい色。Apple Mail ではこの通りになる。 */
const style = `
  @media (prefers-color-scheme: dark) {
    .bg-page { background-color: ${colors.gray900} !important; }
    .bg-card { background-color: ${colors.black} !important; }
    .text-primary { color: ${colors.white} !important; }
    .text-secondary { color: ${colors.gray400} !important; }
    .code-box { background-color: ${colors.gray900} !important; }
    /* ブランド色は変えない */
    .brand { background-color: ${brand.bg} !important; color: ${brand.text} !important; }
  }
`;

export const MailInversion: FC = () => {
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
          style={{ backgroundColor: light.bgPage, padding: '40px 0' }}
        >
          <Container style={{ width: '100%', maxWidth: '600px', margin: '0 auto' }}>
            {/* ブランド色のヘッダー。自動反転では黄色が暗い色に変わる。 */}
            <Section
              className="brand"
              style={{
                backgroundColor: brand.bg,
                color: brand.text,
                borderRadius: '16px 16px 0 0',
                padding: '24px 40px',
              }}
            >
              <Text
                className="brand"
                style={{
                  margin: 0,
                  fontSize: '24px',
                  fontWeight: 'bold',
                  color: brand.text,
                }}
              >
                Sample
              </Text>
            </Section>

            <Section
              className="bg-card"
              style={{
                backgroundColor: light.bgCard,
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
                  color: light.textPrimary,
                }}
              >
                ログイン画面で、以下の認証コードを入力してください。
              </Text>

              <Section
                className="code-box"
                style={{
                  backgroundColor: light.bgPage,
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
                    color: light.textPrimary,
                  }}
                >
                  123456
                </Text>
              </Section>

              {/* ブランド色のボタン。ヘッダーと同じく、自動反転で黄色が崩れる。 */}
              <Section style={{ textAlign: 'center' }}>
                <Button
                  className="brand"
                  href="https://example.com/login"
                  style={{
                    backgroundColor: brand.bg,
                    borderRadius: '8px',
                    color: brand.text,
                    fontSize: '16px',
                    fontWeight: 'bold',
                    padding: '14px 32px',
                  }}
                >
                  ログイン画面を開く
                </Button>
              </Section>

              <Text
                className="text-secondary"
                style={{
                  margin: '24px 0 0',
                  fontSize: '14px',
                  lineHeight: 1.7,
                  color: light.textSecondary,
                }}
              >
                このコードの有効期限は10分です。心当たりがない場合は、このメールを破棄してください。
              </Text>
            </Section>

            <Section style={{ padding: '32px 0 0', textAlign: 'center' }}>
              <Text
                className="text-secondary"
                style={{ margin: 0, fontSize: '12px', color: light.textSecondary }}
              >
                Sample Inc.
              </Text>
            </Section>
          </Container>
        </Section>
      </Body>
    </Html>
  );
};

export default MailInversion;
