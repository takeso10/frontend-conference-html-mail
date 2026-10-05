import { Body, Head, Html } from '@react-email/components';
import { FC } from 'react';

/**
 * HTML メールと比べるための、ただの文章だけの認証コードメール。
 * 装飾やスタイルは一切付けず、テキストメールと同じ見た目になるようにしている。
 *
 * 本物のテキストメール（text/plain）として送るなら、次のコマンドで .txt に書き出せる。
 *   pnpm email export --dir src/templates --outDir dist-text --plainText
 */
export const MailPlainText: FC = () => {
  return (
    <Html lang="ja">
      <Head />
      <Body>
        <p>Sample をご利用いただきありがとうございます。</p>
        <p>ログイン画面で、以下の認証コードを入力してください。</p>
        <p>認証コード：123456</p>
        <p>
          このコードの有効期限は10分です。
          <br />
          心当たりがない場合は、このメールを破棄してください。
        </p>
        <p>
          --
          <br />
          Sample Inc.
        </p>
      </Body>
    </Html>
  );
};

export default MailPlainText;
