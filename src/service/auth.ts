/*
 * @Author: jiangqb jiangqb@citycloud.com.cn
 * @Date: 2022-12-02 09:23:39
 * @LastEditors: jiangqb jiangqb@citycloud.com.cn
 * @LastEditTime: 2022-12-13 22:45:11
 * @FilePath: /vue3-admin-server/src/service/auth.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import UserModel, { UserAttributes } from "../db/models/User.model";
import { UserWhereProps } from "./types";
import { createHmac } from "../utils/createHmac";
import { WhereOptions } from "sequelize";
import { RoleModel } from "../db/models";

/**
 * 创建用户
 */
export const createUser = async ({
  username,
  password,
  email,
  mobile,
  status,
}: UserAttributes) => {
  const result = await UserModel.create({
    username,
    password,
    email,
    mobile,
    status,
  });
  return result.toJSON();
};

/**
 * 根据用户名 获取用户信息
 * @param username 用户名
 * @param password 密码
 * @param id 用户 id
 * @returns 用户信息
 */
export const getUserInfo = async ({
  username,
  password,
  id,
}: UserWhereProps): Promise<UserAttributes | null> => {
  const where: WhereOptions<UserWhereProps> = {
    username,
  };
  if (password) {
    where.password = createHmac(password);
  }
  if (typeof id !== "undefined") {
    where.id = id;
  }
  const result = await UserModel.findOne({
    attributes: {
      exclude: ["password", "createdAt", "updatedAt"],
    },
    where,
  });
  if (result == null) return null;
  return result.toJSON() as UserAttributes;
};

export const getUserInfoAndRoles = async (id: number) => {
  console.log(id)
  const user = await UserModel.findOne({
    attributes: [
      "id",
      "username",
      "email",
      "mobile",
      "isSuper",
      "status",
      "avatar",
      "description"
    ],
    where: {
      id
    },
    include: [
      // 联合查询
      {
        model: RoleModel,
        attributes: ["id", "name", "description"]
      }
    ]
  })
  return user
}