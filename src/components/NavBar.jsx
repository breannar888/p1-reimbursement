import React from "react";
import "../css/nav.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPiggyBank } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledBtn = styled(Button)(({ theme }) => ({

  backgroundColor: theme.palette.common.black,
  color: theme.palette.common.white,
  textTransform: "none",
  fontSize: "16px",
  "&:hover": {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
  }
}));

export const NavBar = () => {
  return (
    <nav className="nav-bar">
      <section>
        <Link className="nav-logo" to="/">
          <FontAwesomeIcon icon={faPiggyBank} size="2x" />
        </Link>
      </section>
      <section className="nav-item-wrapper">
        <Link className="nav-item" to="/">
          View All
        </Link>
        <Link className="nav-item" to="/addexpense">
          Add Expenses
        </Link>
        <Link className="nav-item" to="/managestatus">
          <StyledBtn>Manage Expenses</StyledBtn>
        </Link>
      </section>
    </nav>
  );
};
