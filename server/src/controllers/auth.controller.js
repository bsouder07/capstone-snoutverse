//This will be responsible for taking informatoin from the request and completing a task
//npm install -w server celebrate (validation process)

import {
  getUserByEmail,
  sanitizeUser,
  createUser,
} from "../services/auth.services";

import { User } from "../models";

import { hashPassword, comparePassword, signJwt } from "../utils/auth.utils";

export async function handleSignUp(req, res) {
  const { email, password, confirmPassword } = req.body;
  console.log("Received request body:", req.body);
  let user = await getUserByEmail(email);
  if (user) {
    return res.status(422).json({ email: "Email taken." });
  }
  console.log("Password type:", typeof password);
  console.log("Password value:", password);
  const passwordHash = hashPassword(password);
  console.log("hashPassword function:", hashPassword);
  console.log(email)
  user = await createUser(email, passwordHash );
  console.log(user);
  user = sanitizeUser(user);

  res.status(201).json(user); // 201 means created
}

export async function handleSignIn(req, res) {
  const { email, password } = req.body;

  let user = await getUserByEmail(email);
  if (!user || !comparePassword(password, user.passwordHash)) {
    return res.status(422).json({ error: "Invalid username/password" });
  }

  const accessToken = signJwt(user);

  //If we get here the user exists and they have provided us the right password.

  user = sanitizeUser(user);
  res.status(200).json({ user, accessToken });
}
