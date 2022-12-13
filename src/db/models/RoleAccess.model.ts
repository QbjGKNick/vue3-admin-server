import { Optional } from "sequelize";
import {
  Table,
  Model,
  Column,
  AutoIncrement,
  PrimaryKey,
  Comment
} from "sequelize-typescript"

export interface RoleAccessAttributes {
  id: number
  access_id: number
  role_id: number
}

interface RoleAccessCreationAttributes
  extends Optional<RoleAccessAttributes, "id"> {}
@Table({ tableName: "r_a" })
class RoleAccess extends Model<RoleAccessAttributes, RoleAccessCreationAttributes> {
  @PrimaryKey // 主键
  @AutoIncrement // 自增
  @Comment("id")
  @Column
  id: number

  @Comment("外键 关联access表id")
  @Column
  access_id: number
  
  @Comment("外键 关联roles表id")
  @Column
  role_id: number
}
export default RoleAccess
