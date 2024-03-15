import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Avatar,
  Card,
  CardContent,
  Typography,
  Box,
  LinearProgress,
  Button,
  TextField, // Import TextField from MUI
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { imageDb } from "../firebaseImageupload/Config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { useParams } from "react-router-dom";
import { cities } from "../../data/cities";
import "./ProviderProfile.css";

function ProviderProfile() {
  const { providerId } = useParams();
  const [provider, setProvider] = useState({});
  const [editedProvider, setEditedProvider] = useState({});
  const [editedProvider1, setEditedProvider1] = useState({});
  const [edit, setEdit] = useState(false); // State to manage edit mode
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProviderDetails = async () => {
      const response = await axios.get(
        `http://localhost:8000/api/provider/getone/${providerId}`
      );

      setProvider(response.data);
      setEditedProvider(response.data);
      setLoading(false);
    };
    getProviderDetails();
  }, []);

  useEffect(() => {
    console.log("now updated", editedProvider);
  }, [editedProvider]);

  useEffect(() => {
    const sendDetails = async () => {
      try {
        console.log("Updated", providerId);
        console.log("Want to save this data", editedProvider1);
        const response = await axios.put(
          `http://localhost:8000/api/provider/updateDetails/${providerId}`,
          editedProvider1
        );
        const res = await axios.post(
          `http://localhost:8000/api/admin/providerediteddata`,
          editedProvider1
        );
        console.log(response);
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    };
    sendDetails();
  }, [editedProvider1]);

  const handleEdit = () => {
    setEdit(true);
  };

  const validateMobile = async (mobile) => {
    return /^\d{10}$/.test(mobile);
  };

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setEditedProvider((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleClickImage = () => {
    document.getElementById("fileInput").click();
  };

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageforUpload, setSelectedImageforUpload] = useState(null);
  const imageInputHandler = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file.");
        return;
      }
      setSelectedImageforUpload(event.target.files[0]);
      const reader = new FileReader();
      reader.onload = function (e) {
        setSelectedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async () => {
    const storageRef = ref(imageDb, `providerImages/${uuidv4()}`);
    await uploadBytes(storageRef, selectedImageforUpload);

    const imageUrl = await getDownloadURL(storageRef);
    console.log("Uploaded Image URL:", imageUrl);
    return imageUrl;
  };

  const handleUpdate = async () => {
    console.log("This user", editedProvider);
    const { fname, lname, mobile, city, location } = editedProvider;
    if (fname && lname && mobile && city && location) {
      if (await validateMobile(mobile)) {
        if (selectedImage) {
          console.log("Called");
          const imageUrl = await uploadImage();

          const updatedUser = {
            ...editedProvider,
            profilePhoto: imageUrl.toString(),
          };

          setEditedProvider1(updatedUser);
        } else {
          updateDetailINDatabase(editedProvider);
        }

        setEdit(false);
      } else {
        alert("Enter valid Mobile Number");
      }
    } else {
      alert("Enter all information");
    }
  };

  const updateDetailINDatabase = async (updatedUser) => {
    console.log("Want to save  this data", updatedUser);
    const response = await axios.put(
      `http://localhost:8000/api/provider/updateDetails/${providerId}`,
      updatedUser
    );
    const res = await axios.post(
      `http://localhost:8000/api/admin/providerediteddata`,
      updatedUser
    );
  };

  if (loading) {
    return <h1>Loading.....</h1>;
  }

  if (edit)
    return (
      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          mt: "3rem",
        }}
      >
        <Box
          style={{
            width: "40%",
            borderRadius: "10px",
            padding: "2rem",
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
            backdropFilter: "blur(8.6px)",
          }}
        >
          <Box
            sx={{ fontSize: "1.5rem", textDecoration: "underline", mb: "2rem" }}
          >
            Profile
          </Box>
          <Box>
            <Box sx={{ display: "flex", gap: "2rem" }}>
              <Box
                className="container_image"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={handleClickImage}
              >
                {isHovered && (
                  <img
                    src="/images/profileAnotherImage.jpg"
                    alt="Image 2"
                    className="upper_image"
                  />
                )}
                <img
                  className="bottom_image"
                  src={selectedImage ? selectedImage : provider.profilePhoto}
                />
                <input
                  id="fileInput"
                  type="file"
                  onChange={imageInputHandler}
                  style={{ display: "none" }}
                />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                  fontSize: "1.5rem",
                }}
              >
                <Box sx={{ display: "flex", gap: "1rem" }}>
                  <TextField
                    required
                    fullWidth
                    id="fname"
                    label="First Name"
                    name="fname"
                    value={editedProvider.fname}
                    onChange={inputHandler}
                  />
                  <TextField
                    required
                    fullWidth
                    id="lname"
                    label="Last Name"
                    name="lname"
                    value={editedProvider.lname}
                    onChange={inputHandler}
                  />
                </Box>
                <TextField
                  margin="dense"
                  required
                  fullWidth
                  id="age"
                  label="Age"
                  name="age"
                  value={editedProvider.age}
                  onChange={inputHandler}
                />
                <TextField
                  margin="dense"
                  required
                  fullWidth
                  id="gender"
                  label="Gender"
                  name="gender"
                  value={editedProvider.gender}
                  onChange={inputHandler}
                />
                <TextField
                  margin="dense"
                  required
                  fullWidth
                  id="profession"
                  label="Profession"
                  name="profession"
                  value={editedProvider.profession}
                  onChange={inputHandler}
                />
                <TextField
                  margin="dense"
                  required
                  fullWidth
                  id="mobile"
                  label="Mobile"
                  name="mobile"
                  value={editedProvider.mobile}
                  onChange={inputHandler}
                />
                <TextField
                  margin="dense"
                  required
                  fullWidth
                  id="address"
                  label="Location"
                  name="location"
                  value={editedProvider.location}
                  onChange={inputHandler}
                />
                <TextField
                  margin="dense"
                  required
                  fullWidth
                  id="city"
                  label="City"
                  name="city"
                  value={editedProvider.city}
                  onChange={inputHandler}
                />
              </Box>
            </Box>
            <Box
              sx={{
                mt: "3rem",
                display: "flex",
                justifyContent: "center",
                fontSize: "1.4rem",
                cursor: "pointer",
                border: "1px solid black",
                transition: "0.5s",
                ":hover": { background: "#2962ff", color: "white" },
              }}
              onClick={handleUpdate}
            >
              Update
            </Box>
          </Box>
        </Box>
      </Box>
    );

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        justifyContent: "center",
        mt: "3rem",
      }}
    >
      <Box
        style={{
          width: "40%",
          borderRadius: "10px",
          padding: "2rem",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(8.6px)",
        }}
      >
        <Box
          sx={{ fontSize: "1.5rem", textDecoration: "underline", mb: "2rem" }}
        >
          Profile
        </Box>
        <Box>
          <Box sx={{ display: "flex", gap: "3rem" }}>
            <img
              src={provider.profilePhoto}
              style={{
                width: "10rem",
                height: "10rem",
                border: "1px solid black",
              }}
            />

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                fontSize: "1.5rem",
              }}
            >
              <Box>
                {provider.fname} {provider.lname}
              </Box>
              <Box>Age : {provider.age}</Box>
              <Box>Gender : {provider.gender}</Box>
              <Box>Profession : {provider.profession}</Box>
              <Box>Mobile : {provider.mobile}</Box>
              <Box>E-mail : {provider.email}</Box>
              <Box sx={{ display: "flex" }}>
                Address :&nbsp;
                {provider.location ? (
                  provider.location
                ) : (
                  <Box sx={{ opacity: "0.6" }}>not given</Box>
                )}
              </Box>
              <Box sx={{ display: "flex" }}>
                City :&nbsp;
                {provider.city ? (
                  provider.city
                ) : (
                  <Box sx={{ opacity: "0.6" }}>not given</Box>
                )}
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              mt: "3rem",
              display: "flex",
              justifyContent: "center",
              fontSize: "1.4rem",
              cursor: "pointer",
              border: "1px solid black",
              transition: "0.5s",
              ":hover": { background: "#2962ff", color: "white" },
            }}
            onClick={handleEdit}
          >
            Edit
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default ProviderProfile;
