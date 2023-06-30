import { Sequelize } from "sequelize";

export const sequelizeInstance = new Sequelize("notes_app", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export const dbConnection = async () => {
  return await sequelizeInstance
    .sync({ alter: true })
    .then(() => {
      console.log("Database connection established");
    })
    .catch((err) => {
      console.log("Failed to connect database");
    });
};
