import { getEnvBool, getEnvString } from "../../helpers";

export const verifyChangeEmailTemplate = {
  vendor: {
    bodyTemplate: `
      <p>Geekleをご利用いただきありがとうございます。</p>
      <p>このメールはメールアドレスの変更を依頼された方にお送りしています</p>
      <p>以下のURLにアクセスし、メールアドレスの変更を完了してください。</p>
      <br />
      <p>[<a href="\${url}">メールアドレス変更URL</a>]</p>
      <p>パスワードの設定は、このメールの受信から24時間以内に実施してください。</p>
      <br />
      <p>本メールは送信専用のアドレスです。</p>
      <p>このメールに心当たりがない場合は、お問い合わせください。</p>
      <br />
       -------------------
      <p>Geekle 運営事務局</p>
      <p>141-0021 東京都品川区上大崎2-15-19</p>
      <p>お問い合わせ メールアドレス ： contact@geekle.com</p>
    `,
    subject: '[Geekle] メールアドレスの変更を行います',
    urlTemplate: `${getEnvString('ADAPTER_CUSTOM_ADMIN_SITE_URL')}/settings/verify-change-email-success/` + '${token}'
  },
  enabled: getEnvBool('ADAPTER_EMAIL_VERIFY_CHANGE_EMAIL_ENABLED')
}