import React, { useEffect, useState } from "react";
import {getAuth} from "firebase/auth";
import { app } from "../firebase.config";
import { firestore } from "firebase/firestore";
//import {} from "firebase";
// const firestore = firebase.firestore();

// The User Profile Container that displays information about the user via firebase auth
const UserDashboardProfileContainer = () => {
    const auth = getAuth(app);
    return (
        <div>
          <div className="flex flex-row pb-5 pt-5">
            <p className="pr-5"><img className="rounded-full"src={auth.currentUser?.photoURL}></img></p>
            <h1 className="text-headingColor text-2xl font-bold py-6 underline">
              {auth.currentUser?.displayName}'s Profile
            </h1>
          </div>
        <p>Name: {auth.currentUser?.displayName}</p>
        <p>Email Address: {auth.currentUser?.email}</p>
        
        </div>
    );
};

export default UserDashboardProfileContainer;
