import React from "react";
import {
  TableRow,
  TableHead,
  TableContainer,
  TableBody,
  Table,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import { Box, Typography } from "@mui/material";
import { ExpenseItems } from "./ExpenseItems";
import { StyledTableHeader } from "../muiComponents/muiStyled";
import { ExpenseState } from "../../context/ExpenseContext";

export const ExpenseList = () => {
  
  //access values from context provider
  const {expense, setExpense} = ExpenseState();

  //update expense state when item is deleted
  const removeItem = (id) => {
    setExpense(
      expense.filter((item) => {
        return item.id !== id;
      })
    );
  };

  //sort expense items by expense.id
  const sortItems = expense.sort((a, b) => a.id - b.id);

  return (
    <Box sx={{ m: "5% 8% 5% 8%" }}>
      <Box>
        <Box>
          <h1>View All</h1>
          <Typography
            variant="subtitle2"
            gutterBottom
            sx={{ fontStyle: "italic" }}
          >
            View, Update, and Delete expenses.
          </Typography>
        </Box>
      </Box>
      <TableContainer component={Paper}>
        <Table aria-label="expenses list">
          <TableHead>
            <TableRow>
              <StyledTableHeader align="left">ID</StyledTableHeader>
              <StyledTableHeader align="left">Employee</StyledTableHeader>
              <StyledTableHeader align="left">Amount</StyledTableHeader>
              <StyledTableHeader align="left">Reason</StyledTableHeader>
              <StyledTableHeader align="right">Status</StyledTableHeader>
              <StyledTableHeader align="right">Actions</StyledTableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortItems.map((exp) => (
              <ExpenseItems
                exp={exp}
                key={exp.id}
                setExpense={setExpense}
                removeItem={removeItem}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
