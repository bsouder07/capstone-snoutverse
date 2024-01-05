import { Card } from "react-bootstrap";

const GroupCard = ({ selectGroup }) => {
  return (
    <Card style={{ width: "25rem" }}>
      <Card.Img
        style={{
          height: "100px",
          width: "100px",
          margin: "auto",
        }}
        variant="top"
        src={selectGroup.groupIcon}
      />
      <Card.Body>
        <Card.Title id="group-name">{selectGroup.name}</Card.Title>
        <Card.Text>{selectGroup.description}</Card.Text>
        <Card.Text>
          Create By: {selectGroup.createdBy.username}
        </Card.Text>
        {selectGroup.members.length} members
        {/* JOIN BUTTON */}
      </Card.Body>
      <Card.Footer>
        Created on:{" "}
        {new Date(selectGroup.created).toLocaleDateString()}
      </Card.Footer>
    </Card>
  );
};

export default GroupCard;
