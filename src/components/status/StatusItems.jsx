import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import "../../css/expensetable.css";
import { Button, Box } from "@mui/material";

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    maxWidth: "100px",
    minWidth: "100px",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:hover": {
    backgroundColor: theme.palette.action.selected,
  },
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
    "&:hover": {
      backgroundColor: theme.palette.action.selected,
    },
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const ApproveBtn = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.success.light,
  color: theme.palette.common.white,
  marginRight: "5px",
  "&:hover": {
    backgroundColor: theme.palette.success.main,
  },
}));

const DenyBtn = styled(Button)(({ theme }) => ({
  border: `1px solid ${theme.palette.error.main}`,
  color: theme.palette.error.main,
  "&:hover": {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.common.white,
  },
}));

export const StatusItems = ({ exp, setTest, test }) => {
  const onApprove = async () => {
    try {
      axios
        .post(
          `http://localhost:8080/expense-reimbursement/expenses?id=${exp.id}`,
          {
            name: exp.name,
            price: exp.price,
            reason: exp.reason,
            statusid: 2,
          }
        )
        .then(setTest(!test));
    } catch (err) {
      console.log(err);
    }
  };

  const onDeny = async () => {
    try {
      axios
        .post(
          `http://localhost:8080/expense-reimbursement/expenses?id=${exp.id}`,
          {
            name: exp.name,
            price: exp.price,
            reason: exp.reason,
            statusid: 3,
          }
        )
        .then(setTest(!test));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <StyledTableRow>
      <StyledTableCell>{exp.id}</StyledTableCell>
      <StyledTableCell align="left">{exp.name}</StyledTableCell>
      <StyledTableCell align="left">${exp.price}</StyledTableCell>
      <StyledTableCell align="left">{exp.reason}</StyledTableCell>
      <StyledTableCell align="right">
          <ApproveBtn
            onClick={() => {
              onApprove();
            }}
          >
            Approve
          </ApproveBtn>
        <DenyBtn
          onClick={() => {
            onDeny();
          }}
        >
          Deny
        </DenyBtn>
      </StyledTableCell>
    </StyledTableRow>
  );
};
