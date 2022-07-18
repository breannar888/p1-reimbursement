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
import { StatusItems } from "./StatusItems";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontWeight: "bold",
  },
}));

export const ManageStatusList = () => {
  const [expense, setExpense] = useState([]);
  const [test, setTest] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/expense-reimbursement/expenses")
      .then((res) => setExpense(res.data));
  }, [test]);

  return (
    <Box sx={{ m: "5% 8% 5% 8%" }}>
      <h1>Manage Expenses </h1>
      <Typography variant="subtitle2" gutterBottom sx={{fontStyle: "italic"}}>
        Manage pending expenses by updating their status.
      </Typography>
      <TableContainer component={Paper}>
        <Table aria-label="expenses list">
          <TableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell align="left">Employee</StyledTableCell>
              <StyledTableCell align="left">Amount</StyledTableCell>
              <StyledTableCell align="left">Reason</StyledTableCell>
              <StyledTableCell align="right">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {expense.map((exp) => {
              if (exp.statusid == 1) {
                return (
                  <StatusItems
                    key={exp.id}
                    exp={exp}
                    setTest={setTest}
                    test={test}
                  />
                );
              }
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
