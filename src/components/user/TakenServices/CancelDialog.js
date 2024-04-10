import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import axios from "axios";

const CancelDialog = ({ open, onClose, enquiryId, setEnquiries }) => {
  const [reason, setReason] = useState("");

  const handleReasonChange = (event) => {
    setReason(event.target.value);
  };

  const cancelBooking = async () => {
    try {
      // Make the API call to cancel the booking
      await axios.put(
        `http://localhost:8000/api/enquiry/cancelenquiry/${enquiryId}`,
        { reason }
      );

      // Update the local state to mark the booking as canceled
      setEnquiries((prevEnquiries) =>
        prevEnquiries.map((enquiry) =>
          enquiry._id === enquiryId
            ? { ...enquiry, estatus: "cancel enquiry" }
            : enquiry
        )
      );

      console.log(`enquiry ID ${enquiryId} canceled successfully`);
      onClose();
    } catch (error) {
      console.error("Error canceling enquiry:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Provide Reason for cancellation</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Reason"
          fullWidth
          value={reason}
          onChange={handleReasonChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={cancelBooking} variant="contained" color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CancelDialog;
