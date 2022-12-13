/*
 * @Author: jiangqb jiangqb@citycloud.com.cn
 * @Date: 2022-12-13 09:23:01
 * @LastEditors: jiangqb jiangqb@citycloud.com.cn
 * @LastEditTime: 2022-12-13 22:05:39
 * @FilePath: /vue3-admin-server/src/controller/roles.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { RoleAttributes } from "../db/models/Role.model";
import {
  createRole,
  getRole,
  getAllRoleService,
  updateRoleById,
  removeRoleById
} from "../service/roles"
import { createErrorResponse, SuccessResponse } from "../utils/Response"
import errorInfo from "../constants/errorInfo";

const {
  addAccessFailInfo,
  addRoleNameExistInfo,
  updateRoleNameExistInfo,
  updateRoleFailInfo,
  removeRoleFailInfo
} = errorInfo

// 添加菜单
export const addRoleController = async (params: RoleAttributes) => {
  const result = await getRole(params.name)
  // 是否有此角色
  if (result) {
    return createErrorResponse(addRoleNameExistInfo)
  }

  if (params) {
    // 创建角色
    try {
      const result = await createRole({
        ...params
      })
      return new SuccessResponse(result)
    } catch (error) {
      return createErrorResponse(addAccessFailInfo)
    }
  }
}

// 获取全部菜单
interface RoleListParams {
  offset: number
  limit: number
}

export const getAllRoleController = async ({
  offset,
  limit
}: RoleListParams) => {
  try {
    // 获取所有角色
    const result = await getAllRoleService(offset, limit)
    return new SuccessResponse(result)
  } catch (error) {
    return createErrorResponse(addAccessFailInfo)
  }
}

// 编辑角色
export const updateRoleController = async (id: number, data: RoleAttributes) => {
  // 查找角色是否存在
  const result = await getRole(data.name || "")
  if (result && result.id !== id) {
    return createErrorResponse(updateRoleNameExistInfo)
  }
  // 更新角色
  try {
    await updateRoleById(id, data)
    return new SuccessResponse(null, "角色编辑成功!")
  } catch (error) {
    return createErrorResponse(updateRoleFailInfo)
  }
}

// 删除角色
export const removeRoleController = async (id: number) => {
  try {
    await removeRoleById(id)
    return new SuccessResponse(null, "删除成功!")
  } catch (error) {
    return createErrorResponse(removeRoleFailInfo)
  }
}