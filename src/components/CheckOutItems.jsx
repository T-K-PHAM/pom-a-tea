import React, { useEffect, useState } from "react";
import { useStateValue } from "../context/StateProvider";

const CheckOutItems = () => {
  const cart = JSON.parse(localStorage.getItem("cartItems"));
  const [tot, setTot] = useState(0);
  const [{ cartItems }] = useStateValue();
  const [tax, setTax] = useState(0);

  useEffect(() => {
    let totalPrice = cartItems.reduce((total, item) => total + item.price, 0);
    setTot(totalPrice.toFixed(2));
  });

  useEffect(() => {
    setTax((tot * 0.13).toFixed(2));
  });

  return (
    <div className="w-full h-full flex items-center gap-8">
      <div className="w-full h-full flex flex-col gap-2">
        {cart.length > 0 ? (
          <>
            {cart.map((item) => (
              <div
                key={item.id}
                className="w-full h-full flex items-center"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-32 h-32 rounded-full object-contain translate-x-48"
                />
                <div className="w-1/3 flex flex-col translate-x-40 items-center">
                  <p className="text-left">{item.name}</p>
                  <p className="text-xs font-mono">{item.temp}</p>
                  <p className="text-xs font-mono">{item.size}</p>
                  <p className="text-xs font-mono">{item.sugar}</p>
                  <p className="text-xs font-mono">{item.topping}</p>
                  <p className="text-xs font-mono">Quantity: {item.qty}</p>
                </div>
                <div className="w-1/2 text-right font-bold">
                  <p>CA${item.price}</p>
                </div>
              </div>
            ))}
            <br/>
            <div className="w-full flex flex-col space-y-2">
              <div className="w-full flex justify-between">
                <p className="text-black text-lg font-semibold px-56">Tax</p>
                <p className="text-black text-lg font-semibold">${tax}</p>
              </div>

              <div className="w-full flex justify-between">
                <p className="text-black text-lg font-semibold px-56 ">Total</p>
                <p className="text-black text-xl font-semibold">
                  ${(parseFloat(tot) + parseFloat(tax)).toFixed(2)}
                </p>
              </div>
            </div>
          </>
        ) : (
          <div className="w-full flex flex-col items-center justify-center">
            <p className="text-xl text-headingColor font-semibold my-2">
              Order our drinks now to check out
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckOutItems;
