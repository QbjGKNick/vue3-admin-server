/*
 * @Author: jiangqb jiangqb@citycloud.com.cn
 * @Date: 2022-12-13 09:33:21
 * @LastEditors: jiangqb jiangqb@citycloud.com.cn
 * @LastEditTime: 2022-12-13 21:13:56
 * @FilePath: /vue3-admin-server/src/db/models/UserRole.model.ts
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
  ForeignKey
} from "sequelize-typescript"
import Role from "./Role.model"
import User from "./User.model"
export interface UserRoleAttributes {
  id: number
  user_id: number
  role_id: number
}
// 用户角色 所需的属性
interface UserRoleCreateAttributes
  extends Optional<UserRoleAttributes, "id"> {}
@Table({ tableName: "u_r" })
class UserRole extends Model<UserRoleAttributes, UserRoleCreateAttributes> {
  @PrimaryKey // 主键
  @AutoIncrement // 自增
  @Comment("id")
  @Column
  id: number

  @ForeignKey(() => User)
  @Comment("外键 关联user表id")
  @Column
  user_id: number

  @ForeignKey(() => Role)
  @Comment("外键 关联roles表id")
  @Column
  role_id: number
}
export default UserRole
