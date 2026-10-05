import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Section,
  Text,
} from '@react-email/components';
import { FC } from 'react';
import { colors, fontFamily } from '../../styles/theme';

/**
 * 明るさの差が小さい色の組み合わせが、自動反転で見分けられなくなる例。
 *
 * よくある「ほぼ白のページに白いカード、うっすら影」のデザイン。
 * ライトでは影と、わずかな明るさの差でカードの形が分かる。
 *
 *   - Apple Mail: @media が効くので、ダーク用に差を広げた色になり、カードの形が残る
 *   - Gmail / Outlook: 自動反転がかかる。明るい色はどれも暗い色に寄せられるので、
 *                      ページ・カード・コードの箱がほぼ同じ色になる。
 *                      box-shadow は反転されない黒い影なので、暗い背景では見えなくなる
 */

/** ライトモードの色。どれも白に近く、明るさの差が小さい。 */
const soft = {
  page: '#F7F8FA',
  card: '#FFFFFF',
  codeBox: '#F7F8FA',
  divider: '#EEF0F2',
  text: '#2B2F33',
  muted: '#A0A7B1',
} as const;

/** ダークモードで見せたい色。反転任せにせず、面ごとの明るさの差を広げている。 */
const style = `
  @media (prefers-color-scheme: dark) {
    .bg-page { background-color: #0E0F11 !important; }
    .bg-card { background-color: #1E2024 !important; }
    .code-box { background-color: #2E3238 !important; }
    .text-primary { color: ${colors.white} !important; }
    .text-muted { color: ${colors.gray400} !important; }
    .divider { border-top-color: #3A3E44 !important; }
  }
`;

export const MailLowContrast: FC = () => {
  return (
    <Html lang="ja">
      <Head>
        <meta content="width=device-width" name="viewport" />
        <meta content="light dark" name="color-scheme" />
        <meta content="light dark" name="supported-color-schemes" />
        <style>{style}</style>
      </Head>
      <Body style={{ margin: 0, fontFamily }}>
        {/* ページ背景 #F7F8FA と、カード #FFFFFF。明るさの差はごくわずか。 */}
        <Section
          className="bg-page"
          style={{ backgroundColor: soft.page, padding: '40px 0' }}
        >
          <Container style={{ width: '100%', maxWidth: '600px', margin: '0 auto' }}>
            <Text
              className="text-primary"
              style={{
                margin: '0 0 24px',
                fontSize: '24px',
                fontWeight: 'bold',
                textAlign: 'center',
                color: soft.text,
              }}
            >
              Sample
            </Text>

            {/* カードの境目は、影とわずかな明るさの差だけで作っている。
                反転後は、影が見えず、ページとカードがほぼ同じ暗い色になって境目が消える。 */}
            <Section
              className="bg-card"
              style={{
                backgroundColor: soft.card,
                borderRadius: '16px',
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
                  color: soft.text,
                }}
              >
                ログイン画面で、以下の認証コードを入力してください。
              </Text>

              {/* コードの箱もページと同じ #F7F8FA。反転後はカードと同じ色になり、箱が消える。 */}
              <Section
                className="code-box"
                style={{
                  backgroundColor: soft.codeBox,
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
                    color: soft.text,
                  }}
                >
                  123456
                </Text>
              </Section>

              {/* 罫線もカードとの差がわずか。反転後は背景に溶けて見えなくなる。 */}
              <Hr
                className="divider"
                style={{
                  border: 'none',
                  borderTop: `1px solid ${soft.divider}`,
                  margin: '24px 0',
                }}
              />

              {/* 薄いグレーの注釈。ライトの時点でコントラストが低く、
                  反転後は暗い背景との差がさらに縮んで読みにくくなることがある。 */}
              <Text
                className="text-muted"
                style={{
                  margin: 0,
                  fontSize: '13px',
                  lineHeight: 1.7,
                  color: soft.muted,
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
                color: soft.muted,
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

export default MailLowContrast;
