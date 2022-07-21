import React from "react";
import "../css/nav.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPiggyBank } from "@fortawesome/free-solid-svg-icons";
import { NavBtn } from "./muiComponents/muiStyled";

export const NavBar = () => {
  return (
    <nav className="nav-bar">
      <section>
        <Link className="nav-logo" to="/">
          <FontAwesomeIcon icon={faPiggyBank} size="2x" />
        </Link>
      </section>
      <section className="nav-item-wrapper">
        <Link className="nav-item" to="/">View All</Link>
        <Link className="nav-item" to="/addexpense">
          Add Expenses
        </Link>
        <Link className="nav-item" to="/managestatus">
          <NavBtn>Manage Expenses</NavBtn>
        </Link>
      </section>
    </nav>
  );
};
