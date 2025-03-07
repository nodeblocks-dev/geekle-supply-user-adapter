import * as sdk from "@basaldev/blocks-backend-sdk";
import { defaultAdapter } from "@basaldev/blocks-user-service";


export function setInvitableUserIds(adapter: defaultAdapter.UserDefaultAdapter): defaultAdapter.UserDefaultAdapter {
    return sdk.adapter.setValidator(
      adapter,
      'acceptInvitation',
      'hasAllowedTypeId',
      (logger, context) =>
        defaultAdapter.hasAllowedTypeId(['010'], logger, context)
    );
}
  