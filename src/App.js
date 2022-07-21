import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AddExpense, Home, ManageStatus } from "./pages";
import { Error, NavBar } from "./components";
import ExpenseProvider from "./context/ExpenseContext";

function App() {
  return (
    <ExpenseProvider>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addexpense" element={<AddExpense />} />
          <Route path="/managestatus" element={<ManageStatus />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </ExpenseProvider>
  );
}

export default App;
