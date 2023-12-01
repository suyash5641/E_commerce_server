'use strict';

/**
 * A set of functions called "actions" for `send-email`
 */

module.exports = {
  // exampleAction: async (ctx, next) => {
  //   try {
  //     ctx.body = 'ok';
  //   } catch (err) {
  //     ctx.body = err;
  //   }
  // }
};
'use strict';

// import { MailerSend } from "mailersend";



// /**
//  * A set of functions called "actions" for `send-email`
//  */

// const Recipient = require("mailersend").Recipient;
// const EmailParams = require("mailersend").EmailParams;
// // const MailerSend = require("mailersend");

// // // @ts-ignore
// // const mailersend = new MailerSend({
// //   api_key: process.env.MAILERSEND_API_KEY, // Replace "key" with your actual MailerSend API key
// // });

// // @ts-ignore
// const mailersend = require("mailersend")(process.env.MAILERSEND_API_KEY);

// // module.exports = {
// //   // exampleAction: async (ctx, next) => {
// //   //   try {
// //   //     ctx.body = 'ok';
// //   //   } catch (err) {
// //   //     ctx.body = err;
// //   //   }
// //   // }
// // };

// module.exports = {
//   async sendResetCode(ctx) {
//     const { email } = ctx.request.body;

//     const recipient = new Recipient(email, "Recipient");

//     const emailParams = new EmailParams()
//       // @ts-ignore
//       .setFrom("info@trial-7dnvo4de85rl5r86.mlsender.net")
//       // @ts-ignore
//       .setFromName("Your Name")
//       .setRecipients([recipient])
//       .setSubject("Reset Password")
//       .setHtml("Your six-digit code is: 123456") // Change "123456" to generate a random code
//       .setText("Your six-digit code is: 123456");

//     try {
//       await mailersend.send(emailParams);
//       ctx.send({ message: 'Six-digit code sent successfully' });
//     } catch (error) {
//       ctx.throw(500, 'Failed to send six-digit code');
//     }
//   },
// };


const Recipient = require("mailersend").Recipient;
const EmailParams = require("mailersend").EmailParams;
const t = require("mailersend").MailerSend;

// // const MailerSend = require("mailersend");

// // @ts-ignore
// // const mailersend = require("mailersend")(process.env.MAILERSEND_API_KEY);
// @ts-ignore
// const mailersend = require("mailersend")(process.env.MAILERSEND_API_KEY);
// const mailersend = require("mailersend");
// const mailerSendInstance = t({
//   api_key: process.env.MAILERSEND_API_KEY,
// });

// const mailersend = require("mailersend").MailerSend

const mailerSendInstance = new t({
  apiKey: process.env.MAILERSEND_API_KEY,
});
// const mailerSendInstance = new t({
//   apiKey: "mlsn.c82882b7374974ed6c5e27f0bdba1183114f3bb816d892c27e9b7fc7cb6af51a",
// });

module.exports = {
  sendResetCode: async (ctx, next) => {
    const { email } = ctx.request.body;

    const recipient = new Recipient(email, "Recipient");
    console.log(email)

    // const emailParams = new EmailParams()
    //   // @ts-ignore
    //   .setFrom("info@trial-7dnvo4de85rl5r86.mlsender.net")
    //   // @ts-ignore
    //   // .setFromName("Your Name")
    //   .setRecipients([recipient])
    //   .setSubject("Reset Password")
    //   .setHtml("Your six-digit code is: 123456") // Change "123456" to generate a random code
    //   .setText("Your six-digit code is: 123456");

    // const emailParams = new EmailParams(){
    //   to:recipient
    // }

    const emailParams = new EmailParams()
      // @ts-ignore
      // .setFrom("info@trial-7dnvo4de85rl5r86.mlsender.net") // Set the sender
      .setFrom({ email: "info@trial-7dnvo4de85rl5r86.mlsender.net", name: "Sender Name" })
      .setTo([recipient]) // Set the recipients (multiple)
      .setSubject("Reset Password")
      .setHtml("Your six-digit code is: 123456")
    // .setSubject("Subject of the email");
    console.log(emailParams)

    try {
      console.log("bfr")
      const t = await mailerSendInstance.email.send(emailParams);
      console.log(t, "error")
      ctx.send({ message: 'Six-digit code sent successfully' });
    } catch (error) {
      console.log(error, "error")
      ctx.throw(500, 'Failed to send six-digit code', error);
    }
  }
};

// const emailParams = new EmailParams()
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