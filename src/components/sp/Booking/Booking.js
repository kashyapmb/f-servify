// import React, { useState, useEffect } from "react";
// import CardActions from "@mui/material/CardActions";
// import Button from "@mui/material/Button";
// import {
//   Card,
//   CardContent,
//   Typography,
//   Avatar,
//   Container,
//   Box,
// } from "@mui/material";
// import { pink, blue, green } from "@mui/material/colors";
// import axios from "axios";

// const checkBookingAccepted = (booking) => booking.estatus === "enquiry done";

// const isBookingDeclined = (booking) => booking.estatus === "decline enquiry";

// const Booking = () => {
//   const [enquiries, setEnquiries] = useState([]);
//   const providerId = "65ef0f67de93a74483105234";

//   useEffect(() => {
//     // Fetch bookings from your API when the component mounts
//     const fetchEnquiries = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:8000/api/enquiry/fetchenquiry/${providerId}`
//         );
//         console.log("Enquiries response:", response.data);
//         // console.log("Bookings response:", response.data);
//         // const bookingsWithUserDetails = await Promise.all(
//         //   response.data.map(async (enquiry) => {
//         //     const userResponse = await axios.get(
//         //       `http://localhost:8000/api/user/getone/${enquiry.userId}`
//         //     );

//         //     return { ...enquiry, userDetails: userResponse.data };
//         //   })
//         // );

//         // setEnquiries(bookingsWithUserDetails);
//         setEnquiries(response.data);
//       } catch (error) {
//         console.error("Error fetching bookings:", error);
//       }
//     };

//     fetchEnquiries();
//   }, []); // Empty dependency array to run the effect only once

//   const handleAccept = async (enquiryId) => {
//     try {
//       // Make API call to accept booking
//       await axios.put(
//         `http://localhost:8000/api/enquiry/enquirydone/${enquiryId}`
//       );
//       // Update local state to reflect the change
//       setEnquiries((prevEnquiries) =>
//         prevEnquiries.map((enquiry) =>
//           enquiry._id === enquiryId
//             ? { ...enquiry, estatus: "enquiry done" }
//             : enquiry
//         )
//       );
//     } catch (error) {
//       console.error("Error accepting booking:", error);
//     }
//   };

//   const handleDecline = async (enquiryId) => {
//     try {
//       // Make API call to decline booking
//       await axios.put(
//         `http://localhost:8000/api/enquiry/declineenquiry/${enquiryId}`
//       );

//       // Update local state to reflect the change
//       setEnquiries((prevEnquiries) =>
//         prevEnquiries.map((enquiry) =>
//           enquiry._id === enquiryId
//             ? {
//                 ...enquiry,
//                 estatus: "decline enquiry",
//               }
//             : enquiry
//         )
//       );
//     } catch (error) {
//       console.error("Error declining booking:", error);
//     }
//   };

//   const styles = {
//     declineBtn: {
//       backgroundColor: "#bc000b",
//     },
//     acceptBtn: {
//       backgroundColor: blue[500],
//       margin: "0 0.6rem",
//     },
//     acceptedBtn: {
//       backgroundColor: green[500],
//       margin: "0 0.6rem",
//     },
//     cancelledCard: {
//       filter: "blur(2px)",
//       opacity: 0.7,
//       border: "2px solid red",
//     },
//   };

//   const renderBookingCard = (enquiry) => {
//     const isBookingCancelled = enquiry.estatus === "cancel enquiry";
//     const isAccepted = checkBookingAccepted(enquiry);

//     return (
//       !isBookingDeclined(enquiry) && (
//         <Box
//           sx={{
//             padding: "1rem",
//             width: "40%",
//             border: "1px solid black",
//             borderRadius: "1rem",
//             marginTop: "2rem",
//             transition: "0.5s",
//             ":hover": {
//               boxShadow: "5px 5px 5px",
//             },
//           }}
//           className={`cardOrders ${isBookingCancelled ? "cancelled" : ""}`}
//           style={{
//             ...styles.cardOrders,
//             ...(isBookingCancelled ? styles.cancelledCard : {}),
//           }}
//           key={enquiry._id}
//         >
//           <div style={{ padding: "0.5rem" }}>
//             <Box
//               classname="info"
//               sx={{
//                 margin: "0 1rem",
//                 display: "flex",
//                 flexDirection: "column",
//                 gap: "0.3rem",
//               }}
//             >
//               <Box sx={{ fontSize: "1.1rem" }}>
//                 <h4> {enquiry.enquiry_for}</h4>
//               </Box>
//               <Box
//                 sx={{ display: "flex", alignItems: "center", gap: "0.8rem" }}
//               >
//                 <Box sx={{ fontSize: "0.8rem" }}>
//                   <div>
//                     {enquiry.address}, {enquiry.location}
//                   </div>
//                 </Box>
//                 <Box sx={{ fontSize: "0.8rem" }}>
//                   <div>{enquiry.created}</div>
//                 </Box>
//               </Box>
//               <hr />
//               <Box sx={{ fontSize: "1.1rem" }}>
//                 User info
//                 <h4> {enquiry.fname}</h4>
//               </Box>
//               <Box sx={{ fontSize: "1.1rem" }}>{enquiry.mobile}</Box>
//               <Box sx={{ fontSize: "1.1rem" }}>{enquiry.email}</Box>
//             </Box>
//             <CardActions>
//               {!isAccepted && (
//                 <>
//                   <Button
//                     style={styles.acceptBtn}
//                     className="acceptbtn"
//                     variant="contained"
//                     color="primary"
//                     onClick={() => handleAccept(enquiry._id)}
//                     disabled={isBookingCancelled}
//                   >
//                     Do Enquiry
//                   </Button>
//                   <Button
//                     style={styles.declineBtn}
//                     className="declinebtn"
//                     variant="contained"
//                     onClick={() => handleDecline(enquiry._id)}
//                     disabled={isBookingCancelled}
//                   >
//                     Decline
//                   </Button>
//                 </>
//               )}
//               {isAccepted && (
//                 <Button
//                   style={styles.acceptedBtn}
//                   className="acceptedBtn"
//                   variant="contained"
//                   color="primary"
//                   disabled
//                 >
//                   Enquiry Done
//                 </Button>
//               )}
//             </CardActions>
//           </div>
//         </Box>
//       )
//     );
//   };

//   return (
//     <Box sx={{ ml: "10rem", display: "flex", flexWrap: "wrap", gap: "2rem" }}>
//       {enquiries
//         .slice()
//         .reverse()
//         .map((enquiry) => renderBookingCard(enquiry))}
//     </Box>
//   );
// };

// export default Booking;

import React from "react";
import { Box, Tab, Tabs } from "@mui/material";
import Tab1 from "./Tab1";
import Tab2 from "./Tab2";
import Tab3 from "./Tab3";
import Tab4 from "./Tab4";
import Header from "../Header";

const Booking = () => {
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
          <Tab label="Done enquiries" />
          <Tab label="decline enquiries" />
          <Tab label="cancel enquiries" />
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

export default Booking;
