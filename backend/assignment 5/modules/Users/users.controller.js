import { Op } from "sequelize";
import { usersModel } from "../../DB/models/users.model.js";

export const signUp = async (req, res) => {
  const { name, email, password, age } = req.body;
  try {
    await usersModel.create({ name, email, password, age });
    res.statusCode = 201;
    res.json({
      message: "User created successfully",
      data: {
        name,
        email,
        age,
      },
    });
  } catch (error) {
    res.statusCode = 400;
    res.json({
      message: error.errors[0].message,
    });
  }
};

export const signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const data = await usersModel.findOne({ where: { email, password } });

    if (data) {
      res.statusCode = 200;
      res.json({
        message: "User authenticated",
        data,
      });
      return;
    }
    res.statusCode = 400;
    res.json({
      message: "Email or password incorrect",
    });
  } catch (error) {
    res.statusCode = 401;
    res.json({
      message: "Error",
    });
  }
};

export const updateUser = async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  try {
    await usersModel.update(data, { where: { id } });

    res.statusCode = 201;
    res.json({ message: "User updated successfully" });
  } catch (error) {
    res.statusCode = 401;
    res.json({ message: error.errors[0].message });
  }
};

export const deleteUser = async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  try {
    await usersModel.destroy({
      where: { id },
      force: true,
    });

    res.statusCode = 200;
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.statusCode = 400;
    res.json({ message: error.errors[0].message });
  }
};

export const getAllUsers = async (_, res) => {
  try {
    const data = await usersModel.findAndCountAll();

    res.statusCode = 200;
    res.json({ message: "All users", data });
  } catch (error) {
    res.statusCode = 400;
    res.json({ message: "Error" });
  }
};

// Search
const searchForUsers = async (req, res) => {
  const search = req.body.search;

  try {
    const data = await usersModel.findAndCountAll({
      where: {
        name: { [Op.like]: `${search}%` },
        age: { [Op.lt]: 30 },
      },
    });

    if (data) {
      res.statusCode = 200;
      res.json({ message: "Success", data });
      return;
    }
    res.statusCode = 400;
    res.json({ message: "No data found" });
  } catch (error) {
    res.statusCode = 400;
    res.json({ message: "Error" });
  }
};

const searchForAge = async (_, res) => {
  try {
    const data = await usersModel.findAndCountAll({
      where: {
        age: { [Op.between]: [20, 30] },
      },
    });

    if (data) {
      res.statusCode = 200;
      res.json({ message: "All users ages between 20:30", data });
      return;
    }
    res.statusCode = 400;
    res.json({ message: "No ages between 20:30" });
  } catch (error) {
    res.statusCode = 400;
    res.json({ message: "Error" });
  }
};

const searchForUsersByIds = async (req, res) => {
  const ids = req.body.ids;

  try {
    const data = await usersModel.findAndCountAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
    });

    if (data) {
      res.statusCode = 200;
      res.json({ message: "All users with specific ids", data });
      return;
    }
    res.statusCode = 400;
    res.json({ message: "No users exists" });
  } catch (error) {
    res.statusCode = 400;
    res.json({ message: "Error" });
  }
};

const searchForOldEstUsers = async (_, res) => {
  try {
    const data = await usersModel.findAndCountAll({
      order: [["age", "DESC"]],
      limit: 3,
    });

    if (data) {
      res.statusCode = 200;
      res.json({ message: "3 oldest users", data });
      return;
    }
    res.statusCode = 400;
    res.json({ message: "No users exists" });
  } catch (error) {
    res.statusCode = 400;
    res.json({ message: "Error" });
  }
};

export const searchUser = (req, res) => {
  const type = req.body.type;

  if (type === "user") return searchForUsers(req, res);

  if (type === "age") return searchForAge(req, res);

  if (type === "ids") return searchForUsersByIds(req, res);

  if (type === "oldest") return searchForOldEstUsers(req, res);

  res.statusCode = 400;
  res.json({ message: "Type not exists" });
};
