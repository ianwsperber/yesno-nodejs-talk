import * as nocktor from '@walmartlabs/nocktor';
import Payments from '../src/client/payments';
import * as config from '../test/config';

describe('payments', () => {
  const STRIPE_API = '';
  const FORMIDABLE_API = '';
  const mockStripeCustomerId = 'mockStripeCustomerId';
  const mockId = 'mockId';

  const payments = new Payments(config.payments);
  const options = {
    description: 'YesNo test user',
    deviceInfo: 'foobar-device-info',
    email: 'example@example.com',
  };
  const nockDir = `${__dirname}/mocks`;

  describe('#createCustomer', () => {
    it('should create a customer', async () => {
      nocktor.start(nockDir, 'createCustomer-should create a customer');

      await payments.createCustomer(options);

      await nocktor.stop();
    });
  });
});
