import Payments, { ICreateCustomer } from '../../src/client/payments';
import * as testConfig from '../config';

interface IJSON {
  [key: string]: any;
}

const FRAUD_DEVICE_INFO_TRIGGER_FAILURE = 'trigger-failure';

describe('Payment SDK', () => {
  let payments: Payments;
  let customerParams: ICreateCustomer;

  beforeEach(() => {
    payments = new Payments(testConfig.payments);
    customerParams = {
      description: 'YesNo test',
      deviceInfo: 'device:info',
      email: 'example@example.com',
    };
  });

  describe('#createCustomer', () => {
    it('should call all APIs and return the user object', async () => {
      throw new Error('Not yet implemented');
    });
  });
});
