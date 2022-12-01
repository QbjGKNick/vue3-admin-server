import { Sequelize } from "sequelize-typescript";
const sequelize = new Sequelize({
  host: "localhost",
  database: "vue3-admin",
  timezone: "+08:00",
  dialect: "mysql",
  username: "root",
  password: "",
  models: [__dirname + "/models/*.model.ts"], // or [User, Role],
  pool: {
    // 连接池
    max: 5, // 最大连接数量
    min: 0,
    idle: 10000, // 一个连接池10s之内 没有被使用 则释放
  },
});
export default sequelize;
