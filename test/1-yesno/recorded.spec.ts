import { yesno } from 'yesno-http';
import Payments, { ICreateCustomer } from '../../src/client/payments';
import * as testConfig from '../config';

interface IJSON {
  [key: string]: any;
}

const FRAUD_DEVICE_INFO_TRIGGER_FAILURE = 'trigger-failure';

describe('Payment SDK', () => {
  const itRecorded = yesno.test({ it, dir: `${__dirname}/yesno`, prefix: 'payments' });

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
    itRecorded('should call all APIs and return the user object', async () => {
      const customer = await payments.createCustomer(customerParams);

      expect(yesno.intercepted()).toHaveLength(3);

      expect((yesno.matching(/fraud/).response().body as IJSON).score).toBeGreaterThanOrEqual(0.5);
      expect(customer.id).toEqual((yesno.matching(/users/).response().body as IJSON).id);

      yesno.matching(/fraud/).redact(['request.headers.auth']);
      yesno
        .matching(/users/)
        .redact(['request.headers.auth', 'request.body.email', 'response.body.email']);
      yesno
        .matching(/stripe/)
        .redact(['request.headers.authorization', 'request.body', 'response.body.email']);
    });
  });
});
