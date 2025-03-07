import { getEnvBool } from "../../helpers";

export const deactivateUserTemplate = {
  vendor: {
    bodyTemplate: `
        <p>退会手続きが完了しました。これまでご利用いただき、誠にありがとうございました。</p>
        <br />
        <p>※このメールアドレスは送信専用です。返信をいただいてもご回答できませんのでご了承ください。</p>
        <br />
        <p>-------------------</p></br>
        <p>{運営会社名} Geekle 運営事務局</p></br>
        <p>{郵便番号} {住所}</p></br>
        <p>お問い合わせ メールアドレス ：{問い合わせメールアドレス}</p>
    `,
    subject: '[Geekle] 退会が完了しました',
    urlTemplate: '',
  },
  enabled: getEnvBool('ADAPTER_EMAIL_DEACTIVATE_USER_ENABLED')
}