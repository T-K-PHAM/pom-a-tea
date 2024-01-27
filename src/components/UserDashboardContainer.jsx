// import React from "react";
// import { DBLeftSection, DBRightSection } from ".";
import { UserDashboardLeftContainer, UserDashboardRightContainer } from ".";

// Main User Dashboard Container that stores the left and right containers for User Dashboard
const UserDashboardContainer = () => {
    return <div className="w-screen h-screen flex items-center bg-primary">
        <UserDashboardLeftContainer />
        <UserDashboardRightContainer />
    </div>
};

export default UserDashboardContainer;