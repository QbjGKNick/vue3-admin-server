import crypto from "crypto";
import { userSecret } from "../config/auth";

// md5 加密
export const createHmac = (content: any) => {
  const md5 = crypto.createHmac("sha1", userSecret);
  return md5.update(content).digest("hex");
};
