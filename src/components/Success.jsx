import React from "react";
import { useStateValue } from "../context/StateProvider";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const [{ orderID }, dispatch] = useStateValue();
  const navigate = useNavigate();
  const handleNavigateHome = () => {
    navigate("/");
  };

  return (
    <div className="w-screen h-screen flex items-center bg-primary">
      <div className="w-screen text-center">
      <h1>Thanks for your order!</h1>
      <div>
        Your order number is: {orderID} <br />
        Your email is also used as a reference to your order if you lose your order number.
      </div>
      <p>
        We appreciate your business!
      </p>
      <button className="w-1/4 p-2 rounded-full bg-gradient-to-tr from-pink-50 to-pink-400 text-black text-lg my-2 hover:shadow-lg text-center" onClick={handleNavigateHome}>Go to Home</button>
      </div>
    </div>
  )
}

export default Success
  