import React, { useEffect, useRef, useState } from "react";
import { MdShoppingBasket, MdStar } from "react-icons/md";
import { motion } from "framer-motion";
import NotFound from "../img/NotFound.svg";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";

const RowContainer = ({ flag, data, scrollValue }) => {
  const rowContainer = useRef();

  const [items, setItems] = useState([]);
  const [{ cartItems, custShow, selectedProduct, favs}, dispatch] = useStateValue();
  const showCust = () => {
      dispatch({
      type: actionType.SET_CUSTOM_SHOW,
      custShow: !custShow,
      
    });
  };

  const getSelectedProduct = (id) => {
    const getProduct = data.find((getProduct) => getProduct.id === id);
    dispatch({
      type: actionType.SET_SELECTED_PRODUCT,
      selectedProduct: getProduct,
    });
    localStorage.setItem("selectedProduct", JSON.stringify(getProduct));
  };

  const displayCust = (id) => {
    showCust();
    getSelectedProduct(id);
  }

  const setFav = (item) => {
    const existingFavourites = JSON.parse(localStorage.getItem("favourites")) || [];
    if (!!existingFavourites) {
      const alreadyFavInd = existingFavourites.findIndex(x => x === item.id);
      if (alreadyFavInd === -1) {
        const updatedFavourites = [...existingFavourites, item.id];
        localStorage.setItem("favourites", JSON.stringify(updatedFavourites));
      } else {
        existingFavourites.splice(alreadyFavInd, 1);
        localStorage.setItem("favourites", JSON.stringify(existingFavourites));
      }
    } else {
      existingFavourites = [];
      const updatedFavourites = [...existingFavourites, item.id];
      localStorage.setItem("favourites", JSON.stringify(updatedFavourites));
    }
    handleFavUpdate();
  }

  const handleFavUpdate = async () => {
    const existingFavourites = JSON.parse(localStorage.getItem("favourites")) || [];
      dispatch({
        type: actionType.SET_FAV,
        favs: existingFavourites,
      });
  };
    
  const isFavourited = (id) => {
    if (!!favs) {
      const alreadyFav = favs.findIndex(x => x === id);
      return alreadyFav !== -1;
    }
    return false;
  }

  useEffect(() => {
    rowContainer.current.scrollLeft += scrollValue;
  }, [scrollValue]);

  return (
    <div
      ref={rowContainer}
      className={`w-full flex items-center gap-3  my-12 scroll-smooth  ${
        flag
          ? "overflow-x-scroll scrollbar-none"
          : "overflow-x-hidden flex-wrap justify-center"
      }`}
      >
      {data && data.length > 0 ? (
        data.map((item) => (
          <div
            key={item?.id}
            className="w-275 h-[175px] min-w-[275px] md:w-300 md:min-w-[300px]  bg-cardOverlay rounded-lg py-2 px-4  my-12 backdrop-blur-lg hover:drop-shadow-lg flex flex-col items-center justify-evenly relative"
          >
            <div className="w-full flex items-center justify-between">
              <motion.div
                className="w-40 h-40 -mt-8 drop-shadow-2xl"
                whileHover={{ scale: 1.2 }}
              >
                <img
                  src={item?.imageURL}
                  alt={item?.title}
                  className="w-full h-full object-contain"
                />
              </motion.div>

              
              <motion.div
                whileTap={{ scale: 0.75 }}
                className={`w-8 h-8 rounded-full bg-pink-600 flex items-center justify-center cursor-pointer hover:shadow-md -mt-8 ${
                  isFavourited(item.id)
                    ? "bg-yellow-600"
                    : "bg-pink-600"
                }`}
                style=""
                onClick={() => setFav(item) }
              >
                <MdStar className="text-white" />
              </motion.div>

              <motion.div
                whileTap={{ scale: 0.75 }}
                className="w-8 h-8 rounded-full bg-pink-600 flex items-center justify-center cursor-pointer hover:shadow-md -mt-8"
                onClick={() => displayCust(item?.id) }
              >
                <MdShoppingBasket className="text-white" />
              </motion.div>              
            </div>

            <div className="w-full flex flex-col items-end justify-end -mt-8">
              <p className="text-textColor font-semibold text-base md:text-lg">
                {item?.title}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                {item?.calories} Calories
              </p>
              <div className="flex items-center gap-8">
                <p className="text-lg text-headingColor font-semibold">
                  <span className="text-sm text-pink-500">$</span> {item?.price}
                </p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="w-full flex flex-col items-center justify-center">
          <img src={NotFound} className="h-340" alt="Not Found" />
          <p className="text-xl text-headingColor font-semibold my-2">
            Items Not Available
          </p>
        </div>
      )}
    </div>
  );
};

export default RowContainer;
