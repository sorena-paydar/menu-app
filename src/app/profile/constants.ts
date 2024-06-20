import * as yup from 'yup';
import { passwordSchema } from '@/constants/password';

const ERROR_MESSAGES = {
  password: {
    notMatch: 'New passwords must match',
    required: 'Current password is required',
  },
};

export const changePasswordSchema = yup.object().shape({
  currentPassword: yup.string().required(ERROR_MESSAGES.password.required),
  newPassword: passwordSchema,
  newPasswordConfirm: yup
    .string()
    .oneOf([yup.ref('newPassword')], ERROR_MESSAGES.password.notMatch)
    .required(ERROR_MESSAGES.password.required),
});
