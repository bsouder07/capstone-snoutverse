import { Group, User } from "../models";

export async function createGroup(req, res) {
  const { name, description } = req.body;
  const { _id: userId } = req.user;

  let filePath;
  if (req?.file) {
    filePath = req.file;
  }

  try {
    const doesGroupExist = await Group.findOne({ name });
    if (doesGroupExist) {
      return res
        .status(409)
        .json({ error: "Group with that name already exists." });
    }

    const newGroup = await Group.create({
      name,
      description,
      createdBy: userId,
      members: [userId],
    });

    return res.status(201).json(newGroup);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Something went wrong." });
  }
}
