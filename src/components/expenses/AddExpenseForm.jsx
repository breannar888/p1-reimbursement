import React from "react";
import "../../css/expensetable.css";
import { Paper, Box, Typography } from "@mui/material";
import { InputAdornment } from "@mui/material";
import axios from "axios";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import {
  FormTextField,
  SubmitBtn,
  ErrorMessage,
} from "../muiComponents/muiStyled";
import { ExpenseState } from "../../context/ExpenseContext";

export const AddExpenseForm = () => {

  //access values from context provider
  const { updateExpense, setUpdateExpense } = ExpenseState();

  //react-router-dom hook used to redirect
  const navigate = useNavigate();

  //form validation
  const formSchema = Yup.object().shape({
    name: Yup.string()
      .required("Employee Name is required")
      .max(55, "Too long!"),
    amount: Yup.number()
      .required("Amount is required")
      .positive()
      .max(10000, "Value too high!"),
    reason: Yup.string()
      .required("Description is required")
      .max(55, "Too long!"),
  });

  //useForm methods handling validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      name: "",
      amount: 0,
      reason: "",
    },
  });

  const onSubmit = async (data) => {
    await axios
      .post("http://localhost:8080/expense-reimbursement/expenses", {
        name: data.name,
        price: data.amount,
        reason: data.reason,
        statusid: 1,
      })
      .then((res) => {
        //on successful post, redirect to home page
        if (res.status === 200) {
          setUpdateExpense(!updateExpense);
          navigate("/");
        }
      });
    console.log(data);
  };

  return (
    <Box sx={{ m: "5% 8% 5% 8%", textAlign: "center" }}>
      <h1>Add Expenses</h1>
      <Typography variant="subtitle2" gutterBottom sx={{ fontStyle: "italic" }}>
        Submit expense reimbursement form.
      </Typography>
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "50%",
          maxWidth: "550px",
          m: "auto",
          p: "2%",
        }}
      >
        <FormTextField
          label="Name"
          variant="standard"
          margin="normal"
          {...register("name")}
        />
        <ErrorMessage>{errors.name?.message}</ErrorMessage>
        <FormTextField
          label="Amount"
          variant="standard"
          type="number"
          margin="normal"
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
          {...register("amount")}
        />

        <ErrorMessage>{errors.amount?.message}</ErrorMessage>
        <FormTextField
          label="Reason"
          variant="standard"
          margin="normal"
          {...register("reason")}
        />
        <ErrorMessage>{errors.reason?.message}</ErrorMessage>
        <SubmitBtn onClick={handleSubmit(onSubmit)}>Submit</SubmitBtn>
      </Paper>
    </Box>
  );
};
