import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/api.utils";

const Profile = () => {
  const [profileUser, setProfileUser] = useState(null);
  const [error, setError] = useState(null);

  const { userId } = useParams();

  useEffect(() => {
    //This is called an IIFE (Immediately Invoked Function Expression). It is cleaner looking then having to declare the function elsewhere and then call it. - Tim Q.
    (async () => {
      try {
        const response = await api.get(`/user/${userId}`);

        setProfileUser(response.data);
      } catch (error) {
        console.log(error);
        if (error) {
          setError(
            //The ? is called optional chaining. It is a way to check if a property exists on an object before trying to access it so we don't get an error. - Tim Q.
            error.response?.data?.error ||
              "No user found with that information."
          );
        }
      }
    })();
  }, [userId]);

  if (error) {
    return <p>{error}</p>; // todo: We can probably style this error message.
  }

  return (
    <div>
      <h1>Profile Page</h1>
      <p>{profileUser?.email}</p>
      {/* Feel free to style this component however you want. - Tim Q. */}
    </div>
  );
};

export default Profile;
