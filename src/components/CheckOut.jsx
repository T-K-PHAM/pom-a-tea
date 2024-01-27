import React from "react";
import CheckOutItems from "./CheckOutItems";
import Payment from "./Payment";


const CheckOut = () => {
  return (
    <div className="w-full flex justify-center items-center h-screen">
      <div className="w-full max-w-screen-md px-6">
        <CheckOutItems />
      </div>
      <div>
        <Payment />
      </div>
    </div>
  );
};

export default CheckOut;
