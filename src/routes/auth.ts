/*
 * @Author: jiangqb jiangqb@citycloud.com.cn
 * @Date: 2022-12-02 09:23:39
 * @LastEditors: jiangqb jiangqb@citycloud.com.cn
 * @LastEditTime: 2022-12-02 14:07:31
 * @FilePath: /vue3-admin-server/src/routes/auth.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Router from "@koa/router";
import { loginController, LoginModel, registerController } from "../controller/auth"
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


/**
 * 用户登录
 * /auth/login
 */
router.post("/login", async(ctx) => {
  ctx.body = await loginController(ctx.request.body as LoginModel)
})

router.get("/test", async (ctx) => {
  ctx.body = "测试接口"
})

export default router;
