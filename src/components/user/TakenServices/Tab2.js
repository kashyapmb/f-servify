import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import { Card, Typography, Avatar, Box, Rating } from "@mui/material";
import { FaStar } from "react-icons/fa";

import { IoLocationSharp } from "react-icons/io5";
// import { IoLogoWhatsapp } from "react-icons/io";
import { FaWhatsapp } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMailOpen } from "react-icons/io5";
import { purple, green } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import FilterDialog from "./FilterDialog";

const Tab2 = () => {
  const userId = localStorage.getItem("userId");
  const [enquiries, setEnquiries] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleFilterClick = () => {
    setIsDialogOpen(true);
  };

  const handleFilterApply = async (startDate, endDate) => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/filter/filtercanceluser/${userId}`,
        {
          startDate: startDate.format("YYYY-MM-DD"),
          endDate: endDate.format("YYYY-MM-DD"),
        }
      );
      const bookingsWithDetails = await Promise.all(
        response.data.map(async (enquiry) => {
          // Fetch service provider details
          const serviceProviderDetails = await fetchServiceProviderDetails(
            enquiry.providerId
          );
          const paymentInfo = await fetchPaymentInfo(enquiry.providerId);

          return {
            ...enquiry,
            serviceProviderDetails,
            paymentInfo,
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
        `http://localhost:8000/api/enquiry/fetchcanceledenquiry/${userId}`
      );
      const bookingsWithDetails = await Promise.all(
        response.data.map(async (enquiry) => {
          // Fetch service provider details
          const serviceProviderDetails = await fetchServiceProviderDetails(
            enquiry.providerId
          );
          const paymentInfo = await fetchPaymentInfo(enquiry.providerId);

          return {
            ...enquiry,
            serviceProviderDetails,
            paymentInfo,
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

  const handleChat = (mobileNumber) => {
    window.open(`whatsapp://send?phone=${mobileNumber}`);
  };
  const handleCall = (mobileNumber) => {
    window.location.href = `tel:${mobileNumber}`;
  };

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
  };

  const fetchServiceProviderDetails = async (providerId) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/provider/getone/${providerId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching service provider details:", error);
      return null;
    }
  };
  const fetchPaymentInfo = async (providerId) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/payment/getpaymentinfo/${providerId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching payment info:", error);
      return null;
    }
  };

  useEffect(() => {
    const fetchUserBookings = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/enquiry/fetchcanceledenquiry/${userId}`
        );
        const bookingsWithDetails = await Promise.all(
          response.data.map(async (enquiry) => {
            // Fetch service provider details
            const serviceProviderDetails = await fetchServiceProviderDetails(
              enquiry.providerId
            );
            const paymentInfo = await fetchPaymentInfo(enquiry.providerId);

            return {
              ...enquiry,
              serviceProviderDetails,
              paymentInfo,
            };
          })
        );
        setEnquiries(bookingsWithDetails);
      } catch (error) {
        console.error("Error fetching user bookings:", error);
      }
    };

    // Function to check cancellation status

    fetchUserBookings();
  }, [userId]);

  return (
    <Box sx={{ padding: "1rem 4rem" }}>
      <h2>Your cancelled Enquiries</h2>
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
                sx={{
                  padding: "1rem",
                  width: "43%",
                  border: "1px solid black",
                  borderRadius: "1rem",
                  marginTop: "4rem",
                  transition: "0.5s",
                  ":hover": {
                    boxShadow: "5px 5px 5px",
                  },
                }}
                key={enquiry._id}
              >
                {enquiry.serviceProviderDetails && (
                  <Box style={{ padding: "1rem" }}>
                    <Box
                      classname="name-profileimg"
                      style={{ display: "flex" }}
                    >
                      <Box>
                        <img
                          src={enquiry.serviceProviderDetails.profilePhoto}
                          style={{
                            width: "6rem",
                            height: "6rem",
                            border: "1px solid black",
                            borderRadius: "1rem",
                          }}
                        />
                      </Box>
                      <Box ml={1}>
                        <Box sx={{ display: "flex" }}>
                          <Box
                            variant="h5"
                            style={{
                              fontWeight: "bold",
                              marginLeft: "0.5rem",
                              fontSize: "1.2rem",
                            }}
                          >
                            {enquiry.serviceProviderDetails.fname}{" "}
                            {enquiry.serviceProviderDetails.lname}
                          </Box>
                          <img
                            src="/images/plan4.svg"
                            style={{
                              width: "4rem",
                              height: "4rem",
                              marginLeft: "1.5rem",
                              marginBottom: "-1rem",
                              marginTop: "-1.1rem",
                            }}
                          />
                          {enquiry.paymentInfo.payment === "done" &&
                          enquiry.paymentInfo.plan === "pro" ? (
                            <img
                              src="/images/plan3.svg"
                              style={{
                                width: "4rem",
                                height: "4rem",
                                marginLeft: "1.5rem",
                                marginBottom: "-1rem",
                                marginTop: "-1.1rem",
                              }}
                            />
                          ) : (
                            <Box></Box>
                          )}
                        </Box>
                        <Box className="rating" ml={1} style={styles.Rating}>
                          <span
                            style={{
                              backgroundColor:
                                enquiry.serviceProviderDetails.overallRating >=
                                4
                                  ? "green"
                                  : enquiry.serviceProviderDetails
                                      .overallRating >= 3
                                  ? "#388e3c"
                                  : enquiry.serviceProviderDetails
                                      .overallRating >= 2
                                  ? "#fbc02d"
                                  : "#d32f2f",
                              borderRadius: "0.3rem",
                              padding: "0.1rem 0.3rem",
                              color: "#ffffff",
                              marginRight: "0.6rem",
                            }}
                          >
                            {enquiry.serviceProviderDetails.overallRating}
                            <span
                              style={{
                                marginLeft: "0.2rem",
                                verticalAlign: "middle",
                              }}
                            >
                              <FaStar />
                            </span>
                          </span>
                          <Rating
                            value={enquiry.serviceProviderDetails.overallRating}
                            precision={0.5}
                            readOnly
                          />
                        </Box>
                        <Box className="location" style={styles.location}>
                          <IoLocationSharp color="#2962ff" size="1.8rem" />

                          <Box
                            style={{ marginLeft: "0.5rem" }}
                          >{`  ${enquiry.serviceProviderDetails.location} , ${enquiry.serviceProviderDetails.city} `}</Box>
                        </Box>
                      </Box>
                    </Box>
                    <Box
                      mt={1.5}
                      classname="contactdetail"
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Button
                        className="contact"
                        variant="contained"
                        color="primary"
                        onClick={() =>
                          handleCall(enquiry.serviceProviderDetails.mobile)
                        }
                      >
                        <FaPhoneAlt color="#ffffff" size="1.3rem" />
                        <Box
                          style={{ marginLeft: "0.5rem" }}
                        >{`  ${enquiry.serviceProviderDetails.mobile} `}</Box>
                      </Button>

                      <ColorButton
                        className="contact"
                        variant="contained"
                        color="primary"
                        onClick={() =>
                          handleChat(enquiry.serviceProviderDetails.mobile)
                        }
                        style={{ marginLeft: "2rem" }}
                      >
                        <FaWhatsapp color="#ffffff" size="1.3rem" />
                        <Box style={{ marginLeft: "0.5rem" }}>chat</Box>
                      </ColorButton>
                    </Box>
                    <Box style={{ display: "flex", alignItems: "center" }}>
                      <Box mt={1.5} variant="body1">
                        <strong>Enquiry Status: </strong> {enquiry.estatus}
                      </Box>
                    </Box>
                    <Box style={{ display: "flex", alignItems: "center" }}>
                      <Box mt={1.5} variant="body1">
                        <strong>Reason of cancellation: </strong>{" "}
                        {enquiry.reason}
                      </Box>
                    </Box>

                    <Box
                      style={{
                        color: "gray",
                        marginTop: "2rem",
                      }}
                      variant="h5"
                    >
                      {enquiry.created}
                    </Box>
                    <Box
                      style={{
                        color: "gray",
                        marginTop: "0.5rem",
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

export default Tab2;
