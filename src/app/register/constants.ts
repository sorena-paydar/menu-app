import * as yup from 'yup';

const ERROR_MESSAGES = {
  email: {
    format: 'Invalid email format',
    required: 'Email is required',
  },
  password: {
    required: 'Password is required',
    uppercaseLetter: 'Password must contain at least one uppercase letter',
    number: 'Password must contain at least one number',
    specialCharacter: 'Password must contain at least one special character',
    min: (length: number) =>
      `Password must be at least ${length} characters long`,
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

const PASSWORD_MIN_LENGTH: number = 8;

export const signupSchema = yup.object().shape({
  email: yup
    .string()
    .email(ERROR_MESSAGES.email.format)
    .required(ERROR_MESSAGES.email.required),
  password: yup
    .string()
    .required(ERROR_MESSAGES.password.required)
    .matches(/[A-Z]/, ERROR_MESSAGES.password.uppercaseLetter)
    .matches(/\d/, ERROR_MESSAGES.password.number)
    .matches(/[@$!%*?&#]/, ERROR_MESSAGES.password.specialCharacter)
    .min(PASSWORD_MIN_LENGTH, ERROR_MESSAGES.password.min(PASSWORD_MIN_LENGTH)),
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
