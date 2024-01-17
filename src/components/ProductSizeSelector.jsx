import React from "react";

function ProductSizeSelector({ sizes }) {
  const [selectedSize, setSelectedSize] = React.useState(sizes[0]);

  const decreaseSize = () => {
    const currentIndex = sizes.indexOf(selectedSize);
    if (currentIndex > 0) {
      setSelectedSize(sizes[currentIndex - 1]);
    }
  };

  const increaseSize = () => {
    const currentIndex = sizes.indexOf(selectedSize);
    if (currentIndex < sizes.length - 1) {
      setSelectedSize(sizes[currentIndex + 1]);
    }
  };

  return (
    <div className="product__btn-size">
      <span
        onClick={decreaseSize}
        disabled={sizes.indexOf(selectedSize) === 0}
        className={
          sizes.indexOf(selectedSize) === 0
            ? "product__btn-minus product__btn-disabled"
            : "product__btn-minus"
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
        <span>{selectedSize}</span>
        размер
      </p>
      <span
        onClick={increaseSize}
        className={
          sizes.indexOf(selectedSize) === sizes.length - 1
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

export default ProductSizeSelector;
