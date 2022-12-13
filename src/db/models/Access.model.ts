/*
 * @Author: jiangqb jiangqb@citycloud.com.cn
 * @Date: 2022-12-13 21:21:53
 * @LastEditors: jiangqb jiangqb@citycloud.com.cn
 * @LastEditTime: 2022-12-13 21:33:34
 * @FilePath: /vue3-admin-server/src/db/models/Access.model.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { access } from "fs"
import { Optional } from "sequelize"
import {
  Table,
  Model,
  Column,
  AutoIncrement,
  PrimaryKey,
  Comment,
  Default,
  AllowNull
} from "sequelize-typescript"

export interface AccessAttributes {
  id: number
  type: number
  title: string
  path: string
  icon: string
  name: string
  sort_id: number
  parent_id: number | null
  status: 0 | 1
  description: string
}

interface UserRoleCreationAttributes extends Optional<AccessAttributes, "id"> {}
@Table({ tableName: "access" })
class Access extends Model<AccessAttributes, UserRoleCreationAttributes>
{
  @PrimaryKey // 主键
  @AutoIncrement // 自增
  @Comment("id")
  @Column
  id: number

  @Comment("权限类型：菜单")
  @Default(1)
  @Column
  type: number

  @Comment("标题名称")
  @AllowNull(false)
  @Column
  title: string

  @Comment("url地址")
  @Column
  path: string

  @Comment("icon名称")
  @Column
  icon: string

  @Comment("路由name")
  @Column
  name: string

  @Comment("排序权重")
  @AllowNull(false)
  @Column
  sort_id: number

  @Comment("父id")
  @Column
  parent_id: number

  @Comment("状态 0禁止 1正常")
  @Default(1)
  @Column
  status: number

  @Comment("描述")
  @Column
  description: string
}
export default access
