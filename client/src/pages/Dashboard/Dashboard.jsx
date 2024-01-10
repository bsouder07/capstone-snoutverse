import React from "react";
import { Container, Form, Button } from "react-bootstrap";
import "./Dashboard.css";
import { useState, useEffect } from "react";
import axios from "axios";

import Cards from "../../components/Cards/Cards";
import { useAuth } from "../../hooks";
import { BottomNav } from "../../components";
import UploadFile from "../../components/UploadFile";

const initialState = {
  postText: "",
  isSubmitting: false,
  errorMessage: null,
};

function Dashboard() {
  const [data, setData] = useState(initialState);
  const [postLoading, setPostLoading] = useState(true);
  const [postError, setPostError] = useState(false);
  const [posts, setPosts] = useState([]);
  const [validated, setValidated] = useState(false);
  //State for the uploaded image
  const [selectedFile, setSelectedFile] = useState(null);

  const { user } = useAuth();

  const handleInputChange = (event) => {
    setData({ ...data, postText: event.target.value });
  };
  //This will work alongside the UploadFile component
  const handleFileChange = (file) => {
    setSelectedFile(file);
  };

  const handlePostSubmit = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      setData({
        ...data,
        errorMessage: "Please make sure there is text.",
      });
      return;
    }

    setData({
      ...data,
      isSubmitting: true,
      errorMessage: null,
    });

    const formPayload = new FormData();
    formPayload.append("text", data.postText);
    if (selectedFile) {
      formPayload.append("file", selectedFile);
    }

    const headers = {
      headers: { "Content-Type": "multipart/form-data" },
    };

    try {
      const res = await api.post("/posts", formPayload, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setData(initialState);
      setPosts((prevPosts) => [
        {
          ...res.data,
          author: {
            email: user.email,
            username: user.username,
            profileImage: user.profileImage,
            _id: user._id,
          },
        },
        ...prevPosts,
        res.data?.image,
      ]);
      setData(initialState);
      setValidated(false);
      setSelectedFile(null);
    } catch (error) {
      setData({
        ...data,
        isSubmitting: false,
        errorMessage: error.message,
      });
    }
  };

  //We can use this section if this page will also display posts created.
  useEffect(() => {
    const getPosts = async () => {
      try {
        const allPosts = await api.get("/posts");
        console.log(allPosts);
        setPosts(allPosts.data);
        setPostLoading(false);
      } catch (err) {
        console.error(err.message);
        setPostLoading(false);
        setPostError(true);
      }
    };
    getPosts();
  }, []);
  console.log(data);

  return (
    <>
      <Container className="pt-3 pb-3 clearfix search__container">
        <h4 className="search__title">Create a Post</h4>
        <Form className="form_class" onSubmit={handlePostSubmit}>
          <Form.Control
            className="text_area"
            as="textarea"
            maxLength="125"
            placeholder="SnoutVerse is waiting..."
            aria-describedby="post-form"
            size="md"
            onChange={handleInputChange}
            value={data.postText}
            required
          ></Form.Control>
          <UploadFile
            className="upload"
            onFileChange={handleFileChange}
          />
          <Button
            className="float-right mt-4"
            type="submit"
            disabled={data.isSubmitting}
          >
            Submit
          </Button>
        </Form>
        {posts &&
          posts.map((post) => (
            <Cards key={post?._id} post={post} setPosts={setPosts} />
          ))}
      </Container>
      <BottomNav />
    </>
  );
}

export default Dashboard;

/*
This is if we decide to add created posts to this page:
 <Container className="pt-3 pb-3">
{posts &&
posts
    .filter((post) =>
    post.text.toLowerCase().includes(posts.toLowerCase())
    )
    .map((post) => <Card key={post._id} post={posts})
    }
</Container>


{posts &&
posts.map((post) => <Card key={post._id} post={posts})

*/
