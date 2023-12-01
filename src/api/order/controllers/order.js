'use strict';

// @ts-ignore
const stripe = require("stripe")(process.env.STRIPE_KEY);
/**
 * order controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::order.order", ({ strapi }) => ({
  async create(ctx) {
    const user = ctx.state.user;
    // @ts-ignore
    const { products ,cartflag} = ctx.request.body;
    try {
      const lineItems = await Promise.all(
        products.map(async (product) => {
          const item = await strapi
            .service("api::product.product")
            .findOne(product.id);

          return {
            price_data: {
              currency: "inr",
              product_data: {
                name: item.title,
              },
              unit_amount: Math.round(item.discountedPrice * 100),
            },
            quantity: product.quantity,
          };
        })
      );

  
      const session = await stripe.checkout.sessions.create({
        shipping_address_collection: { allowed_countries: ["IN"] },
        payment_method_types: ["card"],
        mode: "payment",
        success_url: process.env.CLIENT_URL + `/payment?success=true&session_id={CHECKOUT_SESSION_ID}&cartflag=${cartflag}`,
        cancel_url: process.env.CLIENT_URL + `/payment?success=false&session_id={CHECKOUT_SESSION_ID}&&cartflag=${cartflag}`,
        line_items: lineItems,
      });
      

      await strapi
        .service("api::order.order")
        .create({ data: { products, stripeId: session.id , userId: user.id } });

      return { stripeSession: session };
    } catch (error) {
      ctx.response.status = 500;
      return { error };
    }
  },
}));
