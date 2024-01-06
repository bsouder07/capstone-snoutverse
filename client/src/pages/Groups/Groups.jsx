import { useState, useEffect } from "react";
import "./groups.css";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import GroupForm from "./Form/GroupForm";
import api from "../../utils/api.utils";
import GroupCard from "./GroupCard";
import { useAuth } from "../../hooks";
import { Outlet } from "react-router-dom";
import GroupSelect from "./GroupSelect";

const Groups = () => {
  const [allGroups, setAllGroups] = useState([]);
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [selectGroup, setSelectGroup] = useState(null);
  const [selectedGroupInfo, setSelectedGroupInfo] = useState(null);
  const [error, setError] = useState(null);

  const { user } = useAuth();

  const navigate = useNavigate();

  const isUserInGroup = () => {
    console.log(user);
    if (selectedGroupInfo) {
      console.log(selectGroup);
      const isUserInGroup = selectedGroupInfo.members.includes(
        user?._id
      );
      return isUserInGroup;
    }
  };

  const handleSelectChange = (e) => {
    const selectedGroupId = e.target.value;
    const selectedGroup = allGroups.find(
      (group) => group._id === selectedGroupId
    );

    setSelectGroup(selectedGroup);
    setSelectedGroupInfo(selectedGroup);
    navigate(`/groups/${selectedGroupId}`);
  };

  const handleJoinGroup = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.put(
        `/groups/join/${selectGroup._id}`
      );
      if (data) {
        setSelectedGroupInfo(data);
        setSelectGroup(data);
      }
    } catch (error) {
      console.log(error);
    }
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
  //in the return any class/id that contains "empty" is to conditionally change the
  //sizing to account for empty areas.

  return (
    <div
      className={
        !selectGroup ? "group-container-empty" : "group-container"
      }
    >
      <h1 className={!selectGroup ? "my-groups-empty" : "my-groups"}>
        {!selectGroup
          ? "Select a group from the dropdown"
          : "My Groups"}
      </h1>

      <GroupSelect
        allGroups={allGroups}
        selectGroup={selectGroup}
        handleSelectChange={handleSelectChange}
      />

      {selectGroup && (
        <GroupCard
          selectGroup={selectGroup}
          handleJoinGroup={handleJoinGroup}
          isUserInGroup={isUserInGroup}
        />
      )}

      {selectGroup && <Outlet />}

      <Button onClick={() => setShowCreateGroup(!showCreateGroup)}>
        Create Group
      </Button>

      {showCreateGroup && (
        <GroupForm
          setAllGroups={setAllGroups}
          setShowCreateGroup={setShowCreateGroup}
          setSelectGroup={setSelectGroup}
          setSelectedGroupInfo={setSelectedGroupInfo}
        />
      )}
    </div>
  );
};

export default Groups;
