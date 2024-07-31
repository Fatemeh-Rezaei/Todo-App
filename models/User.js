import { Schema, models, model } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  lastName: {
    type: String,
  },
  todos: [{ title: String, status: String }],
  createdAt: {
    type: Date,
    default: () => Date.now,
    immutable: true,
  },
});

const User = models.User || model("User", userSchema);

export default User;
