// //This will be responsible for taking informatoin from the request and completing a task
// //npm install -w server celebrate (validation process)




import {
  createUser,
  getUserByEmail,
  sanitizeUser,
} from "../services/auth.services";
import { comparePassword, hashPassword, signJwt } from "../utils/auth.utils";


export async function handleSignUp(req, res) {
  const { email, password } = req.body;

  let user = await getUserByEmail(email);
  if (user) {
    return res.status(422).json({ email: "Email taken." });
  }

  const passwordHash = hashPassword(password);

  user = await createUser(email, passwordHash);
  user = sanitizeUser(user);

  res.status(201).json(user);
}

export async function handleSignIn(req, res) {
  const { email, password } = req.body;

  let user = await getUserByEmail(email);
  if (!user || !comparePassword(password, user.passwordHash)) {
    return res.status(422).json({ error: "Invalid email/password" });
  }

  const accessToken = signJwt(user);
  user = sanitizeUser(user);

  res.status(200).json({ user, accessToken });
}



// //This will be responsible for taking informatoin from the request and completing a task
// //npm install -w server celebrate (validation process)
