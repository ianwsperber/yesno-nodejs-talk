import * as nock from 'nock';
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

  describe('#createCustomer', () => {
    it('should create a customer', async () => {
      nock(STRIPE_API)
        .post('/v1/customers')
        .reply(200, {
          /**
           * INSERT BIG RESPONSE BODY HERE
           */
        });

      nock(FORMIDABLE_API)
        .post('/api/v1/users')
        .reply(200, {
          id: mockId,
          stripeCustomerId: mockStripeCustomerId,
          ...options,
        });

      const user = await payments.createCustomer(options);
      expect(user).toHaveProperty('id', mockId);
    });
  });
});
