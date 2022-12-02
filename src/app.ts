/*
 * @Author: jiangqb jiangqb@citycloud.com.cn
 * @Date: 2022-12-01 08:58:23
 * @LastEditors: jiangqb jiangqb@citycloud.com.cn
 * @LastEditTime: 2022-12-02 14:06:06
 * @FilePath: /vue3-admin-server/src/app.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BDwei
 */
import Koa from "koa"
import cors from "@koa/cors"
import logger from "koa-logger"
import bodyparser from "koa-bodyparser"
// routes
import authRoutes from "./routes/auth"
import "./db"
import jwt from "koa-jwt"
import { jwtSecret } from "./config/auth"

// koa 应用实例
const app = new Koa()

// middlewares
app.use(cors()) // 支持跨域
app.use(
  bodyparser({
    // 解析请求体
    enableTypes: ["json", "form", "text"]
  })
)
app.use(logger()) // 开发日志中间件

app.use((ctx, next) => {
  return next().catch(err => {
    if (err.status === 401) {
      ctx.status = 401
      ctx.body = {
        code: 401,
        error: "未登录 token 失效"
      }
    } else {
      ctx.throw(err)
    }
  })
})

// token 验证 header 未携带 token 直接返回 401 Authentication Error
app.use(
  jwt({ secret: jwtSecret }).unless({
    // 白名单
    path: ["/api/auth/login", "/api/auth/register"]
  })
)

// routes
// 用户验证路由（登录 注册）
app.use(authRoutes.routes()).use(authRoutes.allowedMethods())

// listen
const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`server listening on ${port}`)
})

app.on("error", err => console.error("server error", err))
