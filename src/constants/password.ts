import * as yup from 'yup';

const PASSWORD_MIN_LENGTH = 8;

const PASSWORD_ERROR_MESSAGES = {
  required: 'Password is required',
  uppercaseLetter: 'Password must contain at least one uppercase letter',
  number: 'Password must contain at least one number',
  specialCharacter: 'Password must contain at least one special character',
  min: (length: number) =>
    `Password must be at least ${length} characters long`,
};

export const passwordSchema = yup
  .string()
  .required(PASSWORD_ERROR_MESSAGES.required)
  .matches(/[A-Z]/, PASSWORD_ERROR_MESSAGES.uppercaseLetter)
  .matches(/\d/, PASSWORD_ERROR_MESSAGES.number)
  .matches(/[@$!%*?&#]/, PASSWORD_ERROR_MESSAGES.specialCharacter)
  .min(PASSWORD_MIN_LENGTH, PASSWORD_ERROR_MESSAGES.min(PASSWORD_MIN_LENGTH));
