import OtpInput from "otp-input-react";
import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { auth } from "../../firebaseImageupload/Config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";
import axios from "axios";
import { Box, Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
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
    console.log(otp);
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
        .get(`http://localhost:8000/api/provider/mobileVerified/${providerId}`)
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

  const emailInputHandler = (e) => {
    setEmail(e.target.value.toLowerCase());
  };
  const validEmail = async (email) => {
    if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      return true;
    }
    return false;
  };
  const emailExist = async (email) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/provider/search/${email}`
      );
      return true;
    } catch (error) {
      return false;
    }
  };

  const [OTP, setOTP] = useState();
  const [OTPinput, setOTPinput] = useState();

  const sendOTP = async (e) => {
    e.preventDefault();
    if (email) {
      if (await validEmail(email)) {
        if (await emailExist(email)) {
          const newOTP = Math.floor(Math.random() * 9000 + 1000);
          setOTP(newOTP);

          await axios
            .post("http://localhost:8000/send_recovery_email", {
              OTP: newOTP,
              recipient_email: email,
            })
            .then(() => setShowOTP(true))
            .catch(console.log);
        } else {
          toast.error("Email not exist in our database");
        }
      } else {
        toast.error("Enter correct email address");
      }
    } else {
      toast.error("Enter your email address");
    }
  };
  const verfiyOTP = async (e) => {
    e.preventDefault();
    if (OTPinput == OTP) {
      const providerId = localStorage.getItem("providerId");
      try {
        await axios
          .put(`http://localhost:8000/api/provider/emailVerified/${providerId}`)
          .then((response) => {
            toast.success("Email Verified");
            navigate("/provider");
          });
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    } else {
      toast.error("Incorrect OTP");
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
              value={OTPinput}
              onChange={setOTPinput}
              OTPLength={4}
              otpType="number"
              disabled={false}
              autoFocus
              className="opt-container "
            ></OtpInput>
            <Button onClick={verfiyOTP} sx={{ mt: "1rem" }} variant="contained">
              Verify OTP
            </Button>
          </Box>
        </>
      ) : (
        <>
          <Box sx={{ p: "2rem", display: "flex", flexDirection: "column" }}>
            <h1 style={{ marginBottom: "1rem" }}>Verify your Email address</h1>
            <TextField
              sx={{ width: "30%" }}
              margin="normal"
              required
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={emailInputHandler}
            />
            <Button
              onClick={sendOTP}
              sx={{ mt: "1rem", width: "30%" }}
              variant="contained"
            >
              Send code via Email
            </Button>
          </Box>
        </>
      )}
    </section>
  );
};

export default VerifyEmail;
