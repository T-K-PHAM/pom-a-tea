import React from "react";
import NewIcon from "../img/newicon.png";
import { useStateValue } from "../context/StateProvider";

const HomeContainer = () => {
  const [{ promos }, dispatch] = useStateValue();
  const promoRand = Math.floor(Math.random() * (!!promos ? promos.length : 0));
  const promoItem = !!promos ? promos[promoRand] : undefined;
  //Function to scroll to menu location from Order Now Button
  const scroll = (elementId) => {
    var element = document.getElementById(elementId);
    var headerOffset = 100;
    var elementPosition = element.getBoundingClientRect().top;
    var offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth"
    });
  };

  return (
    <section
      className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full "
      id="home"
    >
      <div className="py-2 flex-1 flex flex-col items-start justify-center gap-6">
        <div className="flex items-center gap-2 justify-center bg-pink-100 px-3 py-1 rounded-full">
          <div className="w-11 h-11 bg-pink-100 rounded-full overflow-hidden">
            <img
              src={NewIcon}
              className="w-full h-full object-contain"
              alt="newicon"
            />
          </div>
          <p className="text-base text-pink-500 font-semibold">
            Online Delivery
          </p>
        </div>

        <p className="text-[2.5rem] lg:text-[4.5rem] font-bold tracking-wide text-headingColor">
          Time for <span className="text-pink-500 text-[3rem] lg:text-[5rem]">Tea?</span> 
        </p>

        <p className="text-base text-textColor text-center md:text-left md:w-[80%]">
        Pom-a-tea offers a variety of drinks that will satisfy your cravings. Come and enjoy our Pom-tastic fresh drinks!
        </p>

        <button
          type="button"
          className="text-white bg-gradient-to-br from-pink-400 to-pink-500 w-full md:w-auto px-4 py-2  rounded-lg hover:shadow-lg transition-all ease-in-out duration-100"
          onClick={() => scroll("menu")}
        >
          Order Now
        </button>
      </div>
      
      <div className="py-2 flex-1 flex-column items-center relative">   
        <div className="w-full flex-column flex-end"> 
            <img
              src={!!promoItem ? promoItem.imageURL : ""}
              className=" ml-auto h-420 w-full lg:w-auto lg:h-650"
              alt="hero-bg"
            />
          <p className="float-right text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-32 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-pink-400 to-pink-600 transition-all ease-in-out duration-100">
            Featured Promo: {!!promoItem ? promoItem.title : ""}
          </p>    
        </div>
      </div>
    </section>
  );
};

export default HomeContainer;
