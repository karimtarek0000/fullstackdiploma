import JOI from "joi";

export const signUpSchema = {
  body: JOI.object({
    userName: JOI.string().trim().required(),
    email: JOI.string()
      .email({ tlds: { allow: true } })
      .required()
      .messages({
        "string.email": "Please enter a valid email address",
        "any.required": "Email is required",
      }),
    password: JOI.string()
      .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
      .required(),
    age: JOI.number().required(),
    gender: JOI.string().valid("male", "female").required(),
  }).required(),
};

export const signInSchema = {
  body: JOI.object({
    email: JOI.string()
      .email({ tlds: { allow: true } })
      .required()
      .messages({
        "string.email": "Please enter a valid email address",
        "any.required": "Email is required",
      }),
    password: JOI.string()
      .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
      .required(),
  }).required(),
};

export const changePasswordSchema = {
  body: JOI.object({
    oldPassword: JOI.string()
      .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
      .required(),
    newPassword: JOI.string()
      .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
      .required(),
  }).required(),
};

export const updateUserSchema = {
  body: JOI.object({
    userName: JOI.string().trim().required(),
    age: JOI.number().optional(),
  }).required(),
};
