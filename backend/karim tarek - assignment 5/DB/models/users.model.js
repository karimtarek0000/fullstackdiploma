import { DataTypes } from "sequelize";
import { sequelizeInstance } from "../connections.js";

export const usersModel = sequelizeInstance.define(
  "user",
  {
    id: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(11),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(20),
      unique: true,
    },
    password: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER(2),
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);
