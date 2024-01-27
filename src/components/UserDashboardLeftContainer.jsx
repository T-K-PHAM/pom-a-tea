import React from "react";
import { NavLink } from "react-router-dom";
import { isActiveStyles, isNotActiveStyles } from "../utils/style";


// Left Container for User Dashboard
const UserDashboardLeftContainer = () => {
    return (
    // NavLinks for left hand side of Dashboard
    <div className="h-full relative right-16 top-3.5 py-12 flex-col bg-lightOverlay backdrop-blur-md shadow-md min-w-210 w-300 gap-4">       
        <ul className="flex flex-col gap-4">
        <NavLink 
            // to={"/dashboard/home"}
            to={"/user/profile"}
            className={({ isActive}) =>
                isActive
                    ? `${isNotActiveStyles} px-4 py-2 border-l-8 border-pink-500`
                    : isNotActiveStyles
        }
        >   
        User Profile
        </NavLink>
        <NavLink 
            to={"/user/pomperks"}
            className={({ isActive}) =>
                isActive
                    ? `${isActiveStyles} px-4 py-2 border-l-8 border-pink-500`
                    : isNotActiveStyles
        }
        >   
        PomPerks
        </NavLink>
        </ul>

    <div className="w-full items-center justify-center flex h-225 mt-auto px-2 absolute inset-x-0 bottom-0">
        <div className="w-full h-full rounded-md bg-pink-400 flex items-center justify-center flex-col gap-2 px-3">
            <div className="w-12 h-12 border bg-white rounded-full flex items-center justify-center">
                <p className="text-2xl font-bold text-pink-500">?</p>
            </div>
                <p className="text-xl text-primary font-semibold">Help Center</p>
                <p className="text-base text-gray-300 text-center">Having trouble with your order? Please contact us for more questions</p>
                <p className="px-4 py-2 rounded-full bg-primary text-pink-400 cursor-pointer">Get in touch</p>
                </div>
            </div>
        </div>
    );
};

export default UserDashboardLeftContainer;