import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import validator from "validator";
import { actionType } from "../context/reducer";
import { useStateValue } from "../context/StateProvider";
import { motion } from "framer-motion";

import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBInput,
  MDBRow,
} from "mdb-react-ui-kit";
import { saveOrder, addOrderProducts } from "../utils/firebaseFunctions";

const Payment = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiry] = useState("");
  const [cvv, setCVV] = useState("");
  const [name, setName] = useState("");

  const [{ cartItems, user, orderID }, dispatch] = useStateValue();
  const navigate = useNavigate();
  const [msg, setMsg] = useState(null);
  const [fields, setFields] = useState(false);
  const [alertStatus, setAlertStatus] = useState("danger");

  // get credit card value
  const handleCardNumberChange = (event) => {
    setCardNumber(event.target.value);
  };

  // get expiry date value
  const expiryDateChange = (event) => {
    setExpiry(event.target.value);
  };
  // get cvv value
  const cvvChange = (event) => {
    setCVV(event.target.value);
  };
  //get name value
  const nameChange = (event) => {
    setName(event.target.value);
  };
  // get cart items from local storage, and store in firebase
  const saveDetails = () => {
    const cart = JSON.parse(localStorage.getItem("cartItems"));
    const user = JSON.parse(localStorage.getItem("user"));
    const orderId = Date.now().toString();
    setID(orderId);

    try {
      cart.forEach((item) => {
        const itemId = saveOrder(orderId);
        const toppingsString = item.topping.join(", ");
        const data = {
          customer: user.email,
          title: item.name,
          imageURL: item.image,
          temp: item.temp,
          size: item.size,
          sugar: item.sugar,
          toppings: toppingsString,
          qty: item.qty,
          price: item.price,
        };
        addOrderProducts(data, itemId);
      });
      setTimeout(() => {
        setFields(false);
      }, 4000);
      setMsg("");
      clearCart();
    } catch (error) {
      console.log(error);
      setMsg("Error while processing payment: Please try again 🙇");
      setAlertStatus("danger");
      setTimeout(() => {
        setFields(false);
      }, 4000);
    }
  };


  // clears cart in local storage
  const clearCart = () => {
    dispatch({
      type: actionType.SET_CARTITEMS,
      cartItems: [],
    });

    localStorage.setItem("cartItems", JSON.stringify([]));
  };
  // sets order Id
  const setID = (orderId) => {
    dispatch({
      type: actionType.SET_ORDER_ID,
      orderID: orderId,
    });
  };
  // validates credit card date
  const validateCreditCardExpiry = (expiryDate) => {
    if (!!expiryDate.trim()) {
      if (expiryDate.match(/^(0[1-9]|1[0-2])\/\d{2}$/)) {
        // Expiry should be in the format of "MM/YY"
        expiryDate.replace(/\D/g, "").replace(/(\d{2})(\d)/, "$1/$2");
        const [month, year] = expiryDate.split("/");
        const currentDate = new Date();
        const expiry = new Date(Number("20" + year), Number(month) - 1);
        if (expiry <= currentDate) {
          return false; // Card has expired
        } else {
          return true; // Card is valid
        }
      } else {
        return false;
      }
    } else {
      return false;
    }
  };
  // validates cvv
  const validateCVV = (cvv) => {
    if (cvv.match(/^[0-9]{3}$/)) {
      return true;
    }
    return false;
  };
  // validates name
  const validateName = (name) => {
    if (!!name.trim()) {
      return true;
    }
    return false;
  };
  // checks credit card is valid, save to database, navigate to success page
  const isSuccess = () => {
    if (
      validator.isCreditCard(cardNumber) &&
      validateCreditCardExpiry(expiryDate) &&
      validateCVV(cvv) &&
      validateName(name)
    ) {
      saveDetails();
      navigate("/success");
    } else {
      setFields(true);
      setMsg("Please enter a valid credit card😊");
      setAlertStatus("success");
      setTimeout(() => {
        setFields(false);
      }, 4000);
    }
  };

  const cancel = () => {
    navigate("/");
  }

  return (
    <div>
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
      <MDBContainer className="py-5" fluid>
        <MDBRow className=" d-flex justify-content-center">
          <MDBCol md="10" lg="8" xl="5">
            <MDBCard className="rounded-3">
              <MDBCardBody className="p-4">
                <div className="text-center mb-4">
                  <h6>Payment</h6>
                </div>
                <p className="fw-bold mb-4 pb-2">Accepted cards:</p>
                <div className="flex flex-row align-items-center mb-4 pb-1">
                  <img
                    className="img-fluid"
                    src="https://img.icons8.com/color/48/000000/visa.png"
                    alt="visacard"
                  />
                  <img
                    className="img-fluid"
                    src="https://img.icons8.com/color/48/000000/mastercard-logo.png"
                    alt="mastercard"
                  />
                </div>
                <br />
                <MDBInput
                  label=" Cardholder's Name"
                  id="name"
                  type="text"
                  size="lg"
                  value={name}
                  onChange={nameChange}
                />
                <MDBRow className="my-4">
                  <MDBCol size="7">
                    <MDBInput
                      label=" Card Number"
                      id="cardNumber"
                      type="text"
                      size="lg"
                      value={cardNumber}
                      onChange={handleCardNumberChange}
                    />
                  </MDBCol>
                  <br></br>
                  <MDBCol size="3">
                    <MDBInput
                      label=" Expiry Date"
                      id="date"
                      type="text"
                      size="lg"
                      placeholder="MM/YY"
                      value={expiryDate}
                      onChange={expiryDateChange}
                    />
                  </MDBCol>
                  <br></br>
                  <MDBCol size="2">
                    <MDBInput
                      label=" CVV"
                      id="cvv"
                      type="text"
                      size="lg"
                      placeholder="123"
                      value={cvv}
                      onChange={cvvChange}
                    />
                  </MDBCol>
                </MDBRow>
                <motion.button className="w-1/3 p-2 rounded-full bg-gradient-to-tr from-pink-50 to-pink-400 text-black text-lg my-2 hover:shadow-lg text-center" onClick={isSuccess}>
                  Pay Now
                </motion.button>
                <motion.button className="w-1/3 p-2 rounded-full bg-black text-white text-lg my-2 hover:shadow-lg text-center" onClick={cancel}>
                  Cancel
                </motion.button>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
};

export default Payment;
