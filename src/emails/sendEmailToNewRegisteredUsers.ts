import {defaultAdapter} from '@basaldev/blocks-user-service';
import * as sdk from '@basaldev/blocks-backend-sdk';
import { newUserTemplate } from './templates/newUser';
import { getEnvString } from '../helpers';

export function sendEmailToNewRegisteredUsers(adapter: defaultAdapter.UserDefaultAdapter): {
  adapter: defaultAdapter.UserDefaultAdapter;
  methodName: 'acceptInvitation';
  handlerSideEffect: sdk.util.HandlerSideEffect<defaultAdapter.User>;
} {
  const sendEmailToNewRegisteredUsersHandler: sdk.util.HandlerSideEffect<
  defaultAdapter.User
  > = async (
    logger: sdk.Logger,
    context: sdk.adapter.AdapterHandlerContext,
    response: sdk.adapter.AdapterHandlerResponse,
  ) => {
        const createdUser = response.data as defaultAdapter.User;
        const subject = newUserTemplate.vendor.subject;
        const html = sdk.util.buildContentFromTemplateString(
          newUserTemplate.vendor.bodyTemplate,
          {
            email: createdUser.email,
          }
        );
        const to = createdUser.email;
        const from = getEnvString('ADAPTER_EMAIL_SENDER', '');
        const mailData = {
          from,
          html,
          subject,
          to: to as unknown as string,
        };
        const didSend = await adapter.dependencies.mailService.sendMail(mailData);
        if (!didSend) {
          logger.error({
            message: 'Failed to send email',
            ...mailData,
          });
        }

        return response;
        };
  return {
    adapter,
    methodName: 'acceptInvitation',
    handlerSideEffect: sendEmailToNewRegisteredUsersHandler,
  };
}
