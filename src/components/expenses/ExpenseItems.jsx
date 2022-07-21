import React from "react";
import axios from "axios";
import { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Box } from "@mui/material";
import "../../css/expensetable.css";
import { StatusIcons } from "../status/StatusIcons";
import { StyledTableCell, StyledTableRow } from "../muiComponents/muiStyled";

export const ExpenseItems = ({ exp, setExpense, removeItem }) => {
  const [update, setUpdate] = useState(false);
  const [name, setName] = useState(exp.name);
  const [amount, setAmount] = useState(exp.price);
  const [reason, setReason] = useState(exp.reason);

  //form value refs
  const nameRef = useRef();
  const amountRef = useRef();
  const reasonRef = useRef();

  //toggle between showing/hiding update inputs
  const toggleUpdate = () => {
    setUpdate(!update);
  };

  const handleUpdate = async () => {
    try {
      //send data to API
      const data = await axios.post(
        `http://localhost:8080/expense-reimbursement/expenses?id=${exp.id}`,
        {
          name: nameRef.current.value,
          price: amountRef.current.value,
          reason: reasonRef.current.value,
          statusid: exp.statusid,
        }
      );

      //when data is sent, get updated data from API
      if (data) {
        axios
          .get("http://localhost:8080/expense-reimbursement/expenses")
          .then((res) => {
            setExpense(res.data);
          });
      }
      setUpdate(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:8080/expense-reimbursement/expenses?id=${exp.id}`
      );
      removeItem(exp.id);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <StyledTableRow>
      <StyledTableCell>{exp.id}</StyledTableCell>
      <StyledTableCell>
        {update ? (
          <div className="expense-input">
            <input
              name="name"
              ref={nameRef}
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            ></input>
          </div>
        ) : (
          exp.name
        )}
      </StyledTableCell>
      <StyledTableCell align="left">
        {update ? (
          <div className="expense-input">
            <input
              name="amount"
              placeholder="Amount"
              ref={amountRef}
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
              }}
            ></input>
          </div>
        ) : (
          <div>{"$" + exp.price}</div>
        )}
      </StyledTableCell>
      <StyledTableCell align="left">
        {update ? (
          <div className="expense-input">
            <input
              name="reason"
              placeholder="Reason"
              ref={reasonRef}
              value={reason}
              onChange={(e) => {
                setReason(e.target.value);
              }}
            ></input>
          </div>
        ) : (
          exp.reason
        )}
      </StyledTableCell>
      <StyledTableCell align="right">
        <StatusIcons statID={exp.statusid} />
      </StyledTableCell>
      <StyledTableCell align="right">
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            m: "0 0 0 10px",
          }}
        >
          <Box sx={{ m: "0 15px 0 0px" }}>
            {update ? (
              <Box sx={{ "&:hover": { color: "green" } }}>
                <FontAwesomeIcon
                  onClick={handleUpdate}
                  icon={faCheck}
                  size="lg"
                />
              </Box>
            ) : (
              <Box sx={{ "&:hover": { color: "gray" } }}>
                <FontAwesomeIcon
                  onClick={toggleUpdate}
                  icon={faPenToSquare}
                  size="lg"
                />
              </Box>
            )}
          </Box>
          <Box sx={{ "&:hover": { color: "red" } }}>
            {update ? (
              <FontAwesomeIcon
                icon={faXmark}
                size="lg"
                onClick={toggleUpdate}
              />
            ) : (
              <FontAwesomeIcon
                icon={faTrashCan}
                size="lg"
                onClick={handleDelete}
              />
            )}
          </Box>
        </Box>
      </StyledTableCell>
    </StyledTableRow>
  );
};
