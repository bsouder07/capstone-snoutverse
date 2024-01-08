import { useParams, useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card, Badge, Image, Spinner, Button } from "react-bootstrap";
import { useAuth } from "../../hooks";
import api from "../../utils/api.utils";

const GroupPage = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const { groupId } = useParams();

  const { user } = useAuth();

  const [groupPosts, setGroupPosts] = useOutletContext();
  // https://reactrouter.com/en/6.21.1/hooks/use-outlet-context

  const filterPostsByGrpId = groupPosts.filter(
    (post) => post.group._id === groupId
  );

  const noPosts = filterPostsByGrpId.length === 0;

  const handleDeletePost = async (postId) => {
    try {
      const { data } = await api.delete(
        `/groups/posts/delete/${postId}`
      );
      if (data) {
        setGroupPosts((prevState) =>
          prevState.filter((post) => post._id !== postId)
        );
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      setError(
        error?.response?.data?.error ||
          "Something went wrong, please try again."
      );
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get(`/groups/posts/${groupId}`);
        setGroupPosts(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError(
          error?.response?.data?.error ||
            "Something went wrong, please try again."
        );
      }
    })();
  }, [groupId]);

  if (loading) {
    return (
      <div className="grp-spinner-container">
        <Spinner
          id="grp-spinner"
          variant="secondary"
          animation="grow"
        />
        <Spinner
          id="grp-spinner"
          variant="primary"
          animation="grow"
        />
        <Spinner id="grp-spinner" animation="grow" />
      </div>
    );
  }

  return (
    <div>
      <h1 className="grp-post-heading">Group Posts</h1>
      <div>
        {noPosts && (
          <div className="empty-post-container">
            <p>It's quiet in here. No Group posts yet.</p>
          </div>
        )}

        {filterPostsByGrpId.map((post) => (
          <Card id="group-post-card" className="mb-3" key={post._id}>
            <Card.Body>
              <Card.Text>{post.text}</Card.Text>
              {post.image && (
                <Card.Img variant="top" src={post.image} />
              )}

              <Card.Footer
                className="text-muted"
                id="grp-post-card-container"
              >
                <span className="grp-authorImg-created">
                  {post.author.username}
                  <Image
                    roundedCircle
                    className="ml-2"
                    style={{ height: "25px", width: "25px" }}
                    src={post.author.profileImage}
                  />
                </span>
                <Button
                  variant="danger"
                  size="sm"
                  hidden={user?._id !== post?.author?._id}
                  onClick={() => handleDeletePost(post._id)}
                >
                  Delete
                </Button>
                <Badge bg="secondary" id="grp-created-badge">
                  {new Date(post.created).toLocaleDateString()}
                </Badge>
              </Card.Footer>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default GroupPage;
