import Koa from "koa"
import cors from "@koa/cors"
import logger from "koa-logger"
import bodyparser from "koa-bodyparser"
// routes
import authRoutes from "./routes/auth"
import "./db"

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

// routes
// 用户验证路由（登录 注册）
app.use(authRoutes.routes()).use(authRoutes.allowedMethods())

// listen
const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`server listening on ${port}`)
})

app.on("error", err => console.error("server error", err))
