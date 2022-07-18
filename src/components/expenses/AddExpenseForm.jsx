import React from "react";
import "../../css/expensetable.css";
import { Paper, Box, TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { InputAdornment } from "@mui/material";
import axios from "axios";
import { styled } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";

const FormTextField = styled(TextField)(({ theme }) => ({
  "& label.Mui-focused": {
    color: theme.palette.warning.main,
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: theme.palette.warning.light,
  },
  "& .MuiInputAdornment-root": {
    backgroundColor: theme.palette.divider,
    padding: "20px 10px 20px 10px",
    borderTopLeftRadius: theme.shape.borderRadius + "px",
  },
}));

const StyledBtn = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.warning.light,
  color: "white",
  "&:hover": {
    backgroundColor: theme.palette.warning.main,
    color: "black",
  },
}));

const ErrorMessage = styled(Box)(({ theme }) => ({
  color: theme.palette.error.main,
  marginBottom: "2%",
}));

export const AddExpenseForm = () => {
  const recipeSchema = Yup.object().shape({
    name: Yup.string().required("Employee Name is required").max(55, 'Too long!'),
    amount: Yup.number().required("Amount is required").positive().max(7, 'Value too high!'),
    reason: Yup.string().required("Description is required").max(55, 'Too long!'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(recipeSchema),
    defaultValues: {
      name: "",
      amount: 0,
      reason: "",
    },
  });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    await axios
      .post("http://localhost:8080/expense-reimbursement/expenses", {
        name: data.name,
        price: data.amount,
        reason: data.reason,
        statusid: 1,
      })
      .then((res) => {
        if (res.status === 200) {
          navigate("/");
        }
      });

    console.log(data);
  };

  return (
    <Box sx={{ m: "5% 8% 5% 8%", textAlign: "center" }}>
      <h1>Add Expenses</h1>
      <Typography variant="subtitle2" gutterBottom sx={{fontStyle: "italic"}}>
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
        <StyledBtn onClick={handleSubmit(onSubmit)}>Submit</StyledBtn>
      </Paper>
    </Box>
  );
};
