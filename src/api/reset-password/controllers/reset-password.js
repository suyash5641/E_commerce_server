'use strict';

/**
 * A set of functions called "actions" for `reset-password`
 */

module.exports = {
  resetPassword: async (ctx, next) => {
    try {

      const params = ctx.request.body;
      const identifier = params.identifier

      const user = await strapi.query('plugin::users-permissions.user').findOne({
        where: { email: identifier },
      });
      if (user === null)
        ctx.throw(404, "Enter registered email id")
      const userLog = await strapi.entityService.findOne('api::user-log.user-log', user?.id);
      console.log("test", userLog?.resendPasswordOtp !== params?.resendPasswordOtp, userLog?.resendPasswordOtp, params?.resendPasswordOtp)
      if (userLog?.resendPasswordOtp !== params?.resendPasswordOtp)
        ctx.throw(401, 'Enter correct six digit otp')
      await strapi.entityService.update('plugin::users-permissions.user', user.id, {
        data: { resetPasswordToken: null, password: params.newPassword },
        populate: ['role'],
      });
      ctx.send({ message: 'Passowrd reset successfully' });

    } catch (err) {
      ctx.body = err;
      ctx.throw(500, err)
    }
  }
};

