import React, { useState, useEffect } from "react";
import CardActions from "@mui/material/CardActions";
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Container,
  Box,
  Button,
} from "@mui/material";
import { pink, blue, green } from "@mui/material/colors";
import axios from "axios";
import DeclineDialog from "./DeclineDialog";
import { useNavigate } from "react-router-dom";
import FilterDialog from "./FilterDialog";

const Tab1 = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedEnquiryId, setSelectedEnquiryId] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(null); // State to hold payment status
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleFilterClick = () => {
    setIsDialogOpen(true);
  };

  const handleFilterApply = async (startDate, endDate) => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/filter/filterenquiry/${providerId}`,
        {
          startDate: startDate.format("YYYY-MM-DD"),
          endDate: endDate.format("YYYY-MM-DD"),
        }
      );
      const bookingsWithDetails = await Promise.all(
        response.data.map(async (enquiry) => {
          // Fetch service provider details

          const UserDetails = await fetchUserDetails(enquiry.userId);
          console.log(UserDetails);
          return {
            ...enquiry,
            UserDetails,
          };
        })
      );
      setEnquiries(bookingsWithDetails);
    } catch (error) {
      console.error("Error filtering enquiries:", error);
    }
  };
  const handleClearFilterClick = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/enquiry/fetchenquiry/${providerId}`
      );
      const bookingsWithDetails = await Promise.all(
        response.data.map(async (enquiry) => {
          // Fetch service provider details
          const UserDetails = await fetchUserDetails(enquiry.userId);

          return {
            ...enquiry,
            UserDetails,
          };
        })
      );
      // setEnquiries(response.data);
      setEnquiries(bookingsWithDetails);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  const providerId = localStorage.getItem("providerId");

  const navigate = useNavigate();

  const fetchUserDetails = async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/user/getone/${userId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching service provider details:", error);
      return null;
    }
  };

  useEffect(() => {
    const fetchEnquiries = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/enquiry/fetchenquiry/${providerId}`
        );
        const bookingsWithDetails = await Promise.all(
          response.data.map(async (enquiry) => {
            // Fetch service provider details
            const UserDetails = await fetchUserDetails(enquiry.userId);

            return {
              ...enquiry,
              UserDetails,
            };
          })
        );
        // setEnquiries(response.data);
        setEnquiries(bookingsWithDetails);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchEnquiries();
  }, []);

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

  const handleAccept = async (enquiryId) => {
    try {
      await axios.put(
        `http://localhost:8000/api/enquiry/enquirydone/${enquiryId}`
      );
      setEnquiries((prevEnquiries) =>
        prevEnquiries.map((enquiry) =>
          enquiry._id === enquiryId
            ? { ...enquiry, estatus: "enquiry done" }
            : enquiry
        )
      );
    } catch (error) {
      console.error("Error accepting booking:", error);
    }
  };

  const handleDialogOpen = (enquiryId) => {
    setSelectedEnquiryId(enquiryId);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <Box sx={{ padding: "1rem 4rem" }}>
      <h2>Your Enquiries </h2>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end", // Align items to the right
          gap: "1rem",
          width: "100%",
        }}
      >
        <Button
          variant="contained"
          // sx={{ float: "right", marginRight: "2rem" }}
          onClick={handleFilterClick}
        >
          Filter
        </Button>
        <Button
          variant="contained"
          onClick={handleClearFilterClick}
          sx={{ marginRight: "2rem" }}
        >
          clear filter
        </Button>
      </Box>
      <FilterDialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onApply={handleFilterApply}
      />
      {enquiries.length === 0 ? (
        <h4>No enquiries found</h4>
      ) : (
        <ul
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "5rem",
          }}
        >
          {enquiries
            .slice()
            .reverse()
            .map((enquiry) => (
              <Box
                key={enquiry._id}
                sx={{
                  padding: "1rem",
                  width: "40%",
                  border: "1px solid black",
                  borderRadius: "1rem",
                  transition: "0.5s",
                  ":hover": {
                    boxShadow: "5px 5px 5px",
                  },
                }}
              >
                {enquiry.UserDetails && (
                  <Box style={{ padding: "0.5rem" }}>
                    <Box
                      mb={1}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Box
                        variant="h5"
                        style={{
                          fontWeight: "bold",
                          fontSize: "1.2rem",
                          marginLeft: "0.5rem",
                        }}
                      >
                        <strong>name : </strong> {enquiry.UserDetails.fname}{" "}
                        {enquiry.UserDetails.lname}
                      </Box>
                      <Box
                        style={{
                          color: "gray",
                        }}
                        variant="h5"
                      >
                        {enquiry.created}
                      </Box>
                    </Box>
                    <hr />
                    <Box mt={1} ml={1}>
                      <Box>
                        <strong>Enquiry For : </strong> {enquiry.enquiry_for}
                      </Box>
                      <Box>
                        <strong>Pincode : </strong> {enquiry.pincode}
                      </Box>
                      <Box>
                        <strong>state : </strong> {enquiry.state}
                      </Box>
                      <Box>
                        <strong>city : </strong> {enquiry.city}
                      </Box>
                      <Box>
                        <strong> Address : </strong> {enquiry.address}
                      </Box>
                    </Box>

                    {paymentStatus === "done" ? ( // Conditionally render based on payment status
                      <Box className="hideinfo">
                        <Box ml={1}>
                          <strong>Mobile no : </strong>{" "}
                          {enquiry.UserDetails.mobile}
                        </Box>

                        <CardActions>
                          <Button
                            style={{ backgroundColor: blue[500] }}
                            variant="contained"
                            color="primary"
                            onClick={() => handleAccept(enquiry._id)}
                          >
                            Do Enquiry
                          </Button>

                          <Button
                            style={{ backgroundColor: "#bc000b" }}
                            variant="contained"
                            onClick={() => handleDialogOpen(enquiry._id)}
                          >
                            Decline
                          </Button>
                        </CardActions>
                      </Box>
                    ) : (
                      <Button
                        variant="contained"
                        color="primary"
                        sx={{
                          textTransform: "none",
                          width: "100%",
                          marginTop: "1rem",
                        }}
                        onClick={() => navigate("/provider/plans")}
                      >
                        <Typography
                          variant="button"
                          sx={{ lineHeight: "1.4", fontWeight: "bold" }}
                        >
                          Get This Lead
                          <br />
                          <Typography
                            variant="button"
                            sx={{ fontSize: "0.7rem" }}
                          >
                            available phone no & email
                          </Typography>
                        </Typography>
                      </Button>
                    )}
                  </Box>
                )}
              </Box>
            ))}
          <DeclineDialog
            open={dialogOpen}
            onClose={handleCloseDialog}
            enquiryId={selectedEnquiryId}
            setEnquiries={setEnquiries}
          />
        </ul>
      )}
    </Box>
  );
};

export default Tab1;
