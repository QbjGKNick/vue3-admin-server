/*
 * @Author: jiangqb jiangqb@citycloud.com.cn
 * @Date: 2022-12-02 09:41:58
 * @LastEditors: jiangqb jiangqb@citycloud.com.cn
 * @LastEditTime: 2022-12-13 22:42:41
 * @FilePath: /vue3-admin-server/src/utils/token.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import jwt from "jsonwebtoken"
import { jwtSecret } from "../config/auth"
import util from "util"

export const createToken = (payload: any) => {
  return jwt.sign(payload, jwtSecret, { expiresIn: "6h" })
}

// 解析token
const jwtVerify = util.promisify<string, string>(jwt.verify)
export const getInfoByToken = async <T>(token: string): Promise<T | null> => {
  try {
    const res = await jwtVerify(token, jwtSecret)
    return res as unknown as T
  } catch (error) {
    return null
  }
}