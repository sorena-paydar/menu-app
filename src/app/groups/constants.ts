import * as yup from 'yup';
import { ERROR_MESSAGES } from '@/constants/form';

export const createGroupSchema = yup.object().shape({
  name: yup.string().required(ERROR_MESSAGES.menuGroup.name.required),
  categories: yup
    .array()
    .min(1)
    .required(ERROR_MESSAGES.menuGroup.categories.required),
});
