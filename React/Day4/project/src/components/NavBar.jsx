import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h2>My Website</h2>

      <div className="nav-links">
        <NavLink to="/" end>
          Home
        </NavLink>

        <NavLink to="/about">
          About
        </NavLink>

        <NavLink to="/services">
          Services
        </NavLink>

        <NavLink to="/courses">
          Courses
        </NavLink>

        <NavLink to="/gallery">
          Gallery
        </NavLink>

        <NavLink to="/contact">
          Contact
        </NavLink>

        <NavLink to="/help">
          Help
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;