import {
  Button,
  Card,
  Badge,
  Form,
  Image,
  OverlayTrigger,
} from "react-bootstrap";
import Popover from "react-bootstrap/Popover";
import { useState } from "react";
import api from "../../utils/api.utils";
import { useAuth } from "../../hooks";
import UploadFile from "../../components/UploadFile";

const GroupCard = ({
  selectGroup,
  handleJoinGroup,
  isUserInGroup,
  handleChangeIcon,
  setSelectedGroupIcon,
}) => {
  const [showPopover, setShowPopover] = useState(false);

  const { user } = useAuth();

  const isAlreadyJoined = isUserInGroup();
  const isUserGroupOwner = user?._id === selectGroup.createdBy._id;

  const handleMouseEnter = () => {
    setShowPopover(true);
  };

  const handleMouseLeave = () => {
    setShowPopover(false);
  };

  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Edit Group Icon</Popover.Header>
      <Popover.Body>
        <Form onSubmit={handleChangeIcon}>
          <UploadFile onFileChange={setSelectedGroupIcon} />
          <Button variant="outline-success" type="submit">
            Save
          </Button>
        </Form>
      </Popover.Body>
    </Popover>
  );

  return (
    <Card id="main-group-card" style={{ width: "25rem" }}>
      <Card.Body>
        <div
          style={{ position: "relative" }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <OverlayTrigger
            overlay={popover}
            target={() => document.getElementById("group-icon")}
            placement="right"
            delay={{ show: 700, hide: 0 }}
            show={showPopover && isUserGroupOwner}
          >
            <Image
              id="group-icon"
              variant="top"
              src={selectGroup.groupIcon}
            />
          </OverlayTrigger>
        </div>
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
