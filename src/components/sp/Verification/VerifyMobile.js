import OtpInput from "otp-input-react";
import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { auth } from "../../firebaseImageupload/Config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";
import axios from "axios";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const VerifyMobile = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [ph, setPh] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);

  const onSignup = async () => {
    setLoading(true);
    const mobile = "+" + ph;
    console.log(mobile);

    try {
      await axios
        .post("http://localhost:8000/sendOTP", {
          mobile,
        })
        .then((response) => {
          console.log(response);
          setShowOTP(true);
          toast.success("OTP sended successfully!");
        });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const onOTPVerify = async () => {
    console.log(otp)
    setLoading(true);
    const mobile = "+" + ph;
    console.log(mobile);

    try {
      await axios
        .post("http://localhost:8000/enterotp", {
          mobile,
          otp,
        })
        .then(async (response) => {
          await mobileVerified();
        });
    } catch (error) {
      toast.error("Enter valid OTP");
      console.log(error);
      setLoading(false);
    }
  };

  const mobileVerified = async () => {
    const providerId = localStorage.getItem("providerId");
    try {
      await axios
        .put(`http://localhost:8000/api/provider/mobileVerified/${providerId}`)
        .then((response) => {
          console.log(response);
          toast.success("Mobile Verified");
          navigate("/provider");
        });
    } catch (error) {
      toast.error("Enter valid OTP");
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <section>
      <Toaster toastOptions={{ duration: 4000 }} />

      {showOTP ? (
        <>
          <Box sx={{ p: "2rem" }}>
            <h1 style={{ marginBottom: "1rem" }}>Enter your OTP</h1>
            <OtpInput
              value={otp}
              onChange={setOtp}
              OTPLength={6}
              otpType="number"
              disabled={false}
              autoFocus
              className="opt-container "
            ></OtpInput>
            <Button
              onClick={onOTPVerify}
              sx={{ mt: "1rem" }}
              variant="contained"
            >
              Verify OTP
            </Button>
          </Box>
        </>
      ) : (
        <>
          <Box sx={{ p: "2rem" }}>
            <h1 style={{ marginBottom: "1rem" }}>Verify your phone number</h1>
            <PhoneInput
              fullWidth
              inputStyle={{ mt: "1rem", width: "30%", height: "3rem" }}
              country={"in"}
              value={ph}
              onChange={setPh}
            />
            <Button onClick={onSignup} sx={{ mt: "1rem" }} variant="contained">
              Send code via SMS
            </Button>
          </Box>
        </>
      )}
    </section>
  );
};

export default VerifyMobile;
