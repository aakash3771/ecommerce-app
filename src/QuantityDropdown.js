import React from "react";

const QuantityDropdown = ({ quantity, onQuantityChange, maxQuantity = 10 }) => {
  return (
    <select
      className="form-select"
      value={quantity}
      onChange={(e) => onQuantityChange(Number(e.target.value))}
    >
      {[...Array(maxQuantity).keys()].map((n) => (
        <option key={n + 1} value={n + 1}>
          {n + 1}
        </option>
      ))}
    </select>
  );
};

export default QuantityDropdown;
