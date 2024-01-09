import React, { useState } from "react";
import {
  Container,
  Form,
  Button,
  Card,
  Figure,
  Row,
  Col,
} from "react-bootstrap";
import { timeSince } from "../../utils/timeSince";
import "./Cards.css";
import useToggle from "../../hooks/useToggle";
import api from "../../utils/api.utils";
import EditPost from "../EditPost/EditPost";
import { useAuth } from "../../hooks";

function Cards({ post, setPosts }) {
  console.log(post);

  const [isDeleted, toggleIsDeleted] = useToggle();
  const [isEdit, setisEditing] = useState(false);
  const likes = post?.likes || [];
  const { user, isAuthenticated } = useAuth();
  const isLikedByCurrentUser = likes.includes(user._id);
  const [likedState, setLiked] = useState(isLikedByCurrentUser);
  const [likesState, setLikes] = useState(likes.length);

  //Edit Posts section
  const editFunction = () => {
    setisEditing(true);
  };
  const cancelEditFunction = () => {
    setisEditing(false);
  };

  /*
  This save function is asynchronous, which allows you to work with promises.
  The await line sends a PUT(update) request to the server for the posts with a specific Id. 
  The "await" phrase waits for the promise to return. Regarding the state line, if the post id matches 
  the post you just updated a new object via the spread operator will be created using the new post text.
  The "setisEditing(false)" signifies the edit process is complete.
  */

  const saveFunction = async (postText) => {
    try {
      await api.put(`/posts/${post._id}`, { text: postText });

      setPosts((previousPosts) =>
        previousPosts.map((posts) =>
          posts._id === post._id
            ? { ...posts, text: postText }
            : posts
        )
      );

      setisEditing(false);
    } catch (error) {
      console.error(error.message);
    }
  };

  //This is related to the EditPost.jsx component.
  if (isEdit) {
    return (
      <EditPost
        post={post}
        onSave={saveFunction}
        onCancel={cancelEditFunction}
      />
    );
  }

  /*
  Much like the save function, the deletePost function works as asynchronous to first send a request to the server,
  then update the setPosts within the Dashboard page, and filter out the post that has been deleted. 
  The "toggleIsDeleted()" should signify the end of the deletion process.
  */

  //Delete Posts section
  const deletePost = async () => {
    try {
      await api.delete(`/posts/${post._id}`);

      setPosts((previousPosts) =>
        previousPosts.filter((p) => p?._id !== post?._id)
      );

      toggleIsDeleted();
    } catch (error) {
      console.error(error.message);
    }
  };
  if (isDeleted) return <></>;

  // Liked post section

  const handleToggleLike = async () => {
    try {
      const response = await api.post(`/posts/like/${post._id}`);
      if (response.status === 200) {
        let doesUserLikePost = response.data.likes.includes(user._id);
        console.log(doesUserLikePost);
        if (doesUserLikePost) {
          setLiked(true);
          setLikes(likesState + 1);
        } else {
          setLiked(false);
          setLikes(likesState - 1);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
  console.log(isLikedByCurrentUser);

  return (
    <Card className="card_class" key={post?._id}>
      <Card.Body>
        <Figure className="d-flex align-items-center">
          <Figure.Image
            width={70}
            height={70}
            className="rounded-circle"
            src={post?.author?.profileImage}
          />
          <figcaption>{post?.author?.username}</figcaption>
        </Figure>

        <Card.Text className="mt-3">{post?.text}</Card.Text>
        {post?.image && (
          <Card.Img
            id="Post_image"
            src={post.image}
            alt="Post Image"
          />
        )}

        <Card.Text>
          {new Date(post?.created).toLocaleDateString()} -{" "}
          {timeSince(post?.created)} ago{" "}
          {post?.author?._id === user?._id && (
            <Button
              id="editBtn"
              type="button"
              className="btn btn-outline-success"
              onClick={editFunction}
            >
              Edit
            </Button>
          )}
          {post?.author?._id === user?._id && (
            <Button
              id="deleteBtn"
              type="button"
              className="btn btn-outline-danger"
              onClick={deletePost}
            >
              Delete
            </Button>
          )}
          <Button
            id="likedBtn"
            type="button"
            variant={likedState ? "info" : "outline-info"}
            onClick={handleToggleLike}
          >
            {likedState ? "Liked" : "Like"}
          </Button>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Cards;
