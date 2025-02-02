import { createText } from '@common/helpers';

export const registerUserSubject = () => `E.V.A. Gallery Registration`;

export const registerUserTextBody = (url: string) => createText(
  `Thank you for registering with E.V.A. Gallery.`,
  ``,
  `To finish registration please click the link below:`,
  url,
  ``,
  `Best regards,`,
  `E.V.A. Gallery team`
);
