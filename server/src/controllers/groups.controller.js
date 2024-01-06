import { Group, User, Post } from "../models";

export async function createGroup(req, res) {
  const { name, description } = req.body;
  const { _id: userId } = req.user;

  let filePath = null;

  if (req?.file) {
    filePath = req.file;
  }

  try {
    let user = await User.findById(userId);

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
      groupIcon: filePath ? filePath : "/default-grp-img.png",
    });

    user.groups.push(newGroup._id);
    await user.save();

    await newGroup.populate({
      path: "createdBy",
      select: ["username", "email", "profileImage"],
    });

    return res.status(201).json(newGroup);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Something went wrong." });
  }
}

export async function getAllGroups(req, res) {
  try {
    const groups = await Group.find({}).populate(
      "createdBy",
      "username"
    );

    if (!groups) {
      return res.status(404).json({ error: "No groups found." });
    }
    return res.status(200).json(groups);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Something went wrong." });
  }
}

export async function getGroupById(req, res) {
  const { id } = req.params;

  try {
    const group = await Group.findById(id).populate(
      "createdBy",
      "username"
    );
    if (!group) {
      return res.status(404).json({ error: "Group not found." });
    }
    return res.status(200).json(group);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Something went wrong." });
  }
}

export async function getGroupPosts(req, res) {
  const { id } = req.params;

  try {
    const group = await Group.findById(id).populate(
      "createdBy",
      "username"
    );
    if (!group) {
      return res.status(404).json({ error: "Group not found." });
    }

    const groupPosts = await Post.find({ group: id })
      .populate({ path: "author", select: "username profileImage" })
      .populate("group", "name");

    if (!groupPosts || groupPosts.length === 0) {
      return res
        .status(404)
        .json({ error: "No posts found in this group." });
    }

    return res.status(200).json(groupPosts);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Something went wrong." });
  }
}

export async function createPost(req, res) {
  const { id } = req.params;
  const { _id: userId } = req.user;
  const { text } = req.body;

  let filePath = null;

  if (req?.file) {
    filePath = req.file;
  }

  if (!text) {
    return res
      .status(400)
      .json({ error: "Please fill all the fields." });
  }

  try {
    const group = await Group.findById(id);
    if (!group) {
      return res.status(404).json({ error: "Group not found." });
    }

    const newPost = await Post.create({
      text,
      author: userId,
      group: id,
      postImage: filePath ? filePath : null,
    });

    return res.status(201).json(newPost);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Something went wrong." });
  }
}

export async function joinGroup(req, res) {
  const { id } = req.params;
  const { _id: userId } = req.user;

  try {
    const doesGroupExist = await Group.findById(id).populate({
      path: "createdBy",
      select: ["username", "profileImage", "email"],
    });

    let group = doesGroupExist;

    const isExistingMember = group.members.includes(userId);

    if (isExistingMember) {
      return res
        .status(409)
        .json({ error: "You are already a member of this group." });
    }

    group.members.push(userId);
    await group.save();

    const user = await User.findById(userId);

    user.groups.push(id);
    await user.save();
    return res.status(200).json(group);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Something went wrong." });
  }
}
