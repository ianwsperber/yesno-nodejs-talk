import Payments from '../src/client/payments';
import * as config from '../test/config';

describe('payments', () => {
  const mockStripeCustomerId = 'mockStripeCustomerId';
  const mockId = 'mockId';
  const mockStripe = {
    customers: {
      create: jest.fn(),
    },
  };
  const mockFormidable = {
    createUser: jest.fn(),
    scoreFraud: jest.fn(),
  };
  const payments = new Payments(config.payments);
  const options = {
    description: 'YesNo test user',
    deviceInfo: 'foobar-device-info',
    email: 'example@example.com',
  };

  describe('#createCustomer', () => {
    it('should create a customer', async () => {
      const user = await payments.createCustomer(options);

      // Test our mocks...
      expect(user).toHaveProperty('id', mockId);

      expect(mockStripe.customers.create).toHaveBeenCalledWith({
        description: options.description,
        email: options.email,
      });

      expect(mockFormidable.scoreFraud).toHaveBeenCalledWith({
        deviceInfo: options.deviceInfo,
      });

      expect(mockFormidable.createUser).toHaveBeenCalledWith({
        description: options.description,
        email: options.email,
        stripeCustomerId: mockStripeCustomerId,
      });
    });
  });
});
