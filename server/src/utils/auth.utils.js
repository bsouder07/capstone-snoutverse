import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { getUserById } from "../services/auth.services";
import keys from "../config/keys";
import { User } from "../models";
import { ObjectId } from "mongodb";

export function hashPassword(password) {
  return bcrypt.hashSync(password, 12);
}

export function comparePassword(raw, hashed) {
  return bcrypt.compareSync(raw, hashed);
}

export function signJwt(user) {
  const tokenUser = {
    sub: user._id,
    email: user.email,
    role: user.role,
  };

  return jwt.sign(tokenUser, keys.jwt_secret, {
    expiresIn: keys.jwt_ttl,
  });
}

export function verifyJwt(token) {
  return new Promise((resolve, reject) => {

    jwt.verify(token, keys.jwt_secret, (err, payload) => {

      if (err) {
        return reject(err);
      }

      const { sub } = payload;

      getUserById(sub)
        .then((user) => resolve(user))
        .catch((err) => reject(err));
    });
  });
}

export function isValidObjectId(id) {
  if (ObjectId.isValid(id)) {
    if (String(new ObjectId(id)) === id) return true;
    return false;
  }
  return false;
}
