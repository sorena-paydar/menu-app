import * as yup from 'yup';
import { passwordSchema } from '@/constants/password';

const ERROR_MESSAGES = {
  email: {
    format: 'Invalid email format',
    required: 'Email is required',
  },
  password: {
    required: 'Password is required',
  },
  firstName: {
    required: 'First name is required',
  },
  lastName: {
    required: 'Last name is required',
  },
  brandName: {
    required: 'Brand name is required',
  },
  phoneNumber: {
    digit: 'Phone number must be exactly 10 digits',
    required: 'Phone Number is required',
  },
};

export const signupSchema = yup.object().shape({
  email: yup
    .string()
    .email(ERROR_MESSAGES.email.format)
    .required(ERROR_MESSAGES.email.required),
  password: passwordSchema,
  firstName: yup.string().required(ERROR_MESSAGES.firstName.required),
  lastName: yup.string().required(ERROR_MESSAGES.lastName.required),
  brandName: yup.string().required(ERROR_MESSAGES.brandName.required),
  phoneNumber: yup
    .string()
    .matches(/^[0-9]{10}$/, ERROR_MESSAGES.phoneNumber.digit)
    .required(ERROR_MESSAGES.phoneNumber.required),
});

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email(ERROR_MESSAGES.email.format)
    .required(ERROR_MESSAGES.email.required),
  password: yup.string().required(ERROR_MESSAGES.password.required),
});
