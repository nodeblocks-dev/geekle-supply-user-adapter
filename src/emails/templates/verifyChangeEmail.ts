import { getEnvBool, getEnvString } from "../../helpers";

export const verifyChangeEmailTemplate = {
  vendor: {
    bodyTemplate: `
      <p>メールアドレスの更新リクエストが送信されました。</p>
      <p>以下のURLにアクセスし、メールアドレスの変更を完了してください。</p>
      <p><a href="\${url}">\${url}</a></p>
      <p>※このメールは送信専用のメールアドレスから送信されています。</p>
      <p>このメールに返信することはできません。ご了承ください。</p>
      <br />
      <p>Geekle</p>
      <a href="${getEnvString('ADAPTER_CUSTOM_SUPPLY_SITE_URL')}">${getEnvString('ADAPTER_CUSTOM_SUPPLY_SITE_URL')}</a>
      <br />
      <br />
      <p>運営会社 Geekle</p>
    `,
    subject: 'メールアドレス認証のお願い',
    urlTemplate: ''
  },
  enabled: getEnvBool('ADAPTER_EMAIL_VERIFY_CHANGE_EMAIL_ENABLED')
}