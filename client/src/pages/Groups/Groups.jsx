import { useState, useEffect } from "react";
import "./groups.css";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import GroupForm from "./Form/GroupForm";
import api from "../../utils/api.utils";
import GroupCard from "./GroupCard";
import { Outlet } from "react-router-dom";

const Groups = () => {
  const [allGroups, setAllGroups] = useState([]);
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [selectGroup, setSelectGroup] = useState(null);
  const [selectedGroupInfo, setSelectedGroupInfo] = useState(null);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSelectChange = (e) => {
    const selectedGroupId = e.target.value;
    const selectedGroup = allGroups.find(
      (group) => group._id === selectedGroupId
    );

    setSelectGroup(selectedGroup);
    setSelectedGroupInfo(selectedGroup);
    navigate(`/groups/${selectedGroupId}`);
  };

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get("/groups");

        if (data) {
          setAllGroups(data);
        }
      } catch (error) {
        console.log(error);
        setError(
          error?.response?.data?.error ||
            "Something went wrong, please try again."
        );
      }
    })();
  }, []);

  return (
    <div className="group-container">
      <div className="group-header">Groups</div>

      <h1 className="my-groups">My Groups</h1>

      <Form.Select
        className="group-list"
        value={selectGroup ? selectGroup._id : ""}
        onChange={handleSelectChange}
      >
        {allGroups.map((group) => (
          <option
            key={group._id}
            className="group-card"
            value={group._id}
          >
            {group.name}
          </option>
        ))}
      </Form.Select>

      {selectGroup && <GroupCard selectGroup={selectGroup} />}

      {selectGroup && <Outlet />}

      <Button onClick={() => setShowCreateGroup(!showCreateGroup)}>
        Create Group
      </Button>

      {showCreateGroup && <GroupForm setAllGroups={setAllGroups} />}
    </div>
  );
};

export default Groups;
