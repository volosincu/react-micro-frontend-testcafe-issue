import React from "react";

export const Button = () => (
  <button
    id="btn-hello"
    onClick={() => {
      console.log("click btn hello");
    }}
  >
    Hello!
  </button>
);

export default Button;
