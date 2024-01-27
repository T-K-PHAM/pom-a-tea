import React, { useState, useEffect, useRef } from "react";
import { useStateValue } from "../context/StateProvider";
import RowContainer from "./RowContainer";


const FavouriteContainer = () => {
    

    const [{favs, bbtItems}, dispatch] = useStateValue();
    
      const isFavourited = (id) => {
        if (!!favs) {
          const alreadyFav = favs.find(x => x === id);
          return !!alreadyFav;
        }
        return false;
      }

    
    return(
        <section className="w-full my-6" id="favourites">
            <div className="w-full flex items-center justify-between">
                <p className="text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-32 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-pink-400 to-pink-600 transition-all ease-in-out duration-100">
                    Favourites
                </p>               
            </div>



        <div className="w-full">
          <RowContainer
            flag={false}
            data={bbtItems?.filter((n) => isFavourited(n.id))}
          />
        </div>
        </section>        
    );
};
export default FavouriteContainer;