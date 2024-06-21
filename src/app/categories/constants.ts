import * as yup from 'yup';
import { ERROR_MESSAGES } from '@/constants/form';

export const createCategorySchema = yup.object().shape({
  name: yup.string().required(ERROR_MESSAGES.category.name.required),
  items: yup
    .array()
    .min(1, ERROR_MESSAGES.category.items.required)
    .required(ERROR_MESSAGES.category.items.required),
});
