import userModel from "../../../DB/models/users.model.js";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
import { sendEmailService } from "../../services/sendEmail.js";

// 1 - Sign up
export const signUp = async (req, res) => {
  const { userName, email, password, age, gender } = req.body;

  const isEmailExist = await userModel.findOne({ email });

  if (isEmailExist)
    return res.status(400).json({ status: "Error", message: "Email already exist!" });

  const passwordHash = bcrypt.hashSync(password, +process.env.HASH_LEVEL);

  const userData = await userModel.create({
    userName,
    email,
    age,
    gender,
    password: passwordHash,
  });

  // Confirm for email
  const tokenForConfirm = JWT.sign({ id: userData._id }, process.env.TOKEN_KEY);

  const linkConfirm = `http://localhost:3000/users/confirm-email/${tokenForConfirm}`;
  await sendEmailService({
    to: email,
    subject: "Confirm Email",
    message: `<a href="${linkConfirm}">Confirm email 👋</a>`,
  });

  return res.status(201).json({
    status: "Success",
    message: "User created successfully, has been sended email to you for confirm 🚀",
  });
};

// Confirm email
export const confirmEmail = async (req, res) => {
  const token = req.params.token;

  const tokenConfirmEmail = JWT.verify(token, process.env.TOKEN_KEY);

  const userData = await userModel.findById(tokenConfirmEmail.id);

  if (!userData.isConfirmed) {
    await userModel.findByIdAndUpdate({ _id: tokenConfirmEmail.id }, { isConfirmed: true });

    return res.status(200).json("Has been confirmed this email 👋");
  }

  res.status(400).json("Has been confirmed this email from long time ago!");
};

// 2 - Sign in
export const signIn = async (req, res) => {
  const { email, password } = req.body;

  const userData = await userModel.findOne({ email });

  if (userData) {
    const isPasswordCorrect = bcrypt.compareSync(password, userData.password);

    if (isPasswordCorrect) {
      const accessToken = JWT.sign({ email, id: userData._id }, process.env.TOKEN_KEY, {
        expiresIn: "1h",
      });
      const refreshToken = JWT.sign({ email, id: userData._id }, process.env.TOKEN_KEY);

      await userModel.findByIdAndUpdate(userData._id, { logIn: true });

      return res.status(200).json({
        status: "Success",
        message: "Login successfully 👋",
        data: {
          id: userData._id,
          userName: userData.userName,
          email,
        },
        accessToken,
        refreshToken,
      });
    }

    return res.status(400).json({ status: "Error", message: "Password not correct!" });
  }

  return res.status(400).json({ status: "Error", message: "Email not correct!" });
};

// 3 - Change Password
export const changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const { id } = req.userData;

  const userData = await userModel.findById(id);

  if (userData) {
    const isOldPasswordCorrect = bcrypt.compareSync(oldPassword, userData.password);

    if (isOldPasswordCorrect) {
      const newPasswordHashed = bcrypt.hashSync(newPassword, +process.env.HASH_LEVEL);

      await userModel.updateOne({ _id: id }, { password: newPasswordHashed });

      return res
        .status(201)
        .json({ status: "Success", message: "Password changed successfully 👋" });
    }

    return res.status(400).json({ status: "Error", message: "Old password not correct!" });
  }
};

// 4 - Update user
export const updateUser = async (req, res) => {
  const { userName, age } = req.body;
  const { id } = req.userData;

  await userModel.updateOne({ _id: id }, { userName, age });

  return res.status(200).json({ status: "Success", message: "Update profile successfully 👋" });
};

// 5 - Delete user
export const deleteUser = async (req, res) => {
  const { id } = req.userData;

  await userModel.deleteOne({ _id: id });

  res.status(200).json({ status: "Success", message: "User deleted successfully" });
};

// 6 - Soft delete
export const softDelete = async (req, res) => {
  const { id } = req.userData;

  await userModel.findByIdAndUpdate(id, { deleted: true });

  res.status(200).json({ status: "Success", message: "Soft delete profile successfully" });
};

// 7 - Logout
export const logOut = async (req, res) => {
  const { id } = req.userData;

  await userModel.findByIdAndUpdate(id, { logIn: false });

  res.status(200).json({ status: "Success", message: "Logout successfully" });
};
