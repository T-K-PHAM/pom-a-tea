// import React, { useEffect, useState } from "react";
import * as React from 'react';

const UserDashboardPomPerksContainer = () => {

    return (
        
    <div>
        <h1 className="text-headingColor text-2xl font-bold py-6 underline">
            PomPerks
        </h1>
        {/* Utililzing Stripe Pricing Table to generate and render assets */}
        <stripe-pricing-table pricing-table-id="prctbl_1MpFRMLt85wR41tvIGM7vNS3"
            publishable-key="pk_test_51Mn3zzLt85wR41tvOpq9mNwgmCRCg7iOw295i8JpVRiwNQICSSbk4oEguxNbxF0mp80uQWL09iq4zOmnji1G4PXj00QWA9y8Wl">
        </stripe-pricing-table>
        
    </div>
    );
};

export default UserDashboardPomPerksContainer;