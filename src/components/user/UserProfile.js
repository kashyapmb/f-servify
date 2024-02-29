import axios from "axios";
import React, { useEffect, useState } from "react";

function UserProfile() {
  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState("");
  useEffect(() => {
    const currentURL = window.location.href;
    const parts = currentURL.split("/");
    setUserId(parts[parts.length - 1]);

    if (userId != null && user == "") getUserDetails();
  }, [userId]);

  const getUserDetails = async () => {
    const response = await axios.get(
      `http://localhost:8000/api/user/getone/${userId}`
    );
    setUser(response.data);
  };
  return <div>UserProfile</div>;
}

export default UserProfile;
