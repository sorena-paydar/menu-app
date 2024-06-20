export type ChangePersonalInformationInputs = {
  email: string;
  firstName: string;
  lastName: string;
  brandName: string;
  phoneNumber: string;
};

export type ChangePasswordInputs = {
  currentPassword: string;
  newPassword: string;
  newPasswordConfirm: string;
};
