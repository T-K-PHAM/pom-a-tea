import React from "react";
import { Route, Routes } from "react-router-dom";
import {AddPromotion, DBPromotion, DBHeader, DBHome, DBItems, DBNewItem, DBOrders, DBUsers} from "../components";

const DBRightSection = () => {
    return (
        <div className="flex flex-col py12 px-12 flex-1 h-full">
            <DBHeader />
            <div className="flex flex-col flex-1 overflow-y-scroll scrollbar-none">
                <Routes>
                    <Route path="/items" element={<DBItems />} />
                    <Route path="/newitem" element={<DBNewItem />} />  
                    <Route path="/promotion" element={<DBPromotion />} />   
                    <Route path="/addpromotion" element={<AddPromotion />} />   
                </Routes>
            </div>
        </div>
    );
};

export default DBRightSection;