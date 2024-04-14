// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Button from "@mui/material/Button";
// import { Card, Typography, Avatar, Box, Rating } from "@mui/material";
// import { FaStar } from "react-icons/fa";

// import { IoLocationSharp } from "react-icons/io5";
// // import { IoLogoWhatsapp } from "react-icons/io";
// import { FaWhatsapp } from "react-icons/fa";
// import { FaPhoneAlt } from "react-icons/fa";
// import { IoMailOpen } from "react-icons/io5";
// import { purple, green } from "@mui/material/colors";
// import { styled } from "@mui/material/styles";

// const TakenService = () => {
//   const userId = localStorage.getItem("userId");
//   const [enquiries, setEnquiries] = useState([]);

//   const ColorButton = styled(Button)(({ theme }) => ({
//     color: theme.palette.getContrastText(purple[500]),
//     backgroundColor: green[700],
//     "&:hover": {
//       backgroundColor: green[700],
//     },
//   }));

//   const styles = {
//     cancelBtn: {
//       backgroundColor: "#bc000b",
//       float: "Right",
//       marginRight: "1rem",
//     },
//     cardOrders: {
//       marginTop: "2rem",
//       width: 750,
//       paddingLeft: "2rem",
//       paddingRight: "2rem",
//       paddingTop: "1.5rem",
//       paddingBottom: "1rem",
//       alignItems: "center",
//       borderRadius: "40px",
//       boxShadow: "0 4px 8px rgba(0.1, 0.1, 0.1, 0.1)",
//     },
//     location: {
//       display: "flex",
//       alignItems: "center",
//       marginTop: "0.5rem",
//     },
//     Rating: {
//       display: "flex",
//       alignItems: "center",
//       marginTop: "0.5rem",
//     },
//     contact: {
//       display: "flex",
//       alignItems: "center",
//     },
//     gmail: {
//       display: "flex",
//       alignItems: "center",
//     },
//     statusimg: {
//       borderRadius: "50%",
//       maxWidth: "50px",
//       maxHeight: "50px",
//       objectFit: "cover",
//     },
//   };

//   const fetchServiceProviderDetails = async (providerId) => {
//     try {
//       const response = await axios.get(
//         `http://localhost:8000/api/provider/getone/${providerId}`
//       );
//       return response.data;
//     } catch (error) {
//       console.error("Error fetching service provider details:", error);
//       return null;
//     }
//   };

//   const cancelBooking = async (enquiryId) => {
//     try {
//       // Make the API call to cancel the booking
//       await axios.put(
//         `http://localhost:8000/api/enquiry/cancelenquiry/${enquiryId}`
//       );

//       // Update the local state to mark the booking as canceled
//       setEnquiries((prevEnquiries) =>
//         prevEnquiries.map((enquiry) =>
//           enquiry._id === enquiryId
//             ? { ...enquiry, estatus: "cancel enquiry" }
//             : enquiry
//         )
//       );

//       console.log(`enquiry ID ${enquiryId} canceled successfully`);
//     } catch (error) {
//       console.error("Error canceling enquiry:", error);
//     }
//   };

//   useEffect(() => {
//     const fetchUserBookings = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:8000/api/enquiry/fetchenquiryuser/${userId}`
//         );
//         const bookingsWithDetails = await Promise.all(
//           response.data.map(async (enquiry) => {
//             // Fetch service provider details
//             const serviceProviderDetails = await fetchServiceProviderDetails(
//               enquiry.providerId
//             );

//             return {
//               ...enquiry,
//               serviceProviderDetails,
//               // Add a new property to track cancellation status
//               isCanceled: await checkCancellation(enquiry._id),
//             };
//           })
//         );
//         setEnquiries(bookingsWithDetails);
//       } catch (error) {
//         console.error("Error fetching user bookings:", error);
//       }
//     };

//     // Function to check cancellation status
//     const checkCancellation = async (enquiryId) => {
//       try {
//         const response = await fetch(
//           `http://localhost:8000/api/enquiry/checkcancellation/${enquiryId}`
//         );
//         const data = await response.json();
//         return !data.canceled; // Invert the value because we want isCanceled to be true if canceled is false
//       } catch (error) {
//         console.error("Error checking cancellation status:", error);
//         return false;
//       }
//     };

//     fetchUserBookings();
//   }, [userId]);

//   return (
//     <div>
//       <h1>Your Enquiries</h1>
//       <ul>
//         {enquiries.map((enquiry) => (
//           <Box
//             sx={{
//               padding: "1rem",
//               width: "40%",
//               border: "1px solid black",
//               borderRadius: "1rem",
//               marginTop: "2rem",
//               transition: "0.5s",
//               ":hover": {
//                 boxShadow: "5px 5px 5px",
//               },
//             }}
//             key={enquiry._id}
//           >
//             {enquiry.serviceProviderDetails && (
//               <Box style={{ padding: "1rem" }}>
//                 <Box classname="name-profileimg" style={{ display: "flex" }}>
//                   <Box>
//                     <img
//                       src={enquiry.serviceProviderDetails.profilePhoto}
//                       style={{
//                         width: "6rem",
//                         height: "6rem",
//                         border: "1px solid black",
//                         borderRadius: "1rem",
//                       }}
//                     />
//                   </Box>
//                   <Box ml={1}>
//                     <Box
//                       variant="h5"
//                       style={{
//                         fontWeight: "bold",
//                         marginLeft: "0.5rem",
//                         fontSize: "1.2rem",
//                       }}
//                     >
//                       {enquiry.serviceProviderDetails.fname}{" "}
//                       {enquiry.serviceProviderDetails.lname}
//                     </Box>
//                     <Box className="rating" ml={1} style={styles.Rating}>
//                       <span
//                         style={{
//                           backgroundColor:
//                             enquiry.serviceProviderDetails.overallRating >= 4
//                               ? "green"
//                               : enquiry.serviceProviderDetails.overallRating >=
//                                 3
//                               ? "#388e3c"
//                               : enquiry.serviceProviderDetails.overallRating >=
//                                 2
//                               ? "#fbc02d"
//                               : "#d32f2f",
//                           borderRadius: "0.3rem",
//                           padding: "0.1rem 0.3rem",
//                           color: "#ffffff",
//                           marginRight: "0.6rem",
//                         }}
//                       >
//                         {enquiry.serviceProviderDetails.overallRating}
//                         <span
//                           style={{
//                             marginLeft: "0.2rem",
//                             verticalAlign: "middle",
//                           }}
//                         >
//                           <FaStar />
//                         </span>
//                       </span>
//                       <Rating
//                         value={enquiry.serviceProviderDetails.overallRating}
//                         precision={0.5}
//                         readOnly
//                       />
//                     </Box>
//                     <Box className="location" style={styles.location}>
//                       <IoLocationSharp color="#2962ff" size="1.8rem" />

//                       <Box
//                         style={{ marginLeft: "0.5rem" }}
//                       >{`  ${enquiry.serviceProviderDetails.location} , ${enquiry.serviceProviderDetails.city} `}</Box>
//                     </Box>
//                   </Box>
//                 </Box>
//                 <Box
//                   mt={1.5}
//                   classname="contactdetail"
//                   style={{
//                     display: "flex",
//                     alignItems: "center",
//                   }}
//                 >
//                   <Button
//                     className="contact"
//                     variant="contained"
//                     color="primary"
//                   >
//                     <FaPhoneAlt color="#ffffff" size="1.3rem" />
//                     <Box
//                       style={{ marginLeft: "0.5rem" }}
//                     >{`  ${enquiry.serviceProviderDetails.mobile} `}</Box>
//                   </Button>

//                   <ColorButton
//                     className="contact"
//                     variant="contained"
//                     color="primary"
//                     style={{ marginLeft: "2rem" }}
//                   >
//                     <FaWhatsapp color="#ffffff" size="1.3rem" />
//                     <Box style={{ marginLeft: "0.5rem" }}>chat</Box>
//                   </ColorButton>
//                 </Box>
//                 <Box style={{ display: "flex", alignItems: "center" }}>
//                   <Box mt={1.5} variant="body1">
//                     <strong>Enquiry Status: </strong> {enquiry.estatus}
//                   </Box>
//                 </Box>
//                 <Box>
//                   {enquiry.estatus === "enquired" && (
//                     <Button
//                       style={styles.cancelBtn}
//                       variant="contained"
//                       color="secondary"
//                       onClick={() => cancelBooking(enquiry._id)}
//                     >
//                       Cancel
//                     </Button>
//                   )}
//                 </Box>
//                 <Box
//                   style={{
//                     color: "gray",
//                     marginTop: "2rem",
//                   }}
//                   variant="h5"
//                 >
//                   {enquiry.created}
//                 </Box>
//               </Box>
//             )}
//           </Box>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default TakenService;

import React from "react";
import { Box, Tab, Tabs } from "@mui/material";
import Tab1 from "./Tab1";
import Tab2 from "./Tab2";
import Tab3 from "./Tab3";
import Tab4 from "./Tab4";
import Header from "../Header";
const TakenService = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Header />
      <Box
        sx={{
          p: "0.3rem 0.3rem",
          borderRadius: "1rem",
          margin: "1rem",

          /* From https://css.glass */
          background: "rgba(255, 255, 255, 0.18)",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(8.6px)",

          border: "1px solid white",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="Tabs example"
          centered
          style={{
            background: "#e4f5fc",
            padding: "0rem",
            width: "100%",
            borderRadius: "1rem 1rem 0 0",
            marginBottom: "1rem",
          }}
        >
          <Tab label="your Enquiries" />
          <Tab label="canceled enquiries" />
          <Tab label="decline enquiries" />
          <Tab label="done enquiries" />
        </Tabs>
        {value === 0 && (
          <div role="tabpanel" hidden={value !== 0}>
            <Tab1 />
          </div>
        )}
        {value === 1 && (
          <div role="tabpanel" hidden={value !== 1}>
            <Tab2 />
          </div>
        )}
        {value === 2 && (
          <div role="tabpanel" hidden={value !== 2}>
            <Tab3 />
          </div>
        )}
        {value === 3 && (
          <div role="tabpanel" hidden={value !== 3}>
            <Tab4 />
          </div>
        )}
      </Box>
    </>
  );
};

export default TakenService;
