/*
 * @Author: error: git config user.name && git config user.email & please set dead value or install git
 * @Date: 2022-12-15 22:29:55
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @LastEditTime: 2022-12-15 22:51:16
 * @FilePath: /vue3-admin-server/src/routes/user.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Router from "@koa/router";
import {
  getAllUserController,
  updateUserController,
  allocUserRoleController,
  removeUserController,
} from "../controller/user";
import { UserAttributesWithRoles } from "../db/models/User.model";

const router = new Router({
  prefix: "/api/user",
});

/**
 * 给用户分配角色
 * post /api/user/role/:id
 */
router.post("/role/:id", async (ctx) => {
  const { id } = ctx.params;
  const { roles } = ctx.request.body as { roles: number[] };
  ctx.body = await allocUserRoleController(Number(id), roles);
});

/**
 * 获取用户列表
 * get /api/user
 */
router.get("/", async (ctx) => {
  const { pageNum = 0, pageSize = 10, ...query } = ctx.request.query;
  ctx.body = await getAllUserController({
    offset: Number(pageNum),
    limit: Number(pageSize),
    query,
  });
});

/**
 * 编辑用户roles
 * put /api/user/:id
 */
router.put("/:id", async (ctx) => {
  const { id } = ctx.params;
  ctx.body = await updateUserController(
    Number(id),
    ctx.request.body as UserAttributesWithRoles
  );
});

/**
 * 删除用户
 * delete /api/user/:id
 */
router.delete("/:id", async (ctx) => {
  const { id } = ctx.params;
  ctx.body = await removeUserController(Number(id));
});

export default router;
