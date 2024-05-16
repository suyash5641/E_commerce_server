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
        name: "Mailtrap Test",
      };
      const recipients = [
        {
          email: email,
        }
      ];

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
          subject: "You are awesome!",
          text: `Your  six digit reset password  otp is ${sixDigitOTP}`,
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

//       // @ts-ignore
//       .setFrom("info@trial-7dnvo4de85rl5r86.mlsender.net") // Set the sender
//       .setTo([recipient]) // Set the recipients (multiple)
//       .setSubject("Reset Password")
//       .setHtml("Your six-digit code is: 123456")
//     // .setSubject("Subject of the email");
//     console.log(emailParams)

//     try {
//       console.log("bfr")
//       const t =  mailerSendInstance.email.send(emailParams);
//       console.log(t, "error")
//       // ctx.send({ message: 'Six-digit code sent successfully' });
//     } catch (error) {
//       // ctx.throw(500, 'Failed to send six-digit code');
//     }



// const mailersend = new MailerSend({
//   api_key: "key",
// });

// const recipients = [new Recipient("recipie.com", "Recipient")];

// const emailParams = new EmailParams()
//   .setFrom("info@trial-7dnvo4de85rl5r86.mlsender.net")
//   .setFromName("Your Name")
//   .setRecipients(recipients)
//   .setSubject("Subject")
//   .setHtml("Greetings from the team, you got this message through MailerSend.")
//   .setText("Greetings from the team, you got this message through MailerSend.");

// const recipient = new Recipient("suyash3399@gmail.com", "Recipient");

// const emailParams = new EmailParams()
//   // @ts-ignore
//   .setFrom("info@trial-7dnvo4de85rl5r86.mlsender.net") // Set the sender
//   .setTo([recipient]) // Set the recipients (multiple)
//   .setSubject("Reset Password")
//   .setHtml("Your six-digit code is: 123456")
//   .setSubject("Subject of the email");

// const s = mailerSendInstance.email.send(emailParams);
// console.log(s, mailerSendInstance)
// s.then(response => {
//   console.log("Email sent successfully:", response);
// }).catch(error => {
//   console.log(error);
//   console.error("Failed to send email:", error);
// });