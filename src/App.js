import { Box, Button } from "@mui/material";
import Header from "./components/Header";
import Slider from "./components/Slider";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import PageNotFound from "./components/PageNotFound";
import UserHome from "./components/user/UserHomepage/UserHome";
import UserLogin from "./components/user/UserLogin/UserLogin";
import Signup from "./components/sp/ServiceProviderLogin/Signup";
import Login from "./components/sp/ServiceProviderLogin/Login";
import ProviderHome from "./components/sp/ServiceProviderHomePage/ProviderHome";
import EmailTaken from "./components/sp/ServiceProviderLogin/EmailTaken";
import VerifyOTP from "./components/sp/ServiceProviderLogin/VerifyOTP";
import PasswordReset from "./components/sp/ServiceProviderLogin/PasswordReset";
import Recovered from "./components/sp/ServiceProviderLogin/Recovered";
import "./App.css";
import ServiceDetails from "./components/user/SearchProvider/ServiceDetails";
import UserSignup from "./components/user/UserLogin/UserSignup";
import UserEmailTaken from "./components/user/UserLogin/UserEmailTaken";
import UserVerifyOTP from "./components/user/UserLogin/UserVerifyOTP";
import UserPasswordReset from "./components/user/UserLogin/UserPasswordReset";
import UserProfile from "./components/user/UserProfile";
import MobileOTP from "./components/MobileOTP";
import SPDetails from "./components/user/SPDetails";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user" element={<UserHome />} />
          <Route path="/user/login" element={<UserLogin />} />
          <Route path="/user/signup" element={<UserSignup />} />
          <Route path="/user/forget" element={<UserEmailTaken />} />
          <Route path="/user/otpverify" element={<UserVerifyOTP />} />
          <Route path="/user/resetpass" element={<UserPasswordReset />} />
          <Route path="/user/profile/:id" element={<UserProfile />} />
          <Route path="/user/:city/:servicename" element={<ServiceDetails />} />
          <Route path="/user/:city/:servicename/:id" element={<SPDetails />} />

          <Route path="/provider" element={<ProviderHome />} />
          <Route path="/provider/login" element={<Login />} />
          <Route path="/provider/signup" element={<Signup />} />
          <Route path="/provider/forget" element={<EmailTaken />} />
          <Route path="/provider/otpverify" element={<VerifyOTP />} />
          <Route path="/provider/resetpass" element={<PasswordReset />} />
          <Route path="/provider/recovered" element={<Recovered />} />

          <Route path="/mobile" element={<MobileOTP />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
