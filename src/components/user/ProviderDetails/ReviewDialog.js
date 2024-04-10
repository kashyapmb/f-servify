import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Rating,
  Box,
  TextField,
} from "@mui/material";
import axios from "axios";

const ReviewDialog = ({
  open,
  onClose,
  onSubmit,
  isEdit,
  providerId,
  userId,
}) => {
  const [rating, setRating] = useState(0);
  const [userReview, setUserReview] = useState("");
  const [existingReview, setExistingReview] = useState(null);
  const [hover, setHover] = React.useState(-1);
  const [fullWidth, setFullWidth] = React.useState("lg");

  useEffect(() => {
    setRating(0);
    setUserReview("");

    axios
      .get(`http://localhost:8000/api/reviews/${providerId}/${userId}`)
      .then((reviewResponse) => {
        setExistingReview(reviewResponse.data);
        setRating(reviewResponse.data.rating);
        setUserReview(reviewResponse.data.review);
      })
      .catch((error) => {
        console.error("Error fetching review details:", error);
      });
  }, [providerId, userId]);

  const handleReviewSubmit = () => {
    if (!rating || !userReview.trim()) {
      alert("Please provide both rating and review before submitting.");
      return;
    }

    const apiEndpoint = isEdit
      ? `http://localhost:8000/api/reviews/update/${existingReview._id}`
      : `http://localhost:8000/api/reviews/${providerId}`;

    const apiMethod = isEdit ? "put" : "post";

    axios[apiMethod](apiEndpoint, {
      userId: userId,
      rating: rating,
      review: userReview,
    })
      .then((response) => {
        // Fetch the updated data after successful submission
        axios
          .get(`http://localhost:8000/api/reviews/${providerId}/${userId}`)
          .then((reviewResponse) => {
            setExistingReview(reviewResponse.data);
          })
          .catch((error) => {
            console.error("Error fetching updated review details:", error);
          });
      })
      .catch((error) => {
        console.error("Error submitting review:", error);
      });
    onClose();
  };

  const labels = {
    1: "Very bad",
    2: "Bad",
    3: "Good",
    4: "Very Good",
    5: "Excellent",
  };

  function getLabelText(value) {
    return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
  }

  return (
    <Dialog fullWidth={fullWidth} open={open} onClose={onClose}>
      <Box style={{ padding: "1rem" }}>
        <DialogTitle sx={{ fontWeight: "bold" }}>
          {isEdit ? "Edit Review" : "Give Review"}
        </DialogTitle>
        <DialogContent>
          <div
            className="ratingwithlabel"
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Rating
              size="large"
              name="hover-feedback"
              value={rating}
              getLabelText={getLabelText}
              onChange={(event, newValue) => {
                setRating(newValue);
              }}
              onChangeActive={(event, newHover) => {
                setHover(newHover);
              }}
            />
            {rating !== null && (
              <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : rating]}</Box>
            )}
          </div>
          <div className="reviewcontainer" style={{ marginTop: "1.5rem" }}>
            <TextField
              fullWidth
              id="outlined-basic"
              label="Description"
              variant="outlined"
              value={userReview}
              onChange={(e) => setUserReview(e.target.value)}
              multiline
              rows={5} // Adjust the number of rows as needed
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Box sx={{ mr: "1rem" }}>
            <Button onClick={onClose}>Cancel</Button>
            <Button
              onClick={onSubmit || handleReviewSubmit}
              variant="contained"
            >
              {isEdit ? "Update Review" : "Submit Review"}
            </Button>
          </Box>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default ReviewDialog;
