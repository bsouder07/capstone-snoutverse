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




function Cards({ post,setPosts }) {
  console.log(post);

  const [isDeleted, toggleIsDeleted] = useToggle();
  const [isEdit, setisEditing] = useState(false);

  const { user, isAuthenticated } = useAuth();

  


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

      setPosts(previousPosts => previousPosts.map(posts => posts._id === post._id ? {...posts, text: postText} : posts))

      setisEditing(false)

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

      setPosts(previousPosts=> previousPosts.filter(p => p._id !== post._id))

      toggleIsDeleted();
    } catch (error) {
      console.error(error.message);
    }
  };
  if (isDeleted) return <></>;

  return (
    <Card className="card_class" key={post._id}>
      <Card.Body>
        <Figure className="d-flex align-items-center">
          <Figure.Image
            width={70}
            height={70}
            className="rounded-circle"
            src={post.author?.profileImage}
          />
          <figcaption>{post.author.email}</figcaption>
        </Figure>

        <Card.Text className="mt-3">{post.text}</Card.Text>

        <Card.Text>
          {new Date(post.created).toLocaleDateString()} -{" "}
          {timeSince(post.created)} ago{" "}
          {post.author._id === user._id &&(
          <Button id="editBtn" type="button" className="btn btn-outline-success" onClick={editFunction}>
            Edit
          </Button>
          )}
          {post.author._id === user._id &&(
          <Button id="deleteBtn"
            type="button"
            className="btn btn-outline-danger"
            onClick={deletePost}
          >
            Delete
          </Button>
          )}
          
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Cards;


//To ensure users cannot delete posts made by other users?

// {post.author._id === post.id(I am not sure what this should be) &&(
//   <Button
//     type="button"
//     className="btn btn-outline-danger"
//     onClick={deletePost}
//   >
//     Delete
//   </Button>
//   )}