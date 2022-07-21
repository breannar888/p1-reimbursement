import { createContext, useContext } from "react";
import { useState, useEffect } from "react";
import axios from "axios";

export const ExpenseContext = createContext();

const ExpenseProvider = (props) => {
  const [expense, setExpense] = useState([]);
  const [status, setStatus] = useState([]);
  const [updateExpense, setUpdateExpense] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/expense-reimbursement/expenses")
      .then((resp) => setExpense(resp.data))
      .catch((error) => console.log(error));

    axios
      .get("http://localhost:8080/expense-reimbursement/manage")
      .then((resp) => setStatus(resp.data))
      .catch((error) => console.log(error));
  }, [updateExpense]);

  const value = {
    expense,
    setExpense,
    updateExpense,
    setUpdateExpense,
    status,
    setStatus,
  };

  return (
    <ExpenseContext.Provider value={value}>
      {props.children}
    </ExpenseContext.Provider>
  );
};

export default ExpenseProvider;

export const ExpenseState = () => {
  return useContext(ExpenseContext);
};
