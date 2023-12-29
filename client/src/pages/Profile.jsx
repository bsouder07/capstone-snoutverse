import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/api.utils";

const Profile = () => {
  const [profileUser, setProfileUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { userId } = useParams();

  useEffect(() => {
    //This is called an IIFE (Immediately Invoked Function Expression). It is cleaner looking then having to declare the function elsewhere and then call it. - Tim Q.
    (async () => {
      setLoading(true);
      try {
        const response = await api.get(`/user/${userId}`);

        //If there is a user, then let's make a call to get their posts.
        if (response.data) {
          // destructuring assignment to name the posts from the response data.
          const { data: posts } = await api.get(`/posts/${userId}`);
          // destructuring assignment to name the user from the response data.
          const { data: user } = response;
          //combine the user with their posts in the profileUser state.
          setProfileUser({ ...user, posts });
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        //The ? is called optional chaining. It is a way to check if a property exists on an object before trying to access it so we don't get an error. - Tim Q.
        if (
          error?.response?.status === 500 ||
          error?.message === "Network Error"
        ) {
          setError("Something went wrong.");
        } else if (
          error.response?.data?.error ||
          error.response?.data
        ) {
          setError(error.response.data.error || error.response.data);
        } else {
          setError("An unexpected error occurred. Please try again.");
        }
        setLoading(false);
      }
    })();
  }, [userId]);

  return (
    <div>
      <h1>Profile Page</h1>

      {/* loading and errors. We Can probably make a Loading spinner component */}
      {error && <p>{error}</p>}
      {loading && <p>loading profile information...</p>}

      <p>{profileUser?.email}</p>
      {/* Feel free to style this component however you want. Brian is working on a Post component, so we can probably reuse that, if needed. - Tim Q. */}

      <h2>Posts</h2>

      {profileUser?.posts.map((post) => (
        <div key={post._id}>
          <p>{post.text}</p>
          <span>{post.created}</span>{" "}
          {/* use helper function to turn this date into a human readable format */}
        </div>
      ))}
    </div>
  );
};

export default Profile;
