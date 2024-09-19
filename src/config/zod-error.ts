import { ErrorMessageOptions } from 'zod-error';

export const options: ErrorMessageOptions = {
  code: {
    enabled: false,
  },
  delimiter: {
    component: ' - ',
  },
  message: {
    enabled: true,
    label: '',
  },
  path: {
    enabled: true,
    type: 'breadcrumbs',
    label: 'Field: ',
  },
  maxErrors: 1,
};
