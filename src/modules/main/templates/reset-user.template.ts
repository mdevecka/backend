import { createText } from '@common/helpers';

export const resetUserSubject = () => `E.V.A. Gallery Account Password Reset`;

export const resetUserTextBody = (url: string) => createText(
  `You have requested password change for your E.V.A. Gallery account.`,
  ``,
  `Please use the link below to proceed:`,
  url,
  ``,
  `If you did not request a password change, please ignore this email.`,
  ``,
  `Best regards,`,
  `E.V.A. Gallery team`
);
