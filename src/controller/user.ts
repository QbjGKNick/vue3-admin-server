/*
 * @Author: error: git config user.name && git config user.email & please set dead value or install git
 * @Date: 2022-12-15 22:55:41
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @LastEditTime: 2022-12-15 23:48:49
 * @FilePath: /vue3-admin-server/src/controller/user.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import {
  getAllUserService,
  updateUserService,
  allocUserRoleService,
  destroyUserRoleByUserId,
  removeUserService,
} from "../service/user";
import { createErrorResponse, SuccessResponse } from "../utils/Response";
import errorInfo from "../constants/errorInfo";
import {
  UserAttributes,
  UserAttributesWithRoles,
} from "../db/models/User.model";
import { getUserInfo } from "../service/auth";

const {
  updateUserExistFailInfo,
  getUserListFailInfo,
  allocUserRoleFailInfo,
  deleteUserInfoFailInfo,
} = errorInfo;

// 分配用户角色
export const allocUserRoleController = async (
  id: number,
  roles: number[] = []
) => {
  // 移除之前该用户与角色记录
  await destroyUserRoleByUserId(id);
  try {
    await allocUserRoleService(id, roles);
    return new SuccessResponse(null, "用户角色分配成功");
  } catch (error) {
    console.log(error);
    return createErrorResponse(allocUserRoleFailInfo);
  }
};

// 获取全部菜单
export interface WhereQuery {
  name: string;
  status: number;
  mobile: string;
}
export interface UserListParams {
  offset: number;
  limit: number;
  query: Record<string, any>;
}

// 获取全部用户列表
export const getAllUserController = async ({
  offset,
  limit,
  query,
}: UserListParams) => {
  try {
    // 获取所有用户
    const result = await getAllUserService(offset, limit, query);
    return new SuccessResponse(result);
  } catch (error) {
    console.log(error);
    return createErrorResponse(getUserListFailInfo);
  }
};

// 更改用户信息
export const updateUserController = async (
  id: number,
  data: UserAttributesWithRoles
) => {
  const { username, email, mobile, description, status, roleIds } = data;
  // 判断修改后的用户名是否已经存在其他重名用户
  const userInfo = await getUserInfo({ username });
  if (userInfo && userInfo.id !== id) {
    return createErrorResponse(updateUserExistFailInfo);
  }
  try {
    await updateUserService(id, {
      username,
      email,
      mobile,
      description,
      status,
    } as UserAttributes);
    await destroyUserRoleByUserId(id); // 销毁角色重新分配
    await allocUserRoleController(id, roleIds);
    return new SuccessResponse(null, "用户修改信息成功");
  } catch (error) {
    return createErrorResponse(getUserListFailInfo);
  }
};

// 删除用户
export const removeUserController = async (id: number) => {
  try {
    await removeUserService(id);
    return new SuccessResponse(null, "用户删除成功");
  } catch (error) {
    return createErrorResponse(deleteUserInfoFailInfo);
  }
};
