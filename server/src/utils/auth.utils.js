import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import jwt_stuff from "../config/app.config";

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
  //This should sign and encrypt a token
  console.log(jwt_stuff.jwt_secret)
  return jwt.sign(tokenUser, jwt_stuff.jwt_secret, {
    expiresIn: jwt_stuff.jwt_ttl,
  });
}

export function verifyJwt(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, jwt_secret, (err, payload) => {
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
