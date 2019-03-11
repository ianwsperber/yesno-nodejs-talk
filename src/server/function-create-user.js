exports.handler = async (event) => {
  const user = JSON.parse(event.body);

  if (!user.email || !user.stripeCustomerId || !user.description) {
    return {
      body: JSON.stringify({
        message: 'Missing required properties',
      }),
      statusCode: 400,
    };
  }

  return {
    body: JSON.stringify({ id: Math.floor(Math.random() * 1000000), ...user }),
    statusCode: 200,
  };
};
