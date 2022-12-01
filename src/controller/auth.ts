import { UserAttributes } from "../db/models/User.model";
import { createUser, getUserInfo } from "../service/auth";
import { ErrorResponse, SuccessResponse } from "../utils/Response";
import errorInfo from "../constants/errorInfo";
import { createHmac } from "../utils/createHmac";

const { registerUserNameExistInfo, registerFailInfo } = errorInfo;

export const registerController = async (params: UserAttributes) => {
  const { username, password } = params;
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
    await createUser({
      // 创建用户
      ...params,
      password: createHmac(password),
    });
    return new SuccessResponse({});
  } catch (error) {
    // 注册失败
    const { code, message } = registerFailInfo;
    return new ErrorResponse(code, message);
  }
};
