import { DataTypes } from "sequelize";
import { sequelizeInstance } from "../connections.js";
import { usersModel } from "./users.model.js";
import { notesModel } from "./notes.model.js";

export const usersNotesModel = sequelizeInstance.define("users_notes", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
});

usersModel.belongsToMany(notesModel, { through: usersNotesModel });
notesModel.belongsToMany(usersModel, { through: usersNotesModel });
