'use strict';

/**
 * A set of functions called "actions" for `reset-password`
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

// /**
//  * A set of functions called "actions" for `reset-password`
//  */

module.exports = {
  resetPassword: async (ctx, next) => {
    try {

      const params = ctx.request.body;
      const identifier = params.identifier

      const user = await strapi.query('plugin::users-permissions.user').findOne({
        where: { email: identifier },
      });
      await strapi.entityService.update('plugin::users-permissions.user', user.id, {
        data: { resetPasswordToken: null, password: params.newPassword },
        populate: ['role'],
      });
      ctx.send({ message: 'Passowrd reset successfully' });

    } catch (err) {
      ctx.body = err;
    }
  }
};

// // const identifier = "sjoy@yopmail.com"
// // const newPassword = "#@Strapi05"

// // // Get User based on identifier
// // // const user = await strapi.query('user', 'users permissions').findOne({ username: identifier });
// // const user = strapi.plugins['users-permissions'].services.user.findOne({ email: identifier });
// // user.then(response => {
// //   console.log("Email sent successfully:", response);
// // }).catch(error => {
// //   console.log(error);
// //   console.error("Failed to send email:", error);
// // });


// // // Generate new hash password
// // const password = strapi.plugins['users-permissions'].services.user.hashPassword({ password: newPassword });
// // password.then(response => {
// //   console.log("Email sent successfully:", response);
// // }).catch(error => {
// //   console.log(error);
// //   console.error("Failed to send email:", error);
// // });

// 'use strict';

// // @ts-ignore
// const stripe = require("stripe")(process.env.STRIPE_KEY);
/**
 * order controller
 */

// const { createCoreController } = require("@strapi/strapi").factories;

// module.exports = createCoreController("api::resest-password.reset-password", ({ strapi }) => ({
//   async create(ctx) {
//     const user = ctx.state.user;
//     // @ts-ignore
//     const { products, cartflag } = ctx.request.body;
//     try {
//       const lineItems = await Promise.all(
//         products.map(async (product) => {
//           const item = await strapi
//             .service("api::product.product")
//             .findOne(product.id);

//           return {
//             price_data: {
//               currency: "inr",
//               product_data: {
//                 name: item.title,
//               },
//               unit_amount: Math.round(item.discountedPrice * 100),
//             },
//             quantity: product.quantity,
//           };
//         })
//       );


//       const session = await stripe.checkout.sessions.create({
//         shipping_address_collection: { allowed_countries: ["IN"] },
//         payment_method_types: ["card"],
//         mode: "payment",
//         success_url: process.env.CLIENT_URL + `/payment?success=true&session_id={CHECKOUT_SESSION_ID}&cartflag=${cartflag}`,
//         cancel_url: process.env.CLIENT_URL + `/payment?success=false&session_id={CHECKOUT_SESSION_ID}&&cartflag=${cartflag}`,
//         line_items: lineItems,
//       });


//       await strapi
//         .service("api::order.order")
//         .create({ data: { products, stripeId: session.id, userId: user.id } });

//       return { stripeSession: session };
//     } catch (error) {
//       ctx.response.status = 500;
//       return { error };
//     }
//   },
// }));
// module.exports = createCoreController("api::reset-password.reset-password", ({ strapi }) => ({
//   // Controller logic goes here
// }));
// module.exports = createCoreController('user', ({ strapi }) => ({
//   async resetPassword(ctx) {
//     // Your reset password logic here
//     const { id, password } = ctx.request.body;
//     await strapi.plugins['users-permissions'].services.user.update(
//       { id },
//       { resetPasswordToken: null, password }
//     );

//     ctx.send({ message: 'Password reset successful' });
//   },
// }));
