import { useState } from "react";
import { Form, Button, Stack } from "react-bootstrap";
import UploadFile from "../../../components/UploadFile";
import api from "../../../utils/api.utils";

const initialFormState = {
  name: "",
  description: "",
  groupIcon: "",
};

const GroupForm = ({ setAllGroups }) => {
  const [formData, setFormData] = useState(initialFormState);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/groups/create", formData);
      if (data) {
        setAllGroups((prevState) => [...prevState, data]);
        setFormData(initialFormState);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Form onSubmit={handleFormSubmit}>
        <Form.Group controlId="formBasicName">
          <Form.Label>Group Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Group Name"
            name="name"
            isInvalid={formData.name.length < 3}
            isValid={formData.name.length >= 3}
            value={formData.name}
            onChange={handleChange}
          />
          <Form.Control.Feedback type="invalid">
            A group name must be at least 3 characters long.
          </Form.Control.Feedback>
          <Form.Control.Feedback type="valid">
            Nice group name!
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formBasicDescription">
          <Form.Label>Group Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Group Description"
            name="description"
            isInvalid={formData.description.length < 10}
            isValid={formData.description.length >= 10}
            value={formData.description}
            onChange={handleChange}
          />
          <Form.Control.Feedback type="invalid">
            A description must be at least 10 characters long.
          </Form.Control.Feedback>
          <Form.Control.Feedback type="valid">
            Looks good!
          </Form.Control.Feedback>
        </Form.Group>
        <Stack direction="horizontal" gap={3}>
          <Form.Group controlId="formBasicGroupIcon">
            <Form.Label>Group Icon</Form.Label>
            <UploadFile onFileChange={null} />
            (Optional right now.)
          </Form.Group>

          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? "...Creating" : "Submit"}
          </Button>
        </Stack>
      </Form>
    </div>
  );
};

export default GroupForm;
