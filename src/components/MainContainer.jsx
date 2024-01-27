import React, { useEffect, useState } from "react";
import HomeContainer from "./HomeContainer";
import { motion } from "framer-motion";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import RowContainer from "./RowContainer";
import { useStateValue } from "../context/StateProvider";
import MenuContainer from "./MenuContainer";
import CartContainer from "./CartContainer";
import CustomizeContainer from "./CustomizeContainer";
import AboutusContainer from "./AboutUsContainer";
import PomPerkz from "./PomPerkz";
import FavouriteContainer from "./FavouriteContainer";


const MainContainer = () => {
  const [{ bbtItems, cartShow, custShow }, dispatch] = useStateValue();
  const [scrollValue, setScrollValue] = useState(0);

  useEffect(() => {}, [scrollValue, cartShow, custShow]);

  return (
    <div className="w-full h-auto flex flex-col items-center justify-center">
      <HomeContainer />

      <section className="w-full my-6">   
        <div className="w-full flex items-center justify-between">     
          <p className="text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-32 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-pink-400 to-pink-600 transition-all ease-in-out duration-100">
            Our Popular Selection Of The Week
          </p>

          <div className="hidden md:flex gap-3 items-center">
            <motion.div
              whileTap={{ scale: 0.75 }}
              className="w-8 h-8 rounded-lg bg-pink-300 hover:bg-pink-500 cursor-pointer  hover:shadow-lg flex items-center justify-center"
              onClick={() => setScrollValue(-200)}
            >
              <MdChevronLeft className="text-lg text-white" />
            </motion.div>
            <motion.div
              whileTap={{ scale: 0.75 }}
              className="w-8 h-8 rounded-lg bg-pink-300 hover:bg-pink-500 cursor-pointer transition-all duration-100 ease-in-out hover:shadow-lg flex items-center justify-center"
              onClick={() => setScrollValue(200)}
            >
              <MdChevronRight className="text-lg text-white" />
            </motion.div>
          </div>
        </div>
        <RowContainer
          scrollValue={scrollValue}
          flag={true}
          data={bbtItems?.filter((n) => n.category === "milktea")}
        />
      </section>

      <MenuContainer />
     

      <FavouriteContainer />
      <PomPerkz />
      <AboutusContainer />
      {cartShow && <CartContainer />}
      
      {custShow && <CustomizeContainer />}
    </div>
  );
};

export default MainContainer;
