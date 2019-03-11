import { yesno } from 'yesno-http';
import Payments from '../../src/client/payments';
import * as testConfig from '../config';

interface IJSON {
  [key: string]: any;
}

const FRAUD_DEVICE_INFO_TRIGGER_FAILURE = 'trigger-failure';

describe('Payment SDK', () => {
  const itRecorded = yesno.test({ it, dir: `${__dirname}/yesno`, prefix: 'payments-sdk' });
  const deviceInfo = 'foobar-device-info';
  let payments: Payments;

  beforeEach(() => {
    payments = new Payments(testConfig.payments);
  });

  describe('#createCustomer', () => {
    itRecorded('should call all APIs and return the user object', async () => {
      const user = await payments.createCustomer({
        description: 'YesNo test user',
        deviceInfo,
        email: 'example@example.com',
      });

      expect(yesno.intercepted()).toHaveLength(3);

      expect((yesno.matching(/fraud/).response().body as IJSON).score).toBeGreaterThanOrEqual(0.5);
      expect(user.id).toEqual((yesno.matching(/users/).response().body as IJSON).id);

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
