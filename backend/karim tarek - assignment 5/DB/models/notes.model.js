import { DataTypes } from "sequelize";
import { sequelizeInstance } from "../connections.js";

export const notesModel = sequelizeInstance.define(
  "note",
  {
    id: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);
