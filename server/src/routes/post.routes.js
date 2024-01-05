import { Router } from "express";
import { Post } from "../models";
import { requireAuth } from "../middleware/auth.middleware";

const router = Router();

router.get("/", async (req, res) => {
  const populateQuery = [
    { path: "author", select: ["email", "profileImage", "username"] },
    // {path: "comments",
    // populate: {path:"author", select: ["email"]},
    // },
  ];
  {
    /* The .find is a method to retrieve documents. It is retrieving an object. The .sort -1 indicates the results should be 
    sorted by descending order. The populateQuery specifies which posts should be populated with more detail.
    The .exec() is used to execute the query. */
  }
  const posts = await Post.find({})
    .sort({ created: -1 })
    .populate(populateQuery)
    .exec();
  res.json(posts.map((post) => post.toJSON()));
});

/**
 * @route GET /api/posts/:userId
 */
router.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  const populateQuery = [
    //we can use this when we do comments.
    // { path: "comments", populate: { path: "author", select: ["email"] } },
  ];

  try {
    const posts = await Post.find({ author: userId })
      .sort({ created: -1 })
      .exec();

    if (posts) {
      return res.json(posts.map((post) => post.toJSON()));
    } else {
      return res.status(404).json({ error: "No posts found for this user." });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Something went wrong." });
  }
});

//requireAuth
router.post("/", requireAuth(), async (req, res, next) => {
  const { text } = req.body;
  const { user } = req;
  const populateQuery = [
    { path: "author", select: ["email", "username", "profileImage"] },
  ];
  console.log(user);
  console.log(text);

  //Is the new Post a constructor (of an object) referring to the post model?
  //it is user._id not user.id as Mongoose and MongoDB create a unique 12-byte identifier
  const post = new Post({
    text: text,
    author: user._id,
  });

  try {
    const savedPost = await post.save();
    // user.posts = user.posts.concat(savedPost._id);
    // await user.save();
    return res.json(savedPost.toJSON());
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.put("/:postId", requireAuth(), async (req,res) => {
  const {postId} =req.params

  try {
    const updatedPost = await Post.findByIdAndUpdate(postId)
    if (updatedPost === null){
      return res.sendStatus(404).json({error: "Post not found"});
    }
    res.sendStatus(200)

  } catch (error) {
  res.sendStatus(500).json({error: "Internal server error"})   
  }
})

router.delete("/:postId", requireAuth(), async (req, res) => {
  const { postId } = req.params;
  try {
    const deletePost = await Post.findByIdAndDelete(postId);

    if (deletePost === null) {
      return res.sendStatus(404).json({error: "Post not found"});
    }
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500).json({error: "Internal server error"});
  }
});

export default router;
