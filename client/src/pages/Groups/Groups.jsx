import { useState, useEffect } from "react";
import "./groups.css";
import { useNavigate, useLocation } from "react-router-dom";
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
  const [groupPosts, setGroupPosts] = useState([]);
  const [selectedGroupInfo, setSelectedGroupInfo] = useState(null);
  const [selectedGroupIcon, setSelectedGroupIcon] = useState(null);
  const [error, setError] = useState(null);

  const { pathname } = useLocation();

  const { user } = useAuth();

  const navigate = useNavigate();

  const getIdFromPath = (url) => {
    const urlArr = url.split("/");
    const id = urlArr[urlArr.length - 1];
    return id;
  };

  const allGroupsIds = allGroups.map((group) => group._id);

  useEffect(() => {
    const groupId = getIdFromPath(pathname);

    if (allGroupsIds.includes(groupId)) {
      const selectedGroup = allGroups.find(
        (group) => group._id === groupId
      );
      setSelectGroup(selectedGroup);
      setSelectedGroupInfo(selectedGroup);
    }
  }, [pathname, allGroups]);

  const isUserInGroup = () => {
    if (selectedGroupInfo) {
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

  const handleChangeIcon = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const { data } = await api.put(
        `groups/edit-icon/${selectGroup._id}`,
        { file: selectedGroupIcon },
        { headers: { "Content-Type": "multipart/form-data" } }
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
          handleChangeIcon={handleChangeIcon}
          setSelectedGroupIcon={setSelectedGroupIcon}
        />
      )}

      {/* Reusing the GroupForm component for creating a post. */}
      {selectGroup && (
        <GroupForm
          setAllGroups={setAllGroups}
          setShowCreateGroup={setShowCreateGroup}
          setSelectGroup={setSelectGroup}
          selectGroup={selectGroup}
          setSelectedGroupInfo={setSelectedGroupInfo}
          setGroupPosts={setGroupPosts}
          isForPost={true}
        />
      )}
      {/* outlet to child GroupPage component route. */}
      <Outlet context={[groupPosts, setGroupPosts]} />
      {/*https://reactrouter.com/en/6.21.1/hooks/use-outlet-context */}

      {!selectGroup && (
        <>
          <h3 className="create-grp-heading">
            Don't see one you that interests you?{" "}
          </h3>
          <Button
            variant="outline-success"
            onClick={() => setShowCreateGroup(!showCreateGroup)}
          >
            Create a Group
          </Button>
        </>
      )}

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
