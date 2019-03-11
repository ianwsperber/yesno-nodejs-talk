import assert = require('assert');
import { IPaymentsConfig } from '../src/client/payments';

assert(process.env.STRIPE_SECRET, 'Missing "STRIPE_SECRET"');

export const payments: IPaymentsConfig = {
  formidable: {
    baseUrl: 'https://cpnhpmqag0.execute-api.us-east-1.amazonaws.com/prod',
    // If this was a real secret we would not store in VCS
    secret: 'my-formidable-secret',
  },
  stripe: {
    secret: process.env.STRIPE_SECRET as string,
  },
};
