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
import SPDetails from "./components/user/ProviderDetails/SPDetails";
import ProviderProfile from "./components/sp/ProviderProfile";
import FirebaseImageUpload from "./components/firebaseImageupload/FirebaseImageUpload";
import Favorite from "./components/user/Favorites/Favorite";
import VerifyEmail from "./components/sp/Verification/VerifyEmail";
import VerifyMobile from "./components/sp/Verification/VerifyMobile";
import Homepage from "./components/admin/Homepage";

import Booking from "./components/sp/Booking/Booking";
import Dashboard from "./components/sp/Dashboard/Dashboard";
import TakenService from "./components/user/TakenServices/TakenService";
import DoPayment from "./components/sp/Payment/DoPayment";
import Plans from "./components/sp/Payment/Plans";
import PaymentStep1 from "./components/sp/Payment/PaymentStep1";
import PaymentStep2 from "./components/sp/Payment/PaymentStep2";
import Qr from "./components/sp/Payment/Qr";
import Upi from "./components/sp/Payment/Upi";
import NetBanking from "./components/sp/Payment/NetBanking";
import CardPay from "./components/sp/Payment/CardPay";
import Reviews from "./components/sp/Reviews/Reviews";

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
          <Route path="/user/profile/:userId" element={<UserProfile />} />
          <Route path="/user/:city/:servicename" element={<ServiceDetails />} />
          <Route path="/user/:city/:servicename/:id" element={<SPDetails />} />
          <Route path="/user/:city/:servicename/:id" element={<SPDetails />} />
          <Route path="/user/favorites" element={<Favorite />} />
          <Route path="/user/takenservices" element={<TakenService />} />


          <Route path="/provider" element={<ProviderHome />} />
          <Route path="/provider/login" element={<Login />} />
          <Route path="/provider/signup" element={<Signup />} />
          <Route path="/provider/forget" element={<EmailTaken />} />
          <Route path="/provider/otpverify" element={<VerifyOTP />} />
          <Route path="/provider/resetpass" element={<PasswordReset />} />
          <Route path="/provider/recovered" element={<Recovered />} />
          <Route
            path="/provider/profile/:providerId"
            element={<ProviderProfile />}
          />
          <Route path="/provider/verifyemail" element={<VerifyEmail />} />
          <Route path="/provider/verifymobile" element={<VerifyMobile />} />

          <Route path="/provider/booking" element={<Booking />} />
          <Route path="/provider/payment" element={<DoPayment />} />
          <Route path="/provider/paymentstep1" element={<PaymentStep1 />} />
          <Route path="/provider/paymentstep2" element={<PaymentStep2 />} />
          <Route path="/provider/paymentstep2/qr" element={<Qr />} />
          <Route path="/provider/paymentstep2/upi" element={<Upi />} />
          <Route
            path="/provider/paymentstep2/netbanking"
            element={<NetBanking />}
          />
          <Route path="/provider/paymentstep2/card" element={<CardPay />} />
          <Route path="/provider/plans" element={<Plans />} />
          <Route path="/provider/dashboard" element={<Dashboard />} />
          <Route path="/provider/reviews" element={<Reviews />} />


          <Route path="/mobile" element={<MobileOTP />} />
          <Route path="/firebase" element={<FirebaseImageUpload />} />

          <Route path="/admin" element={<Homepage />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
