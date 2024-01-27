import React, { useEffect, useRef, useState } from "react";

// The PomPerks component that is displayed on the Main Container and UserDashboard Container
const PomPerkz = () => {


  return (
    <section className="w-full my-6" id="PomPerkz">
        <div className="w-full flex items-center justify-between">
          <p className="text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-32 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-pink-400 to-pink-600 transition-all ease-in-out duration-100">
            Subscriptions
          </p>
        </div>
        {/* Utilizing Stripe Pricing Table to generate and render assets */}
            <stripe-pricing-table pricing-table-id="prctbl_1MpFRMLt85wR41tvIGM7vNS3"
            publishable-key="pk_test_51Mn3zzLt85wR41tvOpq9mNwgmCRCg7iOw295i8JpVRiwNQICSSbk4oEguxNbxF0mp80uQWL09iq4zOmnji1G4PXj00QWA9y8Wl">
            </stripe-pricing-table>
      </section>
  );
};

export default PomPerkz;
