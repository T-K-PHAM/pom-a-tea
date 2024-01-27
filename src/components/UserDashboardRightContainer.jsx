import React from "react";
import { Route, Routes } from "react-router-dom";
// import {DBHeader, DBHome, DBItems, DBNewItem, DBOrders, DBUsers} from "../components";
import {DBHeader, UserDashboardProfileContainer, UserDashboardPomPerksContainer, DBOrders } from "../components";

// The Right hand side of the User Dashboard that contains the routes for user profile and pomperks
const UserDashboardRightContainer = () => {
    return (
        <div className="flex flex-col py12 px-12 flex-1 h-full">
            {/* <DBHeader /> */}
            <div className="flex flex-col flex-1 overflow-y-scroll scrollbar-none">
                <Routes>
                    <Route path="/profile" element={<UserDashboardProfileContainer />} />
                    <Route path="/pomperks" element={<UserDashboardPomPerksContainer />} />
                </Routes>
            </div>
        </div>
    );
};

export default UserDashboardRightContainer;