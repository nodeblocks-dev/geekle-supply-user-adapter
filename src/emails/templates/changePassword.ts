import { getEnvBool, getEnvString } from "../../helpers";

export const changePasswordTemplate = {
  vendor: {
    bodyTemplate: `
      <p>Geekleをご利用いただきありがとうございます。</p>
      <p>パスワードの変更が完了しました。</p>
      <br />
      <p>この変更に覚えがない場合は、速やかに以下のリンクからパスワードを再設定してください</p>
      <br />
      <a href="${getEnvString('ADAPTER_CUSTOM_SUPPLY_SITE_URL')}/settings/change-password">[メールアドレス変更URL]</a>
      <br />
      <br />
      <p>本メールは送信専用のアドレスです。</p>
      <p>このメールに心当たりがない場合は、お問い合わせください。</p>
      <br />
       -------------------
      <p>Geekle 運営事務局</p>
      <p>141-0021 東京都品川区上大崎2-15-19</p>
      <p>お問い合わせ メールアドレス ： contact@geekle.com</p>
    `,
    subject: '[Geekle] パスワードの変更が完了しました',
    urlTemplate: ''
  },
  enabled: getEnvBool('ADAPTER_EMAIL_CHANGE_PASSWORD_ENABLED')
}