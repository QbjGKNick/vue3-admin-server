/*
 * @Author: jiangqb jiangqb@citycloud.com.cn
 * @Date: 2022-12-13 09:24:18
 * @LastEditors: jiangqb jiangqb@citycloud.com.cn
 * @LastEditTime: 2022-12-13 21:16:46
 * @FilePath: /vue3-admin-server/src/db/models/Role.model.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Optional } from "sequelize"
import {
  Table,
  Model,
  Column,
  AutoIncrement,
  PrimaryKey,
  Comment,
  AllowNull,
  Default,
  BelongsToMany
} from "sequelize-typescript"
import User from "./User.model"
import UserRole from "./UserRole.model"

// 角色表中需要的属性
export interface RoleAttributes {
  id: number
  name: string
  description: string
  is_default: number
}
// 创建时所需的角色
interface RoleCreationAttributes extends Optional<RoleAttributes, "id" | "is_default"> {}
@Table ({ tableName: "Role" })
class Role extends Model<RoleAttributes, RoleCreationAttributes> {
  @PrimaryKey // 主键
  @AutoIncrement // 自增
  @Comment("角色 id")
  @Column
  id: number

  @AllowNull(false)
  @Comment("角色名称 唯一")
  @Column
  name: string

  @Comment("描述")
  @Column
  description: string

  @Comment("默认角色 1是 0不是")
  @Default(1)
  @Column
  is_default: number

  // 一个角色关联多个用户
  @BelongsToMany(() => User, () => UserRole)
  Users: User[]
}

export default Role
