import mongoose, { Schema } from "mongoose";

const task = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: {
        values: ["toDo", "Doing", "Done"],
        message: "`{VALUE}` is not a valid status",
      },
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    assignTo: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    deadLine: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const taskModel = mongoose.model("task", task);

export default taskModel;
