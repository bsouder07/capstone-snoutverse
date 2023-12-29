import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  FaCircleUser,
  FaHouse,
  FaMagnifyingGlass,
  FaUserGroup,
} from "react-icons/fa6";

function BottomNav() {
  return (
    <Navbar fixed="bottom" className="d-flex justify-content-evenly border-top">
      <Nav.Link as={Link} to="/dashboard">
        <FaHouse size={30} />
      </Nav.Link>
      <Nav.Link as={Link} to="/search">
        <FaMagnifyingGlass size={30} />
      </Nav.Link>
      <Nav.Link as={Link} to="/groups">
        <FaUserGroup size={30} />
      </Nav.Link>
      <Nav.Link as={Link} to={`/profile/${the_users_id}`}>
        <FaCircleUser size={30} />
      </Nav.Link>
    </Navbar>
  );
}

export default BottomNav;
