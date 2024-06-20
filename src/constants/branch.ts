import * as yup from 'yup';
import { ERROR_MESSAGES } from '@/constants/form';

export const branchSchema = yup.object().shape({
  name: yup.string().required(ERROR_MESSAGES.branch.name.required),
  location: yup.object().shape({
    address: yup
      .string()
      .required(ERROR_MESSAGES.branch.location.address.required),
    coordinates: yup.object().shape({
      lat: yup
        .number()
        .required(ERROR_MESSAGES.branch.location.coordinates.lat.required),
      lng: yup
        .number()
        .required(ERROR_MESSAGES.branch.location.coordinates.lng.required),
    }),
  }),
});
