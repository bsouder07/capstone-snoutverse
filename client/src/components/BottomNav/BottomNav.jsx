import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  FaCircleUser,
  FaHouse,
  FaMagnifyingGlass,
  FaUserGroup,
} from "react-icons/fa6";
import { useAuth } from "../../hooks";
import "./BottomNav.css";

function BottomNav() {
  const { user } = useAuth();

  return (
    <Navbar
      fixed="bottom"
      id="bottomNav"
      className="d-flex justify-content-evenly border-top"
    >
      <Nav.Link as={Link} to="/dashboard">
        <FaHouse size={30} />
      </Nav.Link>
      <Nav.Link as={Link} to="/search">
        <FaMagnifyingGlass size={30} />
      </Nav.Link>
      <Nav.Link as={Link} to="/groups">
        <FaUserGroup size={30} />
      </Nav.Link>
      <Nav.Link as={Link} to={`/profile/${user?._id}`}>
        <FaCircleUser size={30} />
      </Nav.Link>
    </Navbar>
  );
}

export default BottomNav;
