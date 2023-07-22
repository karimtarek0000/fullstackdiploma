import tasksModel from "../../../DB/models/tasks.model.js";
import userModel from "../../../DB/models/users.model.js";
import mongoose from "mongoose";

// 1 - Add task
export const addTask = async (req, res) => {
  const { title, description, status, deadLine } = req.body;
  const { id } = req.userData;

  await tasksModel.create({ title, description, status, deadLine, userId: id });

  return res.status(201).json({ status: "Success", message: "Task created successfully" });
};

// 2 - Update task
export const updateTask = async (req, res) => {
  const { assignTo, ...otherData } = req.body;
  const userId = req.userData.id;

  const id = req.params.id;

  const assignToData = await userModel.findById(assignTo);

  if (assignToData) {
    const taskData = await tasksModel.findOneAndUpdate(
      { $and: [{ _id: id, userId }] },
      { ...otherData, assignTo: assignToData?._id }
    );

    if (taskData)
      return res.status(201).json({ status: "Success", message: "Task updated successfully" });

    res.status(400).json({ status: "Success", message: "Task id or user id not correct!" });
  } else {
    res.status(400).json({ status: "Success", message: "Assign to id not correct!" });
  }
};

// 3 - Delete task
export const deleteTask = async (req, res) => {
  const userId = req.userData.id;
  const id = req.params.id;

  const taskData = await tasksModel.findOneAndDelete({ $and: [{ _id: id, userId }] });

  if (taskData)
    return res.status(200).json({ status: "Success", message: "Task deleted successfully" });

  res.status(400).json({ status: "Error", message: "Task id or user id not correct!" });
};

// 4 - Get all tasks with user data
export const getAllTasksWithUserData = async (req, res) => {
  const tasks = await tasksModel.find().populate({ path: "userId", select: "userName email" });

  res.status(200).json({ status: "Success", message: "All tasks with users", tasks });
};

// 5 - Get tasks of oneUser with user data
export const getAllTasksWithLogin = async (req, res) => {
  const id = req.userData.id;

  const tasks = await tasksModel.find({ userId: id });

  res.status(200).json({ status: "Success", message: "All tasks", tasks });
};

// 6 - Get all tasks that not done after deadline
export const getAllTaskAfterDeadline = async (req, res) => {
  const tasks = await tasksModel.find({
    $and: [{ status: { $ne: "Done" } }, { deadLine: { $lt: new Date() } }],
  });

  res.status(200).json({ status: "Success", message: "All tasks exceeded the deadline", tasks });
};
