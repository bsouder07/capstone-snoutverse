import React, { useEffect } from "react";

import { Container, Form, Button } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import "./Search.css";
import { User } from "../../../../server/src/models";

function Search() {
  const [data, setData] = useState("");

  const [searchPosts, setSearchPosts] = useState("");
  const [postResults, setPostResults] = useState([]);
  const [postLoading, setPostLoading] = useState(true);
  const [postError, setPostError] = useState(false);

  const handleInputChange = (event) => {
    setData(event.target.value);
  };

  const handlePostSearchSubmit = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      setValidated(true);
      return;
    }

    setPostResults({
      ...postResults,
    });
  };

  useEffect(() => {
    const getPosts = async () => {
      try {
        const allPosts = await axios.get("http://localhost:3001/api/posts");
        console.log(allPosts);
        setPostResults(allPosts.data);
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
        <h4 className="search__title">Search for a Group or a Post</h4>
        <Form>
          <Form.Control
            className="search__input"
            maxLength="45"
            placeholder="Search"
            aria-describedby="post-form"
            size="lg"
            onChange={handleInputChange}
          ></Form.Control>
          <Button>Search</Button>
        </Form>

        <div className="search-results">
          <div className="middle-line">
            <h3 className="posts-results"> Posts</h3>
            <div className="posts-results">
              {postResults &&
                postResults
                  .filter((post) =>
                    post.text.toLowerCase().includes(data.toLowerCase())
                  )
                  .map((post) => {
                    return (
                      <div key={post._id}>
                        <div>{post.text}</div>
                        <div>{post.author.email}</div>
                        <div>{post.created}</div>
                      </div>
                    );
                  })}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

export default Search;

/*I need to add this:
   <Container className="pt-3 pb-3 clearfix">
        <SearchBar searchPosts={searchPosts} setSearchPosts={setSearchPosts} />
      </Container>  


      For Groups if need be

 <h3 className="groups-results">
              {" "}
              Groups
              <div className="groups-results">
                 Just like snippets, use .filter to render the groups 
                </div>
                </h3>


*/
