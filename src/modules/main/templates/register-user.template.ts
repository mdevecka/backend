import { createText } from '@common/helpers';

export const registerUserSubject = () => `Eva Gallery Registration`;

export const registerUserTextBody = (url: string) => createText(
  `Thank you for registering with Eva Gallery.`,
  `To finish registration please click the link below:`,
  url,
  ``,
  `Best regards,`,
  `Eva Gallery`
);
