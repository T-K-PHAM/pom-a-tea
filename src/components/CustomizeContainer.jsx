import React, { useEffect, useState } from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { motion } from "framer-motion";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import { v4 as uuidv4 } from "uuid";

const CustomizeContainer = () => {
  const [selectedToppings, setSelectedToppings] = useState([]);

  const [temp, setTemp] = useState("");
  const [size, setSize] = useState("");
  const [sugar, setSugar] = useState("");

  const [msg, setMsg] = useState(null);
  const [fields, setFields] = useState(false);
  const [alertStatus, setAlertStatus] = useState("danger");

  const [{ cartItems, custShow, selectedProduct }, dispatch] = useStateValue();
  const [tot, setTotal] = useState(parseFloat(selectedProduct.price));

  const showCust = () => {
    dispatch({
      type: actionType.SET_CUSTOM_SHOW,
      custShow: !custShow,
    });
  };

  const updatePrice = (event) => {
    const isChecked = event.target.checked;
    const value = event.target.value + " ";
    if (isChecked) {
      setTotal(tot + 1.0);
      setSelectedToppings((prevSelectedToppings) => {
        if (!prevSelectedToppings.includes(value)) {
          return [...prevSelectedToppings, value];
        }
        return prevSelectedToppings;
      });
    } else {
      setTotal(tot - 1.0);
      setSelectedToppings((prevSelectedToppings) => prevSelectedToppings.filter((topping) => topping !== value));
    }
  };

  const getTemp = (event) => {
    setTemp(event.target.value);
  };
  const getSize = (event) => {
    setSize(event.target.value);
  };

  const getSugar = (event) => {
    setSugar(event.target.value);
  };

  const validate = () => {
    var formValid = false;
    if (!!temp && !!size && !!sugar) {
      setAlertStatus("danger");
      setTimeout(() => {
        setFields(false);
      }, 4000);
      setMsg("");
      formValid = true;
    }
    if (!formValid) {
      setFields(true);
      setMsg("Required fields can't be empty😊");
      setAlertStatus("success");
      setTimeout(() => {
        setFields(false);
      }, 4000);
      return false;
    }
    return true;
  };
  const addtocart = (
    temp,
    size,
    sugar,
    tot,
    selectedProduct,
    selectedToppings
  ) => {
    const newOption = {
      id: uuidv4(),
      name: selectedProduct.title,
      image: selectedProduct.imageURL,
      temp: temp,
      size: size,
      sugar: sugar,
      price: tot,
      qty: 1,
      topping: selectedToppings,
    };
    const existingCartItems =
      JSON.parse(localStorage.getItem("cartItems")) || [];
    const updatedCartItems = [...existingCartItems, newOption];
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    dispatch({
      type: actionType.SET_CARTITEMS,
      cartItems: updatedCartItems,
    });
  };

  const btnAdd = () => {
    if (validate()) {
      addtocart(temp, size, sugar, tot, selectedProduct, selectedToppings);
      showCust();
    }
  };

  useEffect(() => {}, [tot]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 200 }}
      className="fixed top-0 right-0 w-full md:w-500 h-screen
     bg-white drop-shadow-md flex flex-col z-[101]"
    >
      <div className="w-full flex items-center justify-between p-4 cursor-pointer">
        <motion.div
          whileTap={{ scale: 0.75 }}
          onClick={() => showCust(custShow)}
        >
          <MdOutlineKeyboardBackspace className="text-textColor text-3xl" />
        </motion.div>
      </div>

      {/* Header */}
      <div className="flex flex-col">
        <img
          src={selectedProduct?.imageURL}
          className="w-500 h-150 rounded-full object-contain"
          alt={selectedProduct?.Title}
        ></img>
        <p className="text-textColor text-center text-3xl font-extrabold">
          {selectedProduct?.title}
        </p>
      </div>
      {fields && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`w-full p-2 rounded-lg text-center text-lg font-semibold ${
              alertStatus === "danger"
                ? "bg-red-400 text-red-800"
                : "bg-emerald-400 text-emerald-800"
            }`}
          >
            {msg}
          </motion.p>
        )}
      {/* Options */}
      <div
        className="w-full h-800 md:h-42 px-6 py-10 flex flex-col gap-3 overflow-y-scroll
      scrollbar-track-fuchsia-200"
      >
        {/* Temp */}
        <div>
          {/* Label */}
          <div className="w-full h-2/4 justify-between flex border-b-2 border-gray-600">
            <p className="text-textColor text-left text-3xl font-extrabold w-3/4 h-full">
              Select your option
            </p>
            <p className="text-textColor text-right text-lg w-1/4 h-full py-1">
              Required
            </p>
          </div>

          {/* Radio Buttons */}
          <div className="w-full h-full py-3 flex space-x-4">
            <div className="w-1/2 flex items-center px-4 border border-gray-200 rounded dark:border-gray-700">
              <input
                id="radio-hot"
                type={"radio"}
                value="Temp-hot"
                name="radio-temp"
                onChange={getTemp}
                required
                className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <div className="w-full flex flex-col">
                <label
                  htmlFor="radio-hot"
                  className="text-2xl text-black text-right"
                >
                  Hot
                </label>
                <span className="text-right">$0.00</span>
              </div>
            </div>

            <div className="w-1/2 flex items-center px-4 border border-gray-200 rounded dark:border-gray-700">
              <input
                id="radio-cold"
                type={"radio"}
                value="Temp-cold"
                name="radio-temp"
                onChange={getTemp}
                className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <div className="w-full flex flex-col">
                <label
                  htmlFor="radio-cold"
                  className="text-2xl text-black text-right"
                >
                  Cold
                </label>
                <span className="text-right">$0.00</span>
              </div>
            </div>
          </div>
        </div>
        <br />
        <br />
        <br />
        {/* Size */}
        <div className="w-full">
          {/* Label */}
          <div className="w-full h-2/4 justify-between flex border-b-2 border-gray-600">
            <p className="text-textColor text-left text-3xl font-extrabold w-3/4 h-full">
              Size
            </p>
            <p className="text-textColor text-right text-lg w-1/4 h-full py-1">
              Required
            </p>
          </div>

          {/* Radio Buttons */}
          <div className="w-full h-full py-3 flex space-x-4">
            <div className="w-1/2 flex items-center px-4 border border-gray-200 rounded dark:border-gray-700">
              <input
                id="radio-large"
                type={"radio"}
                value="Size-large"
                name="radio-size"
                onChange={getSize}
                required
                className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <div className="w-full flex flex-col">
                <label
                  htmlFor="radio-large"
                  className="text-2xl text-black text-right"
                >
                  Large
                </label>
                <span className="text-right">$0.00</span>
              </div>
            </div>

            <div className=" w-1/2 flex items-center px-4 border border-gray-200 rounded dark:border-gray-700">
              <input
                id="radio-regular"
                type={"radio"}
                value="Size-regular"
                name="radio-size"
                onChange={getSize}
                className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <div className="w-full flex flex-col">
                <label
                  htmlFor="radio-regular"
                  className="text-2xl text-black text-right"
                >
                  Regular
                </label>
                <span className="text-right">$0.00</span>
              </div>
            </div>
          </div>
        </div>

        <br />
        <br />
        <br />
        {/* Sugar Level */}
        <div className="w-full">
          {/* Label */}
          <div className="w-full h-2/4 justify-between flex border-b-2 border-gray-600">
            <p className="text-textColor text-left text-3xl font-extrabold w-3/4 h-full">
              Sugar Level
            </p>
            <p className="text-textColor text-right text-lg w-1/4 h-full py-1">
              Required
            </p>
          </div>

          {/* Radio Buttons */}
          <div className="w-full h-full py-3 flex space-x-4">
            <div className="w-1/2 flex items-center px-4 border border-gray-200 rounded dark:border-gray-700">
              <input
                id="radio-0"
                type={"radio"}
                value="Sugar-0"
                name="radio-sugar"
                onChange={getSugar}
                required
                className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <div className="w-full flex flex-col">
                <label
                  htmlFor="radio-0"
                  className="text-2xl text-black text-right"
                >
                  0%
                </label>
                <span className="text-right">$0.00</span>
              </div>
            </div>

            <div className="w-1/2 flex items-center px-4 border border-gray-200 rounded dark:border-gray-700">
              <input
                id="radio-50"
                type={"radio"}
                value="Sugar-50"
                name="radio-sugar"
                onChange={getSugar}
                className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <div className="w-full flex flex-col">
                <label
                  htmlFor="radio-50"
                  className="text-2xl text-black text-right"
                >
                  50%
                </label>
                <span className="text-right">$0.00</span>
              </div>
            </div>

            <div className=" w-1/2 flex items-center px-4 border border-gray-200 rounded dark:border-gray-700">
              <input
                id="radio-100"
                type={"radio"}
                value="Sugar-100"
                name="radio-sugar"
                onChange={getSugar}
                className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <div className="w-full flex flex-col">
                <label
                  htmlFor="radio-100"
                  className="text-2xl text-black text-right"
                >
                  100%
                </label>
                <span className="text-right">$0.00</span>
              </div>
            </div>
          </div>
        </div>

        <br />
        <br />
        <br />
        {/* Toppings */}
        <div className="w-full">
          {/* Label */}
          <div className="w-full h-1/4 justify-between flex border-b-2 border-gray-600">
            <p className="text-textColor text-left text-3xl font-extrabold w-3/4 h-full">
              Toppings
            </p>
          </div>

          {/* CheckBox */}
          <div className="w-full h-3/4 py-3 flex">
            <div className="w-full h-full py-3 flex space-x-3  ">
              <div className="w-1/2 flex items-center px-4 border border-gray-200 rounded dark:border-gray-700">
                <input
                  id="rainjelly"
                  type="checkbox"
                  value="Rainbow-Jelly"
                  name="toppings"
                  onChange={updatePrice}
                  className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <div className="w-full flex flex-col">
                  <label
                    htmlFor="rainjelly"
                    className="text-lg text-black text-right"
                  >
                    Rainbow Jelly
                  </label>
                  <span className="text-right">+1.00</span>
                </div>
              </div>

              <div className="w-1/2 flex items-center px-4 border border-gray-200 rounded dark:border-gray-700">
                <input
                  id="popboba"
                  type="checkbox"
                  value="Popping-boba"
                  name="toppings"
                  onChange={updatePrice}
                  className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <div className="w-full flex flex-col">
                  <label
                    htmlFor="popboba"
                    className="text-lg text-black text-right"
                  >
                    Popping Boba
                  </label>
                  <span className="text-right">+1.00</span>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full h-3/4 py-3 flex">
            <div className="w-full h-full py-3 flex space-x-3 ">
              <div className="w-1/2 flex items-center px-4 border border-gray-200 rounded dark:border-gray-700">
                <input
                  id="pearl"
                  type="checkbox"
                  value="Pearls"
                  name="toppings"
                  onChange={updatePrice}
                  className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <div className="w-full flex flex-col">
                  <label
                    htmlFor="pearl"
                    className="text-lg text-black text-right"
                  >
                    Pearls
                  </label>
                  <span className="text-right">+1.00</span>
                </div>
              </div>
              <div className="w-1/2 flex items-center px-4 border border-gray-200 rounded dark:border-gray-700">
                <input
                  id="lychee"
                  type="checkbox"
                  value="Lychee-Jelly"
                  name="toppings"
                  onChange={updatePrice}
                  className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <div className="w-full flex flex-col">
                  <label
                    htmlFor="lychee"
                    className="text-lg text-black text-right"
                  >
                    Lychee Jelly
                  </label>
                  <span className="text-right">+1.00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* bottom */}
      <div className="w-full h-1/5 p-3 flex items-center">
        <motion.button
          whileTap={{ scale: 0.8 }}
          type="button"
          className="w-full p-2 rounded-full bg-gradient-to-tr from-pink-50 to-pink-400 text-black text-lg my-2 hover:shadow-lg text-center"
          onClick={btnAdd}
        >
          Add To Cart
          <p className="w-full text-center">${tot}</p>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default CustomizeContainer;
