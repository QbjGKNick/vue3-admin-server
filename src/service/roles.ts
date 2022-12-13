import RoleModel, { RoleAttributes } from "../db/models/Role.model"

// 创建菜单资源
export const createRole = async (params: RoleAttributes) => {
  const result = await RoleModel.create({
    ...params
  })
  return result.toJSON()
}

// 根据角色名称获取角色
export const getRole = async (name: string) => {
  const result = await RoleModel.findOne({
    where: {
      name
    }
  })
  if (result == null) return null
  return result.toJSON() as RoleAttributes
}

// 获取全部角色
export const getAllRoleService = async (offset = 0, limit = 10) => {
  const { count, rows } = await RoleModel.findAndCountAll({
    limit,
    offset: limit * offset
  })
  return {
    roles: rows,
    count
  }
}

// 编辑角色
export const updateRoleById = async (id: number, data: RoleAttributes) => {
  const { name, description, is_default } = data
  const result = await RoleModel.update(
    {
      name,
      description,
      is_default
    },
    {
      where: {
        id
      }
    }
  )
  return result
}

// 删除角色
export const removeRoleById = async (id: number) => {
  const result = await RoleModel.destroy({
    where: {
      id
    }
  })
  return result
}
