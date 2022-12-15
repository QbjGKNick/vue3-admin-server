/*
 * @Author: error: git config user.name && git config user.email & please set dead value or install git
 * @Date: 2022-12-15 22:57:33
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @LastEditTime: 2022-12-15 23:49:26
 * @FilePath: /vue3-admin-server/src/service/user.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { RoleModel, UserModel, UserRoleModel } from "../db/models";
import User, { UserAttributes } from "../db/models/User.model";

// 分配角色
export const allocUserRoleService = async (id: number, data: number[]) => {
  const roles = data.map((rid) => ({
    user_id: id,
    role_id: rid,
  }));
  const result = await UserRoleModel.bulkCreate(roles);
  return result;
};

// 获取全部用户
export const getAllUserService = async (
  offset = 0,
  limit = 10,
  query: Record<string, any>
) => {
  const whereProps = {} as Record<string, any>;
  // 检索条件处理
  if (query.mobile) {
    whereProps.mobile = query.mobile;
  }

  if (query.username) {
    whereProps.username = query.username;
  }

  if (!isNaN(query.status)) {
    whereProps.status = Number(query.status);
  }

  const { count, rows } = await UserModel.findAndCountAll({
    attributes: [
      "id",
      "username",
      "email",
      "mobile",
      "isSuper",
      "status",
      "avatar",
      "description",
      "createdAt",
    ],
    where: whereProps,
    limit,
    offset: limit * offset,
    distinct: true,
    include: [
      // 联合查询
      {
        model: RoleModel,
        attributes: ["id", "name", "description"],
      },
    ],
  });
  // 数据格式化
  return {
    users: rows,
    count,
  };
};

// 修改用户
export const updateUserService = async (id: number, data: UserAttributes) => {
  const result = await UserModel.update(data, {
    where: {
      id,
    },
  });
  return result;
};

/**
 * 删除与该用户相关联记录
 * @param id 角色id
 */
export const destroyUserRoleByUserId = async (id: number) => {
  const result = await UserRoleModel.destroy({
    where: {
      user_id: id,
    },
  });
  return result;
};

// 根据用户id删除用户
export const removeUserService = async (id: number) => {
  const result = await UserModel.destroy({
    where: {
      id,
    },
  });
  return result;
};
