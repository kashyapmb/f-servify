import { Box, Button } from "@mui/material";
import Header from "./components/Header";
import Slider from "./components/Slider";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import PageNotFound from "./components/PageNotFound";
import UserHome from "./components/user/UserHomepage/UserHome";
import UserLogin from "./components/user/UserLogin/UserLogin";
import Signup from "./components/sp/Signup";
import Login from "./components/sp/Login";
import ProviderHome from "./components/sp/ServiceProviderHomePage/ProviderHome";
import EmailTaken from "./components/forgetPassword/EmailTaken";
import VerifyOTP from "./components/forgetPassword/VerifyOTP";
import PasswordReset from "./components/forgetPassword/PasswordReset";
import Recovered from "./components/forgetPassword/Recovered";
import "./App.css";
import ServiceDetails from "./components/user/SearchProvider/ServiceDetails";
import UserSignup from "./components/user/UserLogin/UserSignup";
import UserEmailTaken from "./components/user/UserLogin/UserEmailTaken";
import UserVerifyOTP from "./components/user/UserLogin/UserVerifyOTP";
import UserPasswordReset from "./components/user/UserLogin/UserPasswordReset";
import UserProfile from "./components/user/UserProfile";
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
          <Route path="/user/profile" element={<UserProfile />} />

          <Route path="/serviceprovider" element={<ProviderHome />} />
          <Route path="/user/:city/:servicename" element={<ServiceDetails />} />
          <Route path="/providerlogin" element={<Login />} />
          <Route path="/providerlogin/forget" element={<EmailTaken />} />
          <Route path="/providerlogin/otpverify" element={<VerifyOTP />} />
          <Route path="/providerlogin/resetpass" element={<PasswordReset />} />
          <Route path="/providerlogin/recovered" element={<Recovered />} />
          <Route path="/providersignup" element={<Signup />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
