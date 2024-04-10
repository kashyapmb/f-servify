// import {
//   Autocomplete,
//   Box,
//   Button,
//   FormControl,
//   FormHelperText,
//   InputLabel,
//   Select,
//   TextField,
// } from "@mui/material";
// import React, { useState } from "react";

// const CardPay = () => {
//   const [cardNo, setCardNo] = useState("");
//   const [cardHolderName, setCardHolderName] = useState("");
//   const [month, setMonth] = useState("");
//   const [year, setYear] = useState("");
//   const [cvv, setCvv] = useState("");
//   const [cvvError, setCvvError] = useState("");

//   const handleChange = (event, newValue) => {
//     setMonth(newValue);
//   };

//   const handleChangeYear = (event, newValue) => {
//     setYear(newValue);
//   };

//   const handlePayNow = () => {
//     // Perform payment logic here
//     console.log("Payment submitted");
//   };

//   const handleCvvChange = (event) => {
//     const value = event.target.value;
//     if (value.length <= 3) {
//       setCvv(value);
//       setCvvError("");
//     } else {
//       setCvvError("CVV must be 3 digits");
//     }
//   };

//   const isFormValid = () => {
//     return (
//       cardNo && cardHolderName && month && year && cvv.length === 3 && !cvvError
//     );
//   };

//   return (
//     <Box sx={{ padding: "1rem 3rem" }}>
//       <Box sx={{ backgroundColor: "#f2f7fb", padding: "1rem 2rem" }}>
//         <Box sx={{ backgroundColor: "white", padding: "2rem 5rem" }}>
//           <h2>Enter Card Details</h2>
//           <TextField
//             id="cardNo"
//             label="Enter Card No"
//             variant="outlined"
//             sx={{ marginTop: "2rem", width: "50%" }}
//             value={cardNo}
//             onChange={(e) => setCardNo(e.target.value)}
//           />
//           <br />
//           <TextField
//             id="cardHolderName"
//             label="Enter Card Holder Name"
//             variant="outlined"
//             sx={{ marginTop: "2rem", width: "50%" }}
//             value={cardHolderName}
//             onChange={(e) => setCardHolderName(e.target.value)}
//           />
//           <br />
//           <FormControl sx={{ marginTop: "2rem", width: "50%" }}>
//             <InputLabel id="month-label"></InputLabel>
//             <Autocomplete
//               value={month}
//               onChange={handleChange}
//               options={[
//                 "January",
//                 "February",
//                 "March",
//                 "April",
//                 "May",
//                 "June",
//                 "July",
//                 "August",
//                 "September",
//                 "October",
//                 "November",
//                 "December",
//               ]}
//               renderInput={(params) => <TextField {...params} label="Month" />}
//             />
//           </FormControl>
//           <br />
//           <FormControl sx={{ marginTop: "2rem", width: "50%" }}>
//             <InputLabel id="year-label"></InputLabel>
//             <Autocomplete
//               value={year}
//               onChange={handleChangeYear}
//               options={[...Array(17).keys()].map((yearOffset) => {
//                 const currentYear = new Date().getFullYear();
//                 return {
//                   label: currentYear + yearOffset,
//                   value: currentYear + yearOffset,
//                 };
//               })}
//               renderInput={(params) => <TextField {...params} label="Year" />}
//             />
//           </FormControl>
//           <br />
//           <TextField
//             id="cvv"
//             label="Enter 3 digit CVV"
//             variant="outlined"
//             sx={{ marginTop: "2rem", width: "50%" }}
//             value={cvv}
//             onChange={handleCvvChange}
//             error={!!cvvError}
//             helperText={cvvError}
//           />
//           <br />
//           <Button
//             variant="contained"
//             color="primary"
//             disabled={!isFormValid()}
//             onClick={handlePayNow}
//             sx={{ marginTop: "2rem" }}
//           >
//             Pay Now
//           </Button>
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default CardPay;

import React, { useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  InputLabel,
  TextField,
} from "@mui/material";

const CardPay = () => {
  const [cardNo, setCardNo] = useState("");
  const [cardHolderName, setCardHolderName] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [cvv, setCvv] = useState("");
  const [cvvError, setCvvError] = useState("");
  const [cardNoError, setCardNoError] = useState("");

  const handleChange = (event, newValue) => {
    setMonth(newValue);
  };

  const handleChangeYear = (event, newValue) => {
    setYear(newValue);
  };

  const handlePayNow = () => {
    // Perform payment logic here
    console.log("Payment submitted");
  };

  const handleCvvChange = (event) => {
    const value = event.target.value;
    if (value.length <= 3) {
      setCvv(value);
      setCvvError("");
    } else {
      setCvvError("CVV must be 3 digits");
    }
  };

  const handleCardNoChange = (event) => {
    const value = event.target.value;
    if (value.length <= 12) {
      setCardNo(value);
      setCardNoError("");
    } else {
      setCardNoError("Card number must be 12 digits");
    }
  };

  const isFormValid = () => {
    return (
      cardNo &&
      cardNo.length === 12 &&
      cardHolderName &&
      month &&
      year &&
      cvv.length === 3 &&
      !cvvError &&
      !cardNoError
    );
  };

  return (
    <Box sx={{ padding: "1rem 3rem" }}>
      <Box sx={{ backgroundColor: "#f2f7fb", padding: "2rem 2rem" }}>
        <Box sx={{ backgroundColor: "white", padding: "2rem 5rem" }}>
          <h2>Enter Card Details</h2>
          <TextField
            id="cardNo"
            label="Enter Card No"
            variant="outlined"
            sx={{ marginTop: "2rem", width: "50%" }}
            value={cardNo}
            onChange={handleCardNoChange}
            error={!!cardNoError}
            helperText={cardNoError}
          />

          <br />
          <TextField
            id="cardHolderName"
            label="Enter Card Holder Name"
            variant="outlined"
            sx={{ marginTop: "2rem", width: "50%" }}
            value={cardHolderName}
            onChange={(e) => setCardHolderName(e.target.value)}
          />
          <br />
          <FormControl sx={{ marginTop: "2rem", width: "50%" }}>
            <InputLabel id="month-label"></InputLabel>
            <Autocomplete
              value={month}
              onChange={handleChange}
              options={[
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
              ]}
              renderInput={(params) => <TextField {...params} label="Month" />}
            />
          </FormControl>
          <br />
          <FormControl sx={{ marginTop: "2rem", width: "50%" }}>
            <InputLabel id="year-label"></InputLabel>
            <Autocomplete
              value={year}
              onChange={handleChangeYear}
              options={[...Array(17).keys()].map((yearOffset) => {
                const currentYear = new Date().getFullYear();
                return {
                  label: currentYear + yearOffset,
                  value: currentYear + yearOffset,
                };
              })}
              renderInput={(params) => <TextField {...params} label="Year" />}
            />
          </FormControl>
          <br />
          <TextField
            id="cvv"
            label="Enter 3 digit CVV"
            variant="outlined"
            sx={{ marginTop: "2rem", width: "50%" }}
            value={cvv}
            onChange={handleCvvChange}
            error={!!cvvError}
            helperText={cvvError}
          />
          <br />
          <Button
            variant="contained"
            color="primary"
            disabled={!isFormValid()}
            onClick={handlePayNow}
            sx={{ marginTop: "2rem" }}
          >
            Pay Now
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default CardPay;
