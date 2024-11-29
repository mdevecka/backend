export const resetUserSubject = () => `Eva Gallery Account Password Reset`;

export const resetUserBody = (url: string) => `
  You have requested password change for your Eva Gallery account.
  Please use the link below to proceed:
  ${url}
  If you did not request password change, please ignore this email.

  Best regards,
  Eva Gallery
`;
