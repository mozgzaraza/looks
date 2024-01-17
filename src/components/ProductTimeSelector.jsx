import React from "react";

function ProductTimeSelector({ times }) {
  const [selectedTime, setSelectedTime] = React.useState(times[0]);

  const decreaseTime = () => {
    const currentIndex = times.indexOf(selectedTime);
    if (currentIndex > 0) {
      setSelectedTime(times[currentIndex - 1]);
    }
  };

  const increaseTime = () => {
    const currentIndex = times.indexOf(selectedTime);
    if (currentIndex < times.length - 1) {
      setSelectedTime(times[currentIndex + 1]);
    }
  };

  return (
    <div className="product__btn-time">
      <span
        onClick={() => decreaseTime()}
        className={
          times.indexOf(selectedTime) === 0
            ? "product__btn-plus product__btn-disabled"
            : "product__btn-plus"
        }
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 12L18 12"
            stroke="#000000"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <p>
        <span>{selectedTime}</span>
        срок аренды
      </p>
      <span
        onClick={() => increaseTime()}
        className={
          times.indexOf(selectedTime) === times.length - 1
            ? "product__btn-plus product__btn-disabled"
            : "product__btn-plus"
        }
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 12H20M12 4V20"
            stroke="#000000"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </div>
  );
}

export default ProductTimeSelector;
