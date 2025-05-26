import * as sdk from "@basaldev/blocks-backend-sdk";
import { defaultAdapter, UserAppConfig, createNodeblocksUserApp } from "@basaldev/blocks-user-service";
import { changePasswordTemplate } from "./emails/templates/changePassword";
import { verifyChangeEmailTemplate } from "./emails/templates/verifyChangeEmail";
import { sendResetPasswordEmailTemplate } from "./emails/templates/sendResetPasswordEmail";
import { inviteUserTemplate } from "./emails/templates/inviteUser";
import { deactivateUserTemplate } from "./emails/templates/deactivateUser";
import { setValidators } from "./validators";
import { setEmailHandlers } from "./emails";

type CreateUserDefaultAdapterDependencies = Parameters<typeof defaultAdapter.createUserDefaultAdapter>[1];

// Function to decode HTML entities
function decodeHtmlEntities(text: string): string {
  return text.replace(/&amp;/g, '&')
}

export function beforeCreateAdapter(
  currentOptions: defaultAdapter.UserDefaultAdapterOptions,
  currentDependencies: CreateUserDefaultAdapterDependencies): [defaultAdapter.UserDefaultAdapterOptions, CreateUserDefaultAdapterDependencies] {

  const updatedOptions: defaultAdapter.UserDefaultAdapterOptions = {
    ...currentOptions,
    authenticate: sdk.security.defaultBearerAuth,
    collectionNames: {
      attachment: 'supply_user_attachments',
      follower: 'supply_user',
      invitation: 'supply_user_invitations',
      preference: 'supply_user_preferences',
      users: 'supply_users',
    },
    customStrategies: {
      passwordValidateStrategy: (user) => {
        const decodedPassword = decodeHtmlEntities(user.password);
        const regex = new RegExp(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+-=])[a-zA-Z0-9!@#$%^&*()_+-=]{8,64}$/)
        if (!regex.test(decodedPassword)) {
          return false;
        }
        return true;
      }
    },
    emailConfig: {
      inviteUser: {
        template: {
          bodyTemplate: inviteUserTemplate.vendor.bodyTemplate,
          subject: inviteUserTemplate.vendor.subject,
          urlTemplate: inviteUserTemplate.vendor.urlTemplate
        },
        enabled: inviteUserTemplate.enabled
      },
      deactivateUser: {
        template: {
          bodyTemplate: deactivateUserTemplate.vendor.bodyTemplate,
          subject: deactivateUserTemplate.vendor.subject,
          urlTemplate: deactivateUserTemplate.vendor.urlTemplate
        },
        enabled: deactivateUserTemplate.enabled
      },
      changePassword: {
        //todo: wait fix from @Marty, here is should be an admin template
        customerTemplate: {
          bodyTemplate: changePasswordTemplate.vendor.bodyTemplate,
          subject: changePasswordTemplate.vendor.subject,
          urlTemplate: changePasswordTemplate.vendor.urlTemplate
        },
        vendorTemplate: {
          bodyTemplate: changePasswordTemplate.vendor.bodyTemplate,
          subject: changePasswordTemplate.vendor.subject,
          urlTemplate: changePasswordTemplate.vendor.urlTemplate
        },
        enabled: changePasswordTemplate.enabled
      },
      verifyChangeEmail: {
        vendorTemplate: {
          bodyTemplate: verifyChangeEmailTemplate.vendor.bodyTemplate,
          subject: verifyChangeEmailTemplate.vendor.subject,
          urlTemplate: verifyChangeEmailTemplate.vendor.urlTemplate
        },
        enabled: verifyChangeEmailTemplate.enabled
      },
      sendResetPasswordEmail: {
        vendorTemplate: {
          bodyTemplate: sendResetPasswordEmailTemplate.vendor.bodyTemplate,
          subject: sendResetPasswordEmailTemplate.vendor.subject,
          urlTemplate: sendResetPasswordEmailTemplate.vendor.urlTemplate
        },
        enabled: sendResetPasswordEmailTemplate.enabled
      },
    }
  };

  const updatedDependencies: CreateUserDefaultAdapterDependencies = {
    ...currentDependencies
  };

  return [updatedOptions, updatedDependencies];
}

export async function adapterCreated(adapter: defaultAdapter.UserDefaultAdapter): Promise<defaultAdapter.UserDefaultAdapter> {
  let updatedAdapter: defaultAdapter.UserDefaultAdapter = sdk.adapter.setEnabledAdapterMethods(adapter, [
    'acceptInvitation',
    'createUser',
    'updateUser',
    'getUser',
    'listUsers',
    'resetPassword',
    'sendResetPasswordEmail',
    'sendVerificationEmail',
    'verifyEmail',
    'acceptInvitation',
    'createInvitation',
    'deleteInvitation',
    'listInvitations',
    'changeUserEmail',
    'changeUserPassword',
    'verifyChangeEmail',
    'listUsers',
    'checkUserPassword',
    'createUser',
    'createUserForAdmin',
    'listAttachments',
    'lockUser',
    'unlockUser',
  ]);

  updatedAdapter = await setEmailHandlers(updatedAdapter);

  return setValidators(updatedAdapter);
}

export function beforeCreateService(currentConfigs: UserAppConfig): UserAppConfig {
  const updatedConfigs: UserAppConfig = {
    ...currentConfigs
  };

  return updatedConfigs;
}

export function serviceCreated() {}

type StartServiceArgs = Parameters<ReturnType<typeof createNodeblocksUserApp>['startService']>;
type ServiceOpts = StartServiceArgs[0];

export function beforeStartService(currentOptions: ServiceOpts): StartServiceArgs {
  const updatedOptions: ServiceOpts = {
    ...currentOptions,
  };
  return [updatedOptions];
}

export function serviceStarted() {}
