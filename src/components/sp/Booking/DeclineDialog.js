import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import axios from "axios";

const DeclineDialog = ({ open, onClose, enquiryId, setEnquiries }) => {
  const [reason, setReason] = useState("");

  const handleReasonChange = (event) => {
    setReason(event.target.value);
  };

  const handleDecline = async () => {
    try {
      // Make API call to decline booking
      await axios.put(
        `http://localhost:8000/api/enquiry/declineenquiry/${enquiryId}`,
        { reason }
      );

      // Update local state to reflect the change
      setEnquiries((prevEnquiries) =>
        prevEnquiries.map((enquiry) =>
          enquiry._id === enquiryId
            ? {
                ...enquiry,
                estatus: "decline enquiry",
              }
            : enquiry
        )
      );

      onClose(); // Close the dialog
    } catch (error) {
      console.error("Error declining booking:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Provide Reason for Declining</DialogTitle>
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
        <Button onClick={handleDecline} variant="contained" color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeclineDialog;
