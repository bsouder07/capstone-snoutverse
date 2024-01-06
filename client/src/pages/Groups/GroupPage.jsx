import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card, Badge, Image } from "react-bootstrap";
import api from "../../utils/api.utils";

const GroupPage = () => {
  const [groupPosts, setGroupPosts] = useState([]);
  const [error, setError] = useState(null);
  const { groupId } = useParams();

  const filterPostsByGrpId = groupPosts.filter(
    (post) => post.group._id === groupId
  );

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get(`/groups/posts/${groupId}`);
        setGroupPosts(data);
      } catch (error) {
        console.log(error);
        setError(
          error?.response?.data?.error ||
            "Something went wrong, please try again."
        );
      }
    })();
  }, [groupId]);

  return (
    <div>
      <h1>Group Posts</h1>
      <div>
        {filterPostsByGrpId.length === 0 && (
          <p>It's quiet in here. No Group posts yet.</p>
        )}

        {filterPostsByGrpId &&
          filterPostsByGrpId.map((post) => (
            <Card className="mb-3" key={post._id}>
              <Card.Body>
                <Card.Text>{post.text}</Card.Text>
                <Card.Footer className="text-muted">
                  <span className="mr-2">
                    {post.author.username}
                    <Image
                      roundedCircle
                      className="ml-2"
                      style={{ height: "25px", width: "25px" }}
                      src={post.author.profileImage}
                    />
                  </span>
                  <Badge variant="info">
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
