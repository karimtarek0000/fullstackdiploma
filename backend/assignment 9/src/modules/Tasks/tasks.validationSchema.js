import JOI from "joi";

export const addTaskSchema = {
  body: JOI.object({
    title: JOI.string().trim().required(),
    description: JOI.string().trim().required(),
    status: JOI.string().valid("toDo", "Doing", "Done").optional(),
    deadLine: JOI.date().optional(),
  }).required(),
};

export const updateTaskSchema = {
  body: JOI.object({
    title: JOI.string().trim(),
    description: JOI.string().trim(),
    status: JOI.string().valid("toDo", "Doing", "Done").optional(),
    deadLine: JOI.date().optional(),
    assignTo: JOI.string().trim().required(),
  }).required(),

  params: JOI.object({
    id: JOI.string().trim(),
  }).required(),
};

export const deleteTaskSchema = {
  params: JOI.object({
    id: JOI.string().trim(),
  }).required(),
};
