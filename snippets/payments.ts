import Payments from '../src/client/payments';

export async function sample() {
  const payments = new Payments({
    formidable: { baseUrl: 'example.com', secret: 'myformidablesecret' },
    stripe: { secret: 'mysecret' },
  });

  const customer = await payments.createCustomer({
    description: 'Test customer',
    deviceInfo: 'foobar',
    email: 'example@example.com',
  });
}
