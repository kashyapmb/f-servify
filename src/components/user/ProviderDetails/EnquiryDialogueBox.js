// import React, { useState } from "react";
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   TextField,
//   Button,
// } from "@mui/material";
// import axios from "axios";

// const EnquiryDialogueBox = ({
//   open,
//   handleClose,
//   handleSubmit,
//   userId,
//   providerId,
// }) => {
//   const [formData, setFormData] = useState({
//     enquiry_for: "",
//     pincode: "",
//     state: "",
//     city: "",
//     address: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   const handleFormSubmit = async () => {
//     try {
//       const response = await axios.post(
//         "http://localhost:8000/api/enquiry/createenquiry",
//         {
//           userId: userId, // You may get this dynamically
//           providerId: providerId, // You may get this dynamically
//           ...formData,
//         }
//       );

//       console.log("Enquiry created:", response.data);

//       handleClose();
//     } catch (error) {
//       console.error("Error creating enquiry:", error);
//     }
//   };

//   return (
//     <Dialog open={open} onClose={handleClose}>
//       <DialogTitle>Enquiry Information</DialogTitle>
//       <DialogContent>
//         <TextField
//           sx={{ marginTop: "1rem" }}
//           label="Enquiry For"
//           name="enquiry_for"
//           value={formData.enquiry_for}
//           onChange={handleChange}
//           fullWidth
//         />
//         <TextField
//           sx={{ marginTop: "1rem" }}
//           label="Pincode"
//           name="pincode"
//           value={formData.pincode}
//           onChange={handleChange}
//           fullWidth
//         />
//         <TextField
//           sx={{ marginTop: "1rem" }}
//           label="State"
//           name="state"
//           value={formData.state}
//           onChange={handleChange}
//           fullWidth
//         />
//         <TextField
//           sx={{ marginTop: "1rem" }}
//           label="City"
//           name="city"
//           value={formData.city}
//           onChange={handleChange}
//           fullWidth
//         />

//         <TextField
//           sx={{ marginTop: "1rem" }}
//           label="Address"
//           name="address"
//           value={formData.address}
//           onChange={handleChange}
//           fullWidth
//         />

//         <Button
//           sx={{ marginTop: "1rem", float: "right" }}
//           onClick={handleFormSubmit}
//           variant="contained"
//           color="primary"
//         >
//           Submit
//         </Button>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default EnquiryDialogueBox;

//try2

// import React, { useState } from "react";
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   TextField,
//   Button,
// } from "@mui/material";
// import axios from "axios";

// const EnquiryDialogueBox = ({
//   open,
//   handleClose,
//   handleSubmit,
//   userId,
//   providerId,
// }) => {
//   const [formData, setFormData] = useState({
//     enquiry_for: "",
//     pincode: "",
//     state: "",
//     city: "",
//     address: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   const handleFormSubmit = async () => {
//     try {
//       const response = await axios.get(
//         `https://api.postalpincode.in/pincode/${formData.pincode}`
//       );

//       if (response.data && response.data[0].Status === "Success") {
//         const { State, District } = response.data[0].PostOffice[0];
//         setFormData((prevData) => ({
//           ...prevData,
//           state: State,
//           city: District,
//         }));

//         // Proceed with form submission only after state and city are set
//         const submissionResponse = await axios.post(
//           "http://localhost:8000/api/enquiry/createenquiry",
//           {
//             userId: userId,
//             providerId: providerId,
//             ...formData,
//             state: State,
//             city: District,
//           }
//         );

//         console.log("Enquiry created:", submissionResponse.data);
//         handleClose();
//       } else {
//         // If pincode is incorrect, show alert
//         alert("Incorrect pincode");
//       }
//     } catch (error) {
//       console.error("Error creating enquiry:", error);
//     }
//   };

//   return (
//     <Dialog open={open} onClose={handleClose}>
//       <DialogTitle>Enquiry Information</DialogTitle>
//       <DialogContent>
//         <TextField
//           sx={{ marginTop: "1rem" }}
//           label="Enquiry For"
//           name="enquiry_for"
//           value={formData.enquiry_for}
//           onChange={handleChange}
//           fullWidth
//         />
//         <TextField
//           sx={{ marginTop: "1rem" }}
//           label="Pincode"
//           name="pincode"
//           value={formData.pincode}
//           onChange={handleChange}
//           fullWidth
//         />
//         <TextField
//           sx={{ marginTop: "1rem" }}
//           label="State"
//           name="state"
//           value={formData.state}
//           onChange={handleChange}
//           fullWidth
//         />
//         <TextField
//           sx={{ marginTop: "1rem" }}
//           label="City"
//           name="city"
//           value={formData.city}
//           onChange={handleChange}
//           fullWidth
//         />

//         <TextField
//           sx={{ marginTop: "1rem" }}
//           label="Address"
//           name="address"
//           value={formData.address}
//           onChange={handleChange}
//           fullWidth
//         />

//         <Button
//           sx={{ marginTop: "1rem", float: "right" }}
//           onClick={handleFormSubmit}
//           variant="contained"
//           color="primary"
//         >
//           Submit
//         </Button>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default EnquiryDialogueBox;

//best
// import React, { useState } from "react";
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   TextField,
//   Button,
// } from "@mui/material";
// import axios from "axios";

// const EnquiryDialogueBox = ({
//   open,
//   handleClose,
//   handleSubmit,
//   userId,
//   providerId,
// }) => {
//   const [formData, setFormData] = useState({
//     enquiry_for: "",
//     pincode: "",
//     state: "",
//     city: "",
//     address: "",
//   });

//   const handleChange = async (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({ ...prevData, [name]: value }));

//     if (name === "pincode" && value.length === 6) {
//       try {
//         const response = await axios.get(
//           `https://api.postalpincode.in/pincode/${value}`
//         );

//         if (response.data && response.data[0].Status === "Success") {
//           const { State, District } = response.data[0].PostOffice[0];
//           setFormData((prevData) => ({
//             ...prevData,
//             state: State,
//             city: District,
//           }));
//         } else {
//           setFormData((prevData) => ({
//             ...prevData,
//             state: "",
//             city: "",
//           }));
//           alert("Record not found for this pincode.");
//         }
//       } catch (error) {
//         console.error("Error fetching state and city:", error);
//       }
//     }
//   };

//   const handleFormSubmit = async () => {
//     if (
//       formData.enquiry_for.trim() === "" ||
//       formData.pincode.trim() === "" ||
//       formData.state.trim() === "" ||
//       formData.city.trim() === "" ||
//       formData.address.trim() === ""
//     ) {
//       alert("All fields are required");
//       return;
//     }

//     if (formData.enquiry_for.length > 200) {
//       alert("Enquiry For should not exceed 200 characters");
//       return;
//     }

//     if (formData.pincode.length !== 6) {
//       alert("Incorrect pincode. Pincode should be 6 characters long.");
//       return;
//     }

//     try {
//       const submissionResponse = await axios.post(
//         "http://localhost:8000/api/enquiry/createenquiry",
//         {
//           userId: userId,
//           providerId: providerId,
//           ...formData,
//         }
//       );

//       console.log("Enquiry created:", submissionResponse.data);
//       handleClose();
//     } catch (error) {
//       console.error("Error creating enquiry:", error);
//     }
//   };

//   return (
//     <Dialog open={open} onClose={handleClose}>
//       <DialogTitle>Enquiry Information</DialogTitle>
//       <DialogContent>
//         <TextField
//           sx={{ marginTop: "1rem" }}
//           label="Enquiry For"
//           name="enquiry_for"
//           value={formData.enquiry_for}
//           onChange={handleChange}
//           fullWidth
//           required
//           inputProps={{ maxLength: 200 }}
//         />
//         <TextField
//           sx={{ marginTop: "1rem" }}
//           label="Pincode"
//           name="pincode"
//           value={formData.pincode}
//           onChange={handleChange}
//           fullWidth
//           required
//         />
//         <TextField
//           sx={{ marginTop: "1rem" }}
//           label="State"
//           name="state"
//           value={formData.state}
//           InputProps={{ readOnly: true }}
//           fullWidth
//           required
//         />
//         <TextField
//           sx={{ marginTop: "1rem" }}
//           label="City"
//           name="city"
//           value={formData.city}
//           InputProps={{ readOnly: true }}
//           fullWidth
//           required
//         />

//         <TextField
//           sx={{ marginTop: "1rem" }}
//           label="Address"
//           name="address"
//           value={formData.address}
//           onChange={handleChange}
//           fullWidth
//           required
//         />

//         <Button
//           sx={{ marginTop: "1rem", float: "right" }}
//           onClick={handleFormSubmit}
//           variant="contained"
//           color="primary"
//         >
//           Submit
//         </Button>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default EnquiryDialogueBox;

import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
} from "@mui/material";
import axios from "axios";

const EnquiryDialogueBox = ({
  open,
  handleClose,
  handleSubmit,
  userId,
  providerId,
}) => {
  const [formData, setFormData] = useState({
    enquiry_for: "",
    pincode: "",
    state: "",
    city: "",
    address: "",
  });

  const [errors, setErrors] = useState({
    enquiry_for: "",
    pincode: "",
  });

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    if (name === "pincode") {
      if (value.trim() === "") {
        setErrors((prevErrors) => ({
          ...prevErrors,
          pincode: "Pincode is required",
        }));
      } else if (value.length !== 6) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          pincode: "Incorrect pincode. Pincode should be 6 characters long.",
        }));
      } else {
        try {
          const response = await axios.get(
            `https://api.postalpincode.in/pincode/${value}`
          );

          if (response.data && response.data[0].Status === "Success") {
            const { State, District } = response.data[0].PostOffice[0];
            setFormData((prevData) => ({
              ...prevData,
              state: State,
              city: District,
            }));
            setErrors((prevErrors) => ({
              ...prevErrors,
              pincode: "",
            }));
          } else {
            setFormData((prevData) => ({
              ...prevData,
              state: "",
              city: "",
            }));
            setErrors((prevErrors) => ({
              ...prevErrors,
              pincode: "Record not found for this pincode.",
            }));
          }
        } catch (error) {
          console.error("Error fetching state and city:", error);
        }
      }
    }
  };

  const handleFormSubmit = async () => {
    let formValid = true;
    const newErrors = { ...errors };

    if (formData.enquiry_for.trim() === "") {
      newErrors.enquiry_for = "Enquiry For is required";
      formValid = false;
    } else if (formData.enquiry_for.length > 200) {
      newErrors.enquiry_for = "Enquiry For should not exceed 200 characters";
      formValid = false;
    } else {
      newErrors.enquiry_for = "";
    }

    if (formData.pincode.trim() === "") {
      newErrors.pincode = "Pincode is required";
      formValid = false;
    } else if (formData.pincode.length !== 6) {
      newErrors.pincode =
        "Incorrect pincode. Pincode should be 6 characters long.";
      formValid = false;
    } else {
      newErrors.pincode = "";
    }

    if (formData.address.trim() === "") {
      newErrors.address = "Address is required";
      formValid = false;
    } else {
      newErrors.address = "";
    }

    setErrors(newErrors);

    if (formValid) {
      try {
        const submissionResponse = await axios.post(
          "http://localhost:8000/api/enquiry/createenquiry",
          {
            userId: userId,
            providerId: providerId,
            ...formData,
          }
        );

        console.log("Enquiry created:", submissionResponse.data);
        handleClose();
      } catch (error) {
        console.error("Error creating enquiry:", error);
      }
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Enquiry Information</DialogTitle>
      <DialogContent>
        <TextField
          sx={{ marginTop: "1rem" }}
          label="Enquiry For"
          name="enquiry_for"
          value={formData.enquiry_for}
          onChange={handleChange}
          fullWidth
          required
          inputProps={{ maxLength: 200 }}
          error={!!errors.enquiry_for}
          helperText={errors.enquiry_for}
        />
        <TextField
          sx={{ marginTop: "1rem" }}
          label="Pincode"
          name="pincode"
          value={formData.pincode}
          onChange={handleChange}
          fullWidth
          required
          error={!!errors.pincode}
          helperText={errors.pincode}
        />
        <TextField
          sx={{ marginTop: "1rem" }}
          label="State"
          name="state"
          value={formData.state}
          InputProps={{ readOnly: true }}
          fullWidth
          required
        />
        <TextField
          sx={{ marginTop: "1rem" }}
          label="City"
          name="city"
          value={formData.city}
          InputProps={{ readOnly: true }}
          fullWidth
          required
        />

        <TextField
          sx={{ marginTop: "1rem" }}
          label="Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          fullWidth
          required // Adding required attribute here
          error={!!errors.address}
          helperText={errors.address}
        />

        <Button
          sx={{ marginTop: "1rem", float: "right" }}
          onClick={handleFormSubmit}
          variant="contained"
          color="primary"
        >
          Submit
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default EnquiryDialogueBox;
