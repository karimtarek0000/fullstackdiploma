import { mongoose, Schema } from "mongoose";

const userSchema = new Schema(
  {
    userName: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      min: 8,
      required: true,
    },
    age: {
      type: Number,
    },
    gender: {
      type: String,
      enum: {
        values: ["male", "female"],
        message: "{VALUE} is not a valid gender",
      },
    },
    phone: {
      type: String,
      required: true,
    },
    postsID: [{ type: Schema.Types.ObjectId, ref: "post", required: true }],
  },
  { timestap: true }
);

export const userModel = mongoose.model("user", userSchema);
