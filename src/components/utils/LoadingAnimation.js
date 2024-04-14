import React from "react";
import "./loading.css"
function LoadingAnimation() {
  return (
    <div>
      <div className="loading-spinner">
        {/* Customize your loading spinner here */}
        <div className="spinner"></div>
      </div>
    </div>
  );
}

export default LoadingAnimation;

// import React, { useState, useEffect } from 'react';

// const LoadingAnimation = () => {
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setIsLoading(false);
//     }, 3000); // Change 3000 to your desired loading duration in milliseconds
//     return () => clearTimeout(timer);
//   }, []);

//   return (

//   );
// };
