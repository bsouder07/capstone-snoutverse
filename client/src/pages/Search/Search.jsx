import React, { useEffect } from "react";

import {
  Container,
  Form,
  Button,
  Card,
  Figure,
  ListGroup,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import "./Search.css";
import { User } from "../../../../server/src/models";
import { Link } from "react-router-dom";
import { timeSince } from "../../utils/timeSince";

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
        <h4 className="search__title">Search for a Post</h4>
        <Form className="form_class">
          <Form.Control
            className="search__input"
            maxLength="45"
            placeholder="Search"
            aria-describedby="post-form"
            size="lg"
            onChange={handleInputChange}
          ></Form.Control>
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
                      <Card className="card_class" key={post._id}>
                        <Card.Body>
                          <Figure className="d-flex align-items-center">
                            <Figure.Image
                              width={70}
                              height={70}
                              className="rounded-circle"
                              src={post.author.profile_image}
                            />
                            <figcaption>{post.author.email}</figcaption>
                          </Figure>

                          <Card.Text className="mt-3">{post.text}</Card.Text>
                          <Card.Text>
                            {new Date(post.created).toLocaleDateString()} -{" "}
                            {timeSince(post.created)} ago{" "}
                          </Card.Text>
                        </Card.Body>
                      </Card>
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
