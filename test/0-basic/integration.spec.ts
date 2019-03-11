import Payments from '../../src/client/payments';
import * as testConfig from '../config';

describe('Unit test', () => {
  const mockId = 'mock-id';
  const mockStripeId = 'mock-stripe-id';
  let payments: Payments;

  beforeEach(() => {
    payments = new Payments(testConfig.payments);
  });

  it('should reject fraudulent requests', async () => {
    const payload = {
      description: 'Unit test customer',
      deviceInfo: 'foobar-device',
      email: 'example@example.com',
    };
    const user = await payments.createCustomer(payload);

    expect(user).toEqual({
      description: payload.description,
      email: payload.email,
      id: mockId,
      stripeId: mockStripeId,
    });
  });
});
