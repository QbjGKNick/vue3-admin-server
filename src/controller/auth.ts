/*
 * @Author: jiangqb jiangqb@citycloud.com.cn
 * @Date: 2022-12-02 09:23:39
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @LastEditTime: 2022-12-15 23:48:21
 * @FilePath: /vue3-admin-server/src/controller/auth.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { UserAttributesWithRoles } from "../db/models/User.model";
import { createUser, getUserInfo, getUserInfoAndRoles } from "../service/auth";
import { ErrorResponse, SuccessResponse } from "../utils/Response";
import errorInfo from "../constants/errorInfo";
import { createHmac } from "../utils/createHmac";
import { createToken, getInfoByToken } from "../utils/token";
import { allocUserRoleService } from "../service/user";

const {
  registerUserNameExistInfo,
  registerFailInfo,
  loginFailInfo,
  getUserInfoFailInfo,
} = errorInfo;

export const registerController = async (params: UserAttributesWithRoles) => {
  const { username, password = "888888" } = params; // 设置默认密码
  // 注册前先看下用户是否已注册 getUserInfo services
  const userInfo = await getUserInfo({ username });
  if (userInfo) {
    // 如果已注册
    // 用户已注册
    const { code, message } = registerUserNameExistInfo;
    return new ErrorResponse(code, message);
  }
  // 用户不存在
  try {
    const { roleIds = [] } = params;
    const result = await createUser({
      // 创建用户
      ...params,
      password: createHmac(password),
    });
    await allocUserRoleService(result.id, roleIds);
    return new SuccessResponse({});
  } catch (error) {
    // 注册失败
    const { code, message } = registerFailInfo;
    return new ErrorResponse(code, message);
  }
};

export interface LoginModel {
  username: string;
  password: string;
}

export const loginController = async (params: LoginModel) => {
  const { username, password } = params;
  // 根据用户名和密码 获取用户信息
  const userInfo = await getUserInfo({ username, password });
  if (userInfo) {
    // 能获取到返回token
    const { id, username } = userInfo;
    const token = createToken({
      // 根据用户id和用户名生成 token
      id,
      username,
    });
    return new SuccessResponse({ token });
  }
  // 获取不到返回 登录失败
  const { code, message } = loginFailInfo;
  return new ErrorResponse(code, message);
};

/**
 * 用户信息
 * @param param string
 */
interface UserTokenInfo {
  id: number;
  username: string;
}

export const userInfoController = async (param = "") => {
  const token = param.split(" ")[1];
  if (token) {
    // 根据token解析token信息
    const tokeInfo = await getInfoByToken<UserTokenInfo>(token);
    if (tokeInfo) {
      const { id } = tokeInfo;
      const userInfo = await getUserInfoAndRoles(id);
      return new SuccessResponse(userInfo);
    }
  }
  const { code, message } = getUserInfoFailInfo;
  return new ErrorResponse(code, message);
};
