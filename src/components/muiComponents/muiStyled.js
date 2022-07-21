import { Button, Box, TextField } from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";

export const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    maxWidth: "100px",
    minWidth: "100px",
  },
}));

export const StyledTableHeader = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.warning.light,
    fontWeight: "bold",
  },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
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

export const NavBtn = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  textTransform: "none",
  fontSize: "16px",
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.common.black,
  },
}));

export const FormTextField = styled(TextField)(({ theme }) => ({
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

export const SubmitBtn = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.warning.light,
  color: "white",
  "&:hover": {
    backgroundColor: theme.palette.warning.main,
    color: "black",
  },
}));

export const ErrorMessage = styled(Box)(({ theme }) => ({
  color: theme.palette.error.main,
  marginBottom: "2%",
}));

export const ApproveBtn = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.success.light,
  color: theme.palette.common.white,
  marginRight: "5px",
  "&:hover": {
    backgroundColor: theme.palette.success.main,
  },
}));

export const DenyBtn = styled(Button)(({ theme }) => ({
  border: `1px solid ${theme.palette.error.main}`,
  color: theme.palette.error.main,
  "&:hover": {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.common.white,
  },
}));