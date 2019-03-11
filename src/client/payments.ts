import Stripe from 'stripe';
import axios, { AxiosInstance } from 'axios';
import assert = require('assert');

const MIN_FRAUD_SCORE = 0.5;

export interface IPaymentsConfig {
  formidable: {
    baseUrl: string;
    secret: string;
  };
  stripe: {
    secret: string;
  };
}

export interface ICreateCustomer {
  deviceInfo: string;
  description: string;
  email: string;
}

export default class Payments {
  private readonly stripe: Stripe;
  private readonly formidableClient: AxiosInstance;

  constructor(config: IPaymentsConfig) {
    this.stripe = new Stripe(config.stripe.secret);
    this.formidableClient = axios.create({
      timeout: 4000,
      baseURL: config.formidable.baseUrl,
      headers: {
        auth: config.formidable.secret,
      },
    });
    this.formidableClient.interceptors.response.use(undefined, (err) => {
      console.warn({
        message: 'Request failure',
        url: err.config.url,
        responseBody: err.response.data,
        statusCode: err.response.statusCode,
      });
      throw err;
    });
  }

  /**
   * Create a Formidable customer.
   *
   * Steps:
   * 1. Check device info against our fraud service
   * 2. Add customer to stripe
   * 3. Save user information, including stripe customer id, to users service
   */
  public async createCustomer({
    deviceInfo,
    description,
    email,
  }: ICreateCustomer): Promise<unknown> {
    const {
      data: { score },
    } = await this.formidableClient.post('/api/v1/fraud', {
      deviceInfo,
    });

    assert(score !== undefined, 'Missing score');

    if (score < MIN_FRAUD_SCORE) {
      throw new Error(`Fraudulent customer detected (${score} < ${MIN_FRAUD_SCORE})`);
    }
    console.log('HEERE');
    const { id: stripeCustomerId }: Stripe.customers.ICustomer = await this.stripe.customers.create(
      {
        email,
        description,
      },
    );
    console.log('HEERE2');
    const { data: userData } = await this.formidableClient.post('/api/v1/users', {
      email,
      description,
      stripeCustomerId,
    });

    return userData;
  }
}
