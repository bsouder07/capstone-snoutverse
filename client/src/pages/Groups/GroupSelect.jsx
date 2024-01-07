import { Form } from "react-bootstrap";

const GroupSelect = ({
  allGroups,
  selectGroup,
  handleSelectChange,
}) => {
  return (
    <div id="select-container">
      <Form.Select
        className="group-list"
        value={selectGroup ? selectGroup._id : ""}
        size="sm"
        onChange={handleSelectChange}
      >
        <option value="">--Select a group--</option>
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
    </div>
  );
};

export default GroupSelect;
