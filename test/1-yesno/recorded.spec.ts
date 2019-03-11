import { yesno } from 'yesno-http';
import Payments from '../../src/client/payments';
import * as testConfig from '../config';

interface IJSON {
  [key: string]: any;
}

const FRAUD_DEVICE_INFO_TRIGGER_FAILURE = 'trigger-failure';

describe('Payment SDK', () => {
  let payments: Payments;

  beforeEach(() => {
    payments = new Payments(testConfig.payments);
  });

  describe('#createCustomer', () => {
    it('should call all APIs and return the user object', async () => {
      throw new Error('Not yet implemented');
    });
  });
});
