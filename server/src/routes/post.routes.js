import { Router } from "express";
import { Post } from "../models";
import { requireAuth } from "../middleware/auth.middleware";

const router = Router();


router.get("/", async (req,res) => {
    const populateQuery = [
        {path: "author", select: ["email"] },
        // {path: "comments", 
        // populate: {path:"author", select: ["email"]},
        // },

    ]
    {/* The .find is a method to retrieve documents. It is retrieving an object. The .sort -1 indicates the results should be 
    sorted by descending order. The populateQuery specifies which posts should be populated with more detail.
    The .exec() is used to execute the query. */ }
    const posts = await Post.find({})
    .sort({created: -1})
    .populate(populateQuery)
    .exec()
    res.json(posts.map((post) => post.toJSON()))
    
})



//requireAuth
router.post("/", requireAuth(), async (req, res, next) => {
  const { text } = req.body;
  const { user } = req;
  console.log(user)
  console.log(text)

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
    console.log(error)
    next(error);
    
  }
});

export default router;