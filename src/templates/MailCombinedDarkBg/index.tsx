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
import { colors, fontFamily, logos } from '../../styles/theme';

/**
 * MailCombined のロゴを、黄色のヘッダーから出してページの背景の上に置いた例。
 *
 *   1. ブランド色が変わる: 黄色のヘッダーとボタンが、自動変換で暗い色になる
 *   2. ロゴ: MailGood と同じ、白い板と余白を焼き込んだ PNG。ページの背景が暗くなっても
 *            白い板ごと表示されるので、暗い背景に埋もれない
 *   3. 明るさの差が小さい: ほぼ白のページと白いカード、うっすらした影と罫線。
 *                          変換後はどれも同じような暗い色になり、境目が消える
 *
 * 画像の色は CSS で変えられないので、透過 PNG だと Apple Mail でも暗い背景に沈む。
 * 白い板を焼き込んでおけば、どのクライアントでも同じ見え方になる。
 * Gmail / Outlook は @media が届かず、色の変換はクライアント任せになる。
 */

/** ライトモードの色。 */
const palette = {
  brand: '#FFD43B',
  brandText: colors.black,
  page: '#F7F8FA',
  card: '#FFFFFF',
  codeBox: '#F7F8FA',
  divider: '#EEF0F2',
  text: '#2B2F33',
  muted: '#A0A7B1',
} as const;

/**
 * ダークモードで見せたい色。Apple Mail ではこの通りになる。
 * ブランド色は変えず、面ごとの明るさの差は広げている。
 */
const style = `
  @media (prefers-color-scheme: dark) {
    .brand { background-color: ${palette.brand} !important; color: ${palette.brandText} !important; }
    .bg-page { background-color: #0E0F11 !important; }
    .bg-card { background-color: #1E2024 !important; }
    .code-box { background-color: #2E3238 !important; }
    .text-primary { color: ${colors.white} !important; }
    .text-muted { color: ${colors.gray400} !important; }
    .divider { border-top-color: #3A3E44 !important; }
  }
`;

export const MailCombinedDarkBg: FC = () => {
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
            {/* パターン2: ページの背景の上に、白い板付きの PNG のロゴ（MailGood と同じ）。
                ダークモードでページが暗くなっても、白い板があるので沈まない。 */}
            <Section style={{ paddingBottom: '24px', textAlign: 'center' }}>
              <Img
                alt="Sample"
                height={48}
                src={logos.plate}
                style={{ margin: '0 auto' }}
              />
            </Section>

            {/* パターン1: 黄色のヘッダー。自動変換で黄色がくすんだ暗い色に変わる。 */}
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

            {/* パターン3: カードとページの差は、わずかな明るさの差と薄い影だけ。 */}
            <Section
              className="bg-card"
              style={{
                backgroundColor: palette.card,
                borderRadius: '0 0 16px 16px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
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

              {/* パターン3: コードの箱はページと同じ色。変換後はカードと区別がつかなくなる。 */}
              <Section
                className="code-box"
                style={{
                  backgroundColor: palette.codeBox,
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

              {/* パターン1: ブランド色のボタン。自動変換で黄色が暗い色に変わる。 */}
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

              {/* パターン3: カードとの差がわずかな罫線。変換後は背景に溶ける。 */}
              <Hr
                className="divider"
                style={{
                  border: 'none',
                  borderTop: `1px solid ${palette.divider}`,
                  margin: '32px 0 24px',
                }}
              />

              {/* パターン3: 薄いグレーの注釈。変換後は暗い背景との差が縮み、読みにくくなる。 */}
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

export default MailCombinedDarkBg;
