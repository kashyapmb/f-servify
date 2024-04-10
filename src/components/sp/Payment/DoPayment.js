//from step1 selectedplan come
import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const DoPayment = () => {
  const providerId = localStorage.getItem("providerId");
  const location = useLocation();
  const state = location.state || {}; // Using empty object if state is null

  const originalPrice = state.originalPrice || 0; // Defaulting to 0 if originalPrice is null
  const selectedPlan = state.selectedPlan || ""; // Defaulting to an empty string if selectedPlan is null
  const timePeriod = state.timePeriod || 0;

  const [paymentStatus, setPaymentStatus] = useState(null);

  useEffect(() => {
    const fetchPaymentStatus = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/payment/checkpaymentstatus/${providerId}`
        );
        setPaymentStatus(response.data);
      } catch (error) {
        console.error("Error fetching payment status:", error);
      }
    };

    fetchPaymentStatus();
  }, [providerId]);

  const handleMakePayment = async () => {
    try {
      await axios.post(
        `http://localhost:8000/api/payment/paymentplan/${providerId}`,
        {
          plan: selectedPlan,
          timePeriod: timePeriod,
        }
      );
    } catch (error) {
      console.error("Error making payment:", error);
    }
  };
  return (
    <div>
      <h1>Payment Page</h1>
      <p>Selected Plan: {selectedPlan}</p>
      <p>Selected price: {originalPrice}</p>
      <p>Selected time: {timePeriod}</p>
      {paymentStatus === "done" ? (
        <Button disabled variant="contained">
          Payment Done
        </Button>
      ) : (
        <Button variant="contained" onClick={handleMakePayment}>
          Make Payment
        </Button>
      )}
    </div>
  );
};

export default DoPayment;
