import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import Transactions from "./components/Transactions";
import Navbar from "./components/NavBar";
import AccountDetails from "./components/AccountDetails";
import Setting from "./components/Setting";
import FundTransfer from "./components/FundTransfer";
import FixedDeposit from "./components/FixedDeposit";
import SignUp from "./components/SignUp";
import Beneficiary from "./components/Beneficiary";
import AddAccount from "./components/AddAccount";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import { Toaster } from "sonner";
import SelectAccount from "./components/SelectAccount";
import AllBeneficiary from "./components/AllBeneficiary";
import ShowFDS from "./components/ShowFDS";
import ShowBeneficiary from "./components/ShowBeneficiary";

export default function App() {
  const userDetails = {
    username: "Sharvil",
    email: "sharvilm777@gmail.com",
    phone: "+91-985-985-985",
  };
  return (
    <>
      <Toaster richColors position="top-center" />
      <Router>
        <Navbar user={userDetails} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/transactions/:accountNumber" element={<Transactions />} />
            <Route path="/account/:accountNumber" element={<AccountDetails />} />
            <Route path="/account/" element={<SelectAccount />} />
            <Route path="/beneficiary" element={<AllBeneficiary />} />
            <Route path="/user-profile" element={<Setting />} />
            <Route path="/fixed-deposit" element={<FixedDeposit />} />
            <Route path="/add-beneficiary" element={<Beneficiary />} />
            <Route path="/add-account" element={<AddAccount />} />
            <Route path="/fund-transfer" element={<FundTransfer />} />
            <Route path="/show-fd" element={<ShowFDS />} />
            <Route path="/show-beneficiary" element={<ShowBeneficiary />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}
