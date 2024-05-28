'use strict';
const { MailtrapClient } = require("mailtrap");
const TOKEN = process.env.MAILTRAP_API_TOKEN;
const ENDPOINT = "https://send.api.mailtrap.io/";

function generateOTP() {
  // Generate a random 6-digit number
  const otp = Math.floor(100000 + Math.random() * 900000);
  return otp.toString();
}

module.exports = {
  sendResetCode: async (ctx, next) => {
    const { email } = ctx.request.body;
    const sixDigitOTP = generateOTP();

    try {
      const user = await strapi.query('plugin::users-permissions.user').findOne({
        where: { email: email },
      });
      if (user === null)
        ctx.throw(404, "Enter registered email id")

      const client = new MailtrapClient({ token: TOKEN });
      const sender = {
        email: "mailtrap@noreplyshop.site",
        name: "Ecommerce_App",
      };
      const recipients = [
        {
          email: email,
        }
      ];

      const resetPasswordEmailText = `Dear ${user?.username} , We received a request to reset your password. Please use the following six-digit code to proceed with resetting your password: ${sixDigitOTP}`
      const userLog = await strapi.entityService.findOne('api::user-log.user-log', user?.id);
      if (userLog === null) {
        await strapi.entityService.create('api::user-log.user-log', {
          data: {
            resendPasswordOtp: sixDigitOTP,
            userName: email,
            id: user?.id
          },
        });
      }
      else {
        await strapi.entityService.update('api::user-log.user-log', userLog?.id, {
          data: {
            resendPasswordOtp: sixDigitOTP
          },
        });
      }

      await client
        .send({
          from: sender,
          to: recipients,
          subject: "Reset Account Password",
          text: resetPasswordEmailText,
          category: "Integration Test",
        })
        .then(console.log, console.error);

      ctx.send({ message: 'Six-digit code sent successfully' });
    } catch (error) {
      console.log(error, "error")
      ctx.throw(500, 'Failed to send six-digit code', error);
    }
  }
};
