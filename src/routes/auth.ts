import Router from "@koa/router";
import { registerController } from "../controller/auth"
import { UserAttributes } from "../db/models/User.model";

const router = new Router({
  prefix: "/auth",
});

/**
 * 用户注册接口
 * /auth/register
 */
router.post("/register", async (ctx) => {
  ctx.body = await registerController(ctx.request.body as UserAttributes)
});

export default router;
