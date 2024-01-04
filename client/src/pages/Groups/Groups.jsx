import "./groups.css";
import { Form } from "react-bootstrap";

const Groups = () => {
  return (
    <div className="group-container">
      <div className="group-header">Groups</div>

      <h1 className="my-groups">My Groups</h1>

      <Form.Select
        className="group-select"
        aria-label="Default select example"
        size="small"
      >
        <option>Choose a group</option>
        <option value="1">Group 1</option>
        <option value="2">Group 2</option>
        <option value="3">Group 3</option>
      </Form.Select>
    </div>
  );
};

export default Groups;
