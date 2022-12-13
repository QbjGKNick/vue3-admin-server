/*
 * @Author: jiangqb jiangqb@citycloud.com.cn
 * @Date: 2022-12-01 08:58:23
 * @LastEditors: jiangqb jiangqb@citycloud.com.cn
 * @LastEditTime: 2022-12-13 21:16:24
 * @FilePath: /vue3-admin-server/src/db/models/User.model.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
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
  BelongsToMany,
} from "sequelize-typescript";
import Role from "./Role.model"
import UserRole from "./UserRole.model"
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

// 用户表包含对应的角色
export type UserAttributesWithRoles = UserAttributes & { roleIds: [] }

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

  // 一个用户关联多个角色
  @BelongsToMany(() => Role, () => UserRole)
  roles: Role[]
}
export default User;
