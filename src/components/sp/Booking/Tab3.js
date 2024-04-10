import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import { Card, Typography, Avatar, Box, Rating } from "@mui/material";
import { FaStar } from "react-icons/fa";
import FilterDialog from "./FilterDialog";

import { IoLocationSharp } from "react-icons/io5";
// import { IoLogoWhatsapp } from "react-icons/io";
import { FaWhatsapp } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMailOpen } from "react-icons/io5";
import { purple, green } from "@mui/material/colors";
import { styled } from "@mui/material/styles";

const Tab3 = () => {
  const providerId = localStorage.getItem("providerId");
  const [enquiries, setEnquiries] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleFilterClick = () => {
    setIsDialogOpen(true);
  };

  const handleFilterApply = async (startDate, endDate) => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/filter/filterdecline/${providerId}`,
        {
          startDate: startDate.format("YYYY-MM-DD"),
          endDate: endDate.format("YYYY-MM-DD"),
        }
      );
      const bookingsWithDetails = await Promise.all(
        response.data.map(async (enquiry) => {
          // Fetch service provider details
          const EnquiryDetails = await fetchEnquiryDetails(enquiry.enquiryId);
          const UserDetails = await fetchUserDetails(enquiry.userId);
          console.log(UserDetails);
          return {
            ...enquiry,
            EnquiryDetails,
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
        `http://localhost:8000/api/enquiry/fetchdeclineenquiry/${providerId}`
      );
      const bookingsWithDetails = await Promise.all(
        response.data.map(async (enquiry) => {
          const EnquiryDetails = await fetchEnquiryDetails(enquiry.enquiryId);
          const UserDetails = await fetchUserDetails(enquiry.userId);
          return {
            ...enquiry,
            EnquiryDetails,
            UserDetails,
          };
        })
      );
      setEnquiries(bookingsWithDetails);
    } catch (error) {
      console.error("Error fetching user bookings:", error);
    }
  };

  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: green[700],
    "&:hover": {
      backgroundColor: green[700],
    },
  }));

  const styles = {
    cancelBtn: {
      backgroundColor: "#bc000b",
      float: "Right",
      marginRight: "1rem",
    },
    cardOrders: {
      marginTop: "2rem",
      width: 750,
      paddingLeft: "2rem",
      paddingRight: "2rem",
      paddingTop: "1.5rem",
      paddingBottom: "1rem",
      alignItems: "center",
      borderRadius: "40px",
      boxShadow: "0 4px 8px rgba(0.1, 0.1, 0.1, 0.1)",
    },
    location: {
      display: "flex",
      alignItems: "center",
      marginTop: "0.5rem",
    },
    Rating: {
      display: "flex",
      alignItems: "center",
      marginTop: "0.5rem",
    },
    contact: {
      display: "flex",
      alignItems: "center",
    },
    gmail: {
      display: "flex",
      alignItems: "center",
    },
    statusimg: {
      borderRadius: "50%",
      maxWidth: "50px",
      maxHeight: "50px",
      objectFit: "cover",
    },
    acceptedBtn: {
      backgroundColor: green[500],
      margin: "0 0.6rem",
    },
  };

  const fetchEnquiryDetails = async (enquiryId) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/enquiry/getenquirydetail/${enquiryId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching service provider details:", error);
      return null;
    }
  };
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
    const fetchUserBookings = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/enquiry/fetchdeclineenquiry/${providerId}`
        );
        const bookingsWithDetails = await Promise.all(
          response.data.map(async (enquiry) => {
            // Fetch service provider details
            const EnquiryDetails = await fetchEnquiryDetails(enquiry.enquiryId);
            const UserDetails = await fetchUserDetails(enquiry.userId);
            return {
              ...enquiry,
              EnquiryDetails,
              UserDetails,
            };
          })
        );
        setEnquiries(bookingsWithDetails);
      } catch (error) {
        console.error("Error fetching user bookings:", error);
      }
    };

    fetchUserBookings();
  }, [providerId]);

  return (
    <Box sx={{ padding: "1rem 4rem" }}>
      <h2>Your Declined Enquiries</h2>
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
            marginTop: "2rem",
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
                  width: "43%",
                  border: "1px solid black",
                  borderRadius: "1rem",

                  transition: "0.5s",
                  ":hover": {
                    boxShadow: "5px 5px 5px",
                  },
                }}
              >
                {enquiry.EnquiryDetails && (
                  <Box style={{ padding: "0.5rem" }}>
                    <Box ml={1}>
                      <Box
                        mb={1}
                        variant="h5"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Box
                          style={{
                            fontWeight: "bold",
                            marginLeft: "0.5rem",
                            fontSize: "1.2rem",
                          }}
                        >
                          {" "}
                          {enquiry.UserDetails.fname}{" "}
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
                          <strong>Enquiry For : </strong>{" "}
                          {enquiry.EnquiryDetails.enquiry_for}
                        </Box>
                        <Box>
                          <strong>Reason of decline: </strong> {enquiry.reason}
                        </Box>
                        {/* <Box>
                      <strong>location : </strong>{" "}
                      {enquiry.EnquiryDetails.location}
                    </Box>
                    <Box>
                      <strong>address : </strong>{" "}
                      {enquiry.EnquiryDetails.address}
                    </Box>
                    <Box>
                      <strong>pincode : </strong>{" "}
                      {enquiry.EnquiryDetails.pincode}
                    </Box>
                    <Box>
                      <strong>mobile : </strong>{" "}
                      {enquiry.EnquiryDetails.mobile}
                    </Box>
                    <Box>
                      <strong>email : </strong>{" "}
                      {enquiry.EnquiryDetails.email}
                    </Box> */}
                      </Box>
                    </Box>

                    <Box
                      style={{
                        color: "gray",
                        float: "right",
                      }}
                      variant="h5"
                    >
                      {enquiry._id}
                    </Box>
                  </Box>
                )}
              </Box>
            ))}
        </ul>
      )}
    </Box>
  );
};

export default Tab3;
