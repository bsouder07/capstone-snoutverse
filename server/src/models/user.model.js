import { Schema, model } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 4,
    maxlength: 24,
  },
  passwordHash: {
    type: String,
    required: true,
  },
});

const User = model("User", userSchema);

export default User;
