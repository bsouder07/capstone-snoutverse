import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks";
import "./WelcomePage.css";

function WelcomePage() {
  const { user, isAuthenticated } = useAuth();

  const navigate = useNavigate();

  if (user && isAuthenticated) {
    navigate("/dashboard");
  }
  return (
    <div id="welcomeWrapper">
      <h1 className="absCentering" id="frontTitle">
        Welcome to SnoutVerse!
      </h1>
      <p className="absCentering" id="callToAction">
        <Link className="linkStuff" to="/register">
          Sign up
        </Link>{" "}
        now to join the pet-passionate community!
      </p>
      <span className="absCentering" id="logInSp">
        Already a member?{" "}
        <Link className="linkStuff" to="/login">
          Log in!
        </Link>
      </span>
      <img
        id="heroImg"
        src="/src/assets/pexels-lumn-406014.jpg"
        alt="A brown dog on a white background with its face close to the camera"
      />
    </div>
  );
}

export default WelcomePage;
