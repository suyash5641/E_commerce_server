module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/reset-password',
      handler: 'reset-password.resetPassword',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
