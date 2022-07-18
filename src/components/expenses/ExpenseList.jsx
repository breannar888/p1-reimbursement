import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Typography } from "@mui/material";
import { ExpenseItems } from "./ExpenseItems";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.warning.light,
    fontWeight: "bold",
  },
}));

export const ExpenseList = () => {
  const [expense, setExpense] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/expense-reimbursement/expenses")
      .then((res) => setExpense(res.data));
  }, []);

  return (
    <Box sx={{ m: "5% 8% 5% 8%" }}>
      <h1>View All</h1>
      <Typography variant="subtitle2" gutterBottom sx={{fontStyle: "italic"}}>
        View, Update, and Delete expenses.
      </Typography>
      <TableContainer component={Paper}>
        <Table aria-label="expenses list">
          <TableHead>
            <TableRow>
            <StyledTableCell align="left">ID</StyledTableCell>
              <StyledTableCell align="left">Employee</StyledTableCell>
              <StyledTableCell align="left">Amount</StyledTableCell>
              <StyledTableCell align="left">Reason</StyledTableCell>
              <StyledTableCell align="right">Status</StyledTableCell>
              <StyledTableCell align="right">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {expense.map((exp) => (
              <ExpenseItems
                exp={exp}
                key={exp.id}
                setExpense={setExpense}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
