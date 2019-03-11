const FRAUD_DEVICE_INFO_TRIGGER_FAILURE = 'trigger-failure';

exports.handler = async (event) => {
  const body = JSON.parse(event.body);

  if (!body.deviceInfo) {
    return {
      body: JSON.stringify({
        message: 'Missing required properties',
      }),
      statusCode: 400,
    };
  }

  if (body.deviceInfo === FRAUD_DEVICE_INFO_TRIGGER_FAILURE) {
    return {
      body: JSON.stringify({
        score: 0.1,
      }),
      statusCode: 200,
    };
  }

  return {
    body: JSON.stringify({
      score: Number((Math.random() / 2 + 0.5).toPrecision(2)),
    }),
    statusCode: 200,
  };
};
