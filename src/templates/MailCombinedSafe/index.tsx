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
 * MailCombinedDarkBg を、自動変換されても崩れにくい色づかいに直した例。
 *
 *   1. ブランド色は画像に焼き込む: 黄色を CSS の背景色で塗ると、自動変換でくすんだ色になる。
 *                                  画像は変換されないので、黄色の帯ごと PNG にしておく
 *   2. 色付きの面は、白黒のペアにする: ボタンは黄色ではなく、黒地に白文字。
 *                                      反転されても「白地に黒文字」になるだけで、意味も読みやすさも残る
 *   3. 境目は明るさの差ではなく線で作る: ページとカードの差を広げ、影ではなく枠線で区切る。
 *                                        反転後も枠線が残るので、カードや箱の形が消えない
 *   4. 文字は十分に濃くする: 薄いグレーは反転後に背景との差がさらに縮むので、濃いめのグレーにする
 *
 * Apple Mail は @media が効くので、下の style に書いたダークの色になる。
 * Gmail / Outlook は @media が届かず、色の変換はクライアント任せになるが、
 * 変換されても破綻しない色だけを使っている。
 */

/** ライトモードの色。 */
const palette = {
  page: light.bgPage,
  card: colors.white,
  codeBox: colors.gray100,
  line: '#D5DAE0',
  text: colors.black,
  muted: colors.gray700,
  button: colors.black,
  buttonText: colors.white,
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
    .button { background-color: ${colors.white} !important; color: ${colors.black} !important; }
  }
`;

export const MailCombinedSafe: FC = () => {
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
            {/* 1: 黄色の帯とロゴを焼き込んだ PNG。どのクライアントでも黄色のまま表示される。 */}
            <Section style={{ paddingBottom: '24px', textAlign: 'center' }}>
              <Img
                alt="Sample"
                height={48}
                src={logos.plate}
                style={{ margin: '0 auto' }}
              />
            </Section>

            {/* 3: カードはページとの差を広げ、枠線で区切る。上の帯とつながるよう上辺の線は消す。 */}
            <Section
              className="bg-card"
              style={{
                backgroundColor: palette.card,
                border: `1px solid ${palette.line}`,
                borderRadius: '16px',
                padding: '40px',
              }}
            >
              <Text
                className="text-primary"
                style={{
                  margin: '0 0 16px',
                  fontSize: '20px',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  color: palette.text,
                }}
              >
                ログイン認証コード
              </Text>

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

              {/* 3: コードの箱も枠線で区切る。反転後に背景色の差が縮んでも、箱の形が残る。 */}
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

              {/* 2: ボタンは黒地に白文字。反転されても白地に黒文字になるだけで崩れない。 */}
              <Section style={{ textAlign: 'center' }}>
                <Button
                  className="button"
                  href="https://example.com/login"
                  style={{
                    backgroundColor: palette.button,
                    borderRadius: '8px',
                    color: palette.buttonText,
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

              {/* 4: 注釈は濃いめのグレー。反転後も背景との差が保たれる。 */}
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

export default MailCombinedSafe;
