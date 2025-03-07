
import { defaultAdapter } from "@basaldev/blocks-user-service";
import { setInvitableUserIds } from "./setInvitableUserIds";

export function setValidators(adapter: defaultAdapter.UserDefaultAdapter): defaultAdapter.UserDefaultAdapter {
    const customizations = [setInvitableUserIds];
  
    for (const customization of customizations) {
        adapter = customization(adapter);
    }
    return adapter;
}
  