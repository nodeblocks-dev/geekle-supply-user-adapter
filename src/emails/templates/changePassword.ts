import { getEnvBool, getEnvString } from "../../helpers";

export const changePasswordTemplate = {
  vendor: {
    bodyTemplate: `
      <p>Geekleをご利用いただきありがとうございます。</p>
      <br />
      <p>パスワードの変更が完了しました。</p>
      <br />
      <p>この変更に覚えがない場合は、速やかに以下のリンクからパスワードを再設定してください</p>
      <br />
      <a href="${getEnvString('ADAPTER_CUSTOM_SUPPLY_SITE_URL')}/settings/change-password">${getEnvString('ADAPTER_CUSTOM_SUPPLY_SITE_URL')}/settings/change-password</a>
      <br />
      <br />
      <p>本メールは送信専用のアドレスです。</p>
      <p>このメールに心当たりがない場合は、お問い合わせください。</p>
      <br />
      <p>運営会社 Geekle</p>
    `,
    subject: '[Geekle] パスワードの変更が完了しました',
    urlTemplate: ''
  },
  enabled: getEnvBool('ADAPTER_EMAIL_CHANGE_PASSWORD_ENABLED')
}