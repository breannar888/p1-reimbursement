import React, { useState } from "react";
import axios from "axios";
import "../../css/expensetable.css";
import {
  StyledTableCell,
  StyledTableRow,
  ApproveBtn,
  DenyBtn,
} from "../muiComponents/muiStyled";
import { Button } from "@mui/material";
import { ExpenseState } from "../../context/ExpenseContext";

export const StatusItems = ({ exp, updateExpense, setUpdateExpense }) => {

  //handle approve submission
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
        .then(setUpdateExpense(!updateExpense));
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
        .then(setUpdateExpense(!updateExpense));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <StyledTableRow>
      <StyledTableCell>{exp.id}
      </StyledTableCell>
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
