import * as yup from 'yup';
import { passwordSchema } from '@/constants/password';
import { ERROR_MESSAGES } from '@/constants/form';

export const changePasswordSchema = yup.object().shape({
  currentPassword: yup
    .string()
    .required(ERROR_MESSAGES.changePassword.currentPasswordRequired),
  newPassword: passwordSchema,
  newPasswordConfirm: yup
    .string()
    .oneOf([yup.ref('newPassword')], ERROR_MESSAGES.changePassword.notMatch)
    .required(ERROR_MESSAGES.changePassword.newPasswordConfirmRequired),
});

export const changePersonalInformationSchema = yup.object().shape({
  email: yup
    .string()
    .email(ERROR_MESSAGES.email.format)
    .required(ERROR_MESSAGES.email.required),
  firstName: yup.string().required(ERROR_MESSAGES.firstName.required),
  lastName: yup.string().required(ERROR_MESSAGES.lastName.required),
  brandName: yup.string().required(ERROR_MESSAGES.brandName.required),
  phoneNumber: yup
    .string()
    .matches(/^[0-9]{10}$/, ERROR_MESSAGES.phoneNumber.digit)
    .required(ERROR_MESSAGES.phoneNumber.required),
});
