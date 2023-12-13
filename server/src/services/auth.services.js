// need to install bcryt (responsible for taking a value and encrypting it, and taking a value and comparing it
// to another value that has been encrypted) npm install -w bcrytjs

import { User } from "../models";


export async function getUserById(id) {
  return await User.findById(id);
}

export async function getUserByEmail(email) {
  return await User.findOne({ email });
}


export async function createUser(email, passwordHash) {
  return await User.create({ email, passwordHash });
}

export function sanitizeUser(user) {
  user = user.toJSON();
  delete user.passwordHash;
  return user;
}
