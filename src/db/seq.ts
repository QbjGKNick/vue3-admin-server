/*
 * @Author: jiangqb jiangqb@citycloud.com.cn
 * @Date: 2022-12-02 09:23:39
 * @LastEditors: jiangqb jiangqb@citycloud.com.cn
 * @LastEditTime: 2022-12-03 16:29:08
 * @FilePath: /vue3-admin-server/src/db/seq.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Sequelize } from "sequelize-typescript";
const sequelize = new Sequelize({
  host: "localhost",
  database: "vue3-admin",
  timezone: "+08:00",
  dialect: "mysql",
  username: "root",
  password: "jqb12345",
  models: [__dirname + "/models/*.model.ts"], // or [User, Role],
  pool: {
    // 连接池
    max: 5, // 最大连接数量
    min: 0,
    idle: 10000, // 一个连接池10s之内 没有被使用 则释放
  },
});
export default sequelize;
