import { useState, useRef } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import UploadFile from "../../../components/UploadFile";
import api from "../../../utils/api.utils";

const initialFormState = {
  name: "",
  description: "",
  groupIcon: "",
};

const initialPostFormState = {
  text: "",
  image: "",
};

//I pass true for isForPost when I want to use this component to create a post. Otherwise it is used to create a group. The default for isForPost is null. - Tim Q.
const GroupForm = ({
  setAllGroups,
  setShowCreateGroup,
  setSelectGroup,
  selectGroup,
  setSelectedGroupInfo,
  setGroupPosts,
  isUserInGroup,
  isForPost = null,
}) => {
  const [formData, setFormData] = useState(
    isForPost ? initialPostFormState : initialFormState
  );
  const [isTouched, setIsTouched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPrevImg, setShowPrevImg] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const formRef = useRef(null);

  //Using a simple regex expression to replace spaces with nothing so the
  //character count doesn't count spaces. - Tim Q.
  const textWithoutSpace = formData?.text?.replace(/ /g, "");

  const nameLength = formData.name?.length;
  const descriptionLength = formData.description?.length;
  const textLength = textWithoutSpace.length;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setIsTouched(true);
    setError(null);

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleClearFileInput = () => {
    setShowPrevImg(false);
    formRef.current.value = ""; //clear the file input.
  };

  const handleSetFile = (file) => {
    if (isForPost) {
      setFormData((prevState) => ({
        ...prevState,
        image: file,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        groupIcon: file,
      }));
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formPayload = new FormData();

    setIsTouched(false);

    if (isForPost) {
      formPayload.append("text", formData.text);
      formPayload.append("file", formData.image);
    } else {
      formPayload.append("name", formData.name);
      formPayload.append("description", formData.description);
      formPayload.append("file", formData.groupIcon);
    }

    const headers = {
      headers: { "Content-Type": "multipart/form-data" },
    };

    try {
      const { data } = await api.post(
        !isForPost
          ? "/groups/create"
          : `/groups/posts/create/${selectGroup._id}`,
        formPayload,
        headers
      );
      if (!isForPost && data) {
        setAllGroups((prevState) => [...prevState, data]);
        setFormData(initialFormState);
        setShowCreateGroup(false);
        setSelectGroup(data);
        setSelectedGroupInfo(data);
        navigate(`/groups/${data._id}`);
      } else {
        setGroupPosts((prevState) => [...prevState, data]);
        setFormData(initialPostFormState);
        handleClearFileInput();
        navigate(`/groups/${selectGroup._id}`);
      }
    } catch (error) {
      console.log(error);
      setError(
        error?.response?.data?.error || "Something went wrong."
      );
    }
  };
  if (isForPost && !isUserInGroup()) {
    return (
      <Alert variant="warning" className="mt-3">
        You must be a member to post in this group
      </Alert>
    );
  }

  return (
    <div id="grp-form-container">
      <Form id="grp-form" onSubmit={handleFormSubmit}>
        <Form.Group>
          <Form.Label id={isForPost ? "grp-form-label" : ""}>
            {!isForPost
              ? "Group Name"
              : `Create a post in ${selectGroup?.name}`}
          </Form.Label>
          <Form.Control
            id={isForPost ? "grp-post-textarea" : null}
            type="text"
            placeholder={
              !isForPost
                ? "Enter Group Name"
                : "Share your thoughts..."
            }
            as={!isForPost ? "input" : "textarea"}
            name={!isForPost ? "name" : "text"}
            isInvalid={
              !isForPost
                ? isTouched && nameLength < 3
                : isTouched && textLength < 30
            }
            isValid={!isForPost ? nameLength >= 3 : textLength >= 30}
            value={!isForPost ? formData.name : formData.text}
            onChange={handleChange}
          />

          <Form.Control.Feedback type="invalid">
            {!isForPost
              ? "A group name must be at least 3 characters long."
              : "A post must be atleast 30 characters long."}
          </Form.Control.Feedback>
          <Form.Control.Feedback type="valid">
            {!isForPost ? "Looks good!" : "Nice post!"}
          </Form.Control.Feedback>
          {isForPost && (
            <div className="d-flex">
              <Form.Text
                className={
                  textLength > 30 ? "text-danger" : "text-muted"
                }
              >
                {" "}
                Character Count:{" "}
                {formData.text?.replace(/ /g, "").length}/{30}
              </Form.Text>
            </div>
          )}
          {error && <Alert variant="danger">{error}</Alert>}
        </Form.Group>

        {/* If this component is being used to create a new group post, then don't render the input for description 👇🏻 */}
        {!isForPost && (
          <Form.Group controlId="formBasicDescription">
            <Form.Label>Group Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Group Description"
              name="description"
              isInvalid={
                !isForPost && isTouched && descriptionLength < 10
              }
              isValid={!isForPost && descriptionLength >= 10}
              value={
                !isForPost ? formData.description : formData.text
              }
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              A description must be at least 10 characters long.
            </Form.Control.Feedback>
            <Form.Control.Feedback type="valid">
              Looks good!
            </Form.Control.Feedback>
          </Form.Group>
        )}
        {/* End of description for creating a group. */}

        <div className="group-upload-container">
          <Form.Group controlId="file">
            <Form.Label>{!isForPost ? "Group Icon" : ""}</Form.Label>
            <UploadFile
              onFileChange={(file) => handleSetFile(file)}
              showPrevImg={showPrevImg}
              fileRef={formRef}
            />
            <Form.Text>(Photo is optional)</Form.Text>
          </Form.Group>

          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? "...Creating" : "Submit"}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default GroupForm;
