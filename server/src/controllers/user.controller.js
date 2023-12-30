import { getUserById, sanitizeUser } from "../services/auth.services";
import { isValidObjectId } from "../utils/auth.utils";

export async function getUserForProfile(req, res) {
  const { userId } = req.params;

  //I want to prevent our server from accepting and possibly crashing the server
  //if an invalid user id aka ObjectId is passed in. Every collection contains an _id aka ObjectId. - Tim Q.
  if (!isValidObjectId(userId)) {
    return res.status(422).json({ error: "Invalid user ID." });
  }

  try {
    let requestedUser = await getUserById(userId);

    if (requestedUser) {
      requestedUser = sanitizeUser(requestedUser);
      return res.status(200).json(requestedUser);
    } else {
      return res.sendStatus(404);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Something went wrong." });
  }
}
