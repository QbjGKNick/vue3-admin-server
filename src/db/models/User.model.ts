import { Optional } from "sequelize";
import {
  Table,
  Model,
  Column,
  AutoIncrement,
  PrimaryKey,
  Comment,
  AllowNull,
  Default,
} from "sequelize-typescript";
// sequelize+typescript 参考文档
// https://sequelize.org/master/manual/typescript.html

export interface UserAttributes {
  id: number;
  username: string;
  password: string;
  email: string | null;
  mobile: string | null;
  avatar: string;
  description: string;
  isSuper: 0 | 1;
  status: 0 | 1;
}
interface UserCreationAttributes
  extends Optional<UserAttributes, "id" | "isSuper" | "status" | "avatar"> {}
@Table({ tableName: "User" })
class User extends Model<UserAttributes, UserCreationAttributes> {
  @PrimaryKey // 主键
  @AutoIncrement // 自增
  @Comment("用户id")
  @Column
  id: number;

  @AllowNull(false)
  @Comment("用户名")
  @Column
  username: string;

  @AllowNull(false)
  @Comment("密码")
  @Column
  password: string;

  @Comment("用户邮箱")
  @Column
  email: string;

  @Comment("手机号")
  @Column
  mobile: string;

  @Comment("头像")
  @Column
  avatar: string;

  @Comment("描述说明")
  @Column
  description: string;

  @Comment("超级管理员 1是 0不是")
  @Default(0)
  @Column
  isSuper: boolean;

  @Comment("账户禁用状态 1正常 0禁用")
  @Default(1)
  @Column
  status: boolean;
}
export default User;
