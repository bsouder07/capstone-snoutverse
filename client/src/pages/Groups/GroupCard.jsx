import { Button, Card, Badge } from "react-bootstrap";

const GroupCard = ({
  selectGroup,
  handleJoinGroup,
  isUserInGroup,
}) => {
  const isAlreadyJoined = isUserInGroup();

  return (
    <Card id="main-group-card" style={{ width: "25rem" }}>
      <Card.Body>
        <Card.Img
          id="group-icon"
          variant="top"
          src={selectGroup.groupIcon}
        />
        <Card.Title id="group-name">{selectGroup.name}</Card.Title>
        <Card.Text className="grp-description">
          {selectGroup.description}
        </Card.Text>
        <Card.Text>
          <span className="grp-createdBy">Created By:</span>{" "}
          {selectGroup.createdBy.username}
        </Card.Text>
        <Card.Text>
          <Button variant="light">
            Members{" "}
            <Badge bg="info">{selectGroup.members.length}</Badge>
          </Button>
          {isAlreadyJoined && (
            <Badge id="isJoined" bg="success">
              Member
            </Badge>
          )}
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <span className="date-grp-created">
          Created on:{" "}
          {new Date(selectGroup.created).toLocaleDateString()}
        </span>
        {!isAlreadyJoined && (
          <Button variant="outline-success" onClick={handleJoinGroup}>
            Join
          </Button>
        )}
      </Card.Footer>
    </Card>
  );
};

export default GroupCard;
