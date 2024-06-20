import * as yup from 'yup';
import { ERROR_MESSAGES } from '@/constants/form';

const MAX_DESCRIPTION_CHARACTER = 200;

export const createItemSchema = yup.object().shape({
  name: yup.string().required(ERROR_MESSAGES.item.name.required),
  picture: yup.string().required(ERROR_MESSAGES.item.picture.required),
  price: yup
    .number()
    .typeError(ERROR_MESSAGES.item.price.type)
    .required(ERROR_MESSAGES.item.price.required),
  description: yup
    .string()
    .max(
      MAX_DESCRIPTION_CHARACTER,
      ERROR_MESSAGES.item.description.max(MAX_DESCRIPTION_CHARACTER),
    )
    .required(ERROR_MESSAGES.item.description.required),
});
