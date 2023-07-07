import { userModel } from "../../DB/models/user.model.js";

export const allUsers = async (req, res) => {
  try {
    const users = await userModel.find();

    res.status(200).json({
      message: "All users found",
      data: users,
    });
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
};

export const allUsersWithPosts = async (req, res) => {
  const id = req.params.userId;

  try {
    const user = await userModel
      .findOne({ _id: id })
      .populate([{ path: "postsID", select: "title content" }])
      .select("userName email age");

    res.status(200).json({
      message: "All users with posts",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
};

export const signUp = async (req, res) => {
  const userData = req.body;
  try {
    await userModel.create(userData);

    res.status(201).json({
      message: "User created successfully",
    });
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
};

export const signIn = async (req, res) => {
  const email = req.body.email;
  try {
    const user = await userModel.findOne({ email });

    if (user) {
      return res.status(200).json({
        message: "Signed in successfully",
      });
    }
    res.status(401).json({
      message: "unAuthorized",
    });
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
};

export const updateUser = async (req, res) => {
  const id = req.params.userId;
  const data = req.body;

  try {
    const user = await userModel
      .findByIdAndUpdate({ _id: id }, data, {
        new: true,
      })
      .select("userName email");

    res.status(201).json({
      message: "Update user successfully",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
};

export const deleteUser = async (req, res) => {
  const id = req.params.userId;

  try {
    const user = await userModel.findByIdAndDelete({ _id: id });

    if (!user) {
      return res.status(401).json({
        message: "No user exists",
      });
    }

    res.status(200).json({
      message: "Delete user successfully",
    });
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
};

export const searchUserNameAndAge = async (req, res) => {
  const { name, age } = req.body;
  const letter = new RegExp("^" + name, "i");

  try {
    const users = await userModel.find({
      $and: [{ userName: letter }, { age: { $lt: age } }],
    });

    res.status(200).json({
      message: "All users",
      data: users,
    });
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
};

export const searchUserBetweenAges = async (req, res) => {
  const { age } = req.body;

  if (age.length === 2) {
    try {
      const users = await userModel.find({
        age: { $gte: age[0], $lte: age[1] },
      });

      res.status(200).json({
        message: "All users",
        data: users,
      });
    } catch (error) {
      res.status(400).json({
        message: error,
      });
    }
  }
};
