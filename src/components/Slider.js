import { Box } from "@mui/material";
import React from "react";
import "./Slider.css";

const images = ["sp1.jpg", "sp2.jpg", "sp3.jpg"];
const delay = 2500;
function Slider() {
  const [index, setIndex] = React.useState(0);
  const timeoutRef = React.useRef(null);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  React.useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );

    return () => {
      resetTimeout();
    };
  }, [index]);
  return (
    <div className="slideshow">
      <div
        className="slideshowSlider"
        style={{ transform: `translate3d(${-index * 101.3}%, 0, 0)` }}
      >
        {images.map((imgName, index) => (
          <img src={`images/${imgName}`} className="slide" />
        ))}
      </div>

      <div className="slideshowDots">
        {images.map((_, idx) => (
          <div
            key={idx}
            className={`slideshowDot${index === idx ? " active" : ""}`}
            onClick={() => {
              setIndex(idx);
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default Slider;

function Slideshow() {}
