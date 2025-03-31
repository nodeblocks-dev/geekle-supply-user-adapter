import {defaultAdapter} from '@basaldev/blocks-user-service';
import {sendEmailToNewRegisteredUsers} from './sendEmailToNewRegisteredUsers';
import * as sdk from '@basaldev/blocks-backend-sdk';

export async function setEmailHandlers(adapter: defaultAdapter.UserDefaultAdapter) {
  for (const sideEffectHandler of [sendEmailToNewRegisteredUsers]) {
    const sideEffect = sideEffectHandler(adapter);
    adapter = sdk.adapter.addHandlerSideEffect(
      sideEffect.adapter,
      sideEffect.methodName,
      sideEffect.handlerSideEffect
    );
  }
  return adapter;
}
