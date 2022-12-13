/*
 * @Author: jiangqb jiangqb@citycloud.com.cn
 * @Date: 2022-12-13 09:22:21
 * @LastEditors: jiangqb jiangqb@citycloud.com.cn
 * @LastEditTime: 2022-12-13 22:20:02
 * @FilePath: /vue3-admin-server/src/routes/role.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Router from "@koa/router";
import {
  addRoleController,
  getAllRoleController,
  updateRoleController,
  removeRoleController
} from "../controller/roles"
import { RoleAttributes } from "../db/models/Role.model";

const router = new Router({
  prefix: "/api/role"
})

/**
 * 添加角色
 * post /api/role
 */
router.post("/", async (ctx) => {
  console.log(ctx.request.body)
  ctx.body = await addRoleController(ctx.request.body as RoleAttributes)
})

/**
 * 获取全部角色
 * get /api/role
 */
router.get("/", async (ctx) => {
  const { pageNum = 0, pageSize = 10 } = ctx.request.query
  ctx.body = await getAllRoleController({
    offset: Number(pageNum),
    limit: Number(pageSize)
  })
})

/**
 * 编辑角色
 * put /api/role/:id
 */
router.put("/:id", async (ctx) => {
  const { id } = ctx.params
  ctx.body = await updateRoleController(
    Number(id),
    ctx.request.body as RoleAttributes
  )
})

/**
 * 删除角色
 * delete /api/role/:id
 */
router.delete("/:id", async (ctx) => {
  const { id } = ctx.params
  ctx.body = await removeRoleController(Number(id))
})

export default router
