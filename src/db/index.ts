import sequelize from "./seq";

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();
// 同步更新model
(async () => {
  // model配置修改后 执行 sync 进行同步更新

  await sequelize.sync({ alter: true });
  console.log("sync ok");
})();
