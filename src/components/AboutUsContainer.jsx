import React, { useEffect, useRef, useState } from "react";
import Marquee from "react-fast-marquee";
import Logo from "../img/pomtea.png";
import { MDBCard, MDBCardBody, MDBCardText, MDBCardImage } from 'mdb-react-ui-kit';

const AboutUsContainer = () => {


  return (
    <section className="w-full my-6" id="aboutUs">
        <div className="w-full flex items-center justify-between">
          {/* About Us Title Header */}
          <p className="text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-32 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-pink-400 to-pink-600 transition-all ease-in-out duration-100">
            About Us
          </p>
        </div>
        <div className="w-full flex items-center justify-between pt-5">
          {/* To change the color to pink */}
          <p className="text-[2.5rem] lg:text-[2.5rem] font-bold tracking-wide text-headingColor text-center mx-auto">
            A <span className="text-pink-500">Pom-tastic </span>experience you won't forget
          </p>
        </div>
        <div className="w-full flex items-center justify-between px-60 pt-4">
          <p className="text-center mx-auto ">
            As a passionate bubble tea lover, I always dreamed of opening my own bubble tea store. After 
            years of working in a job that didn't fulfill me, I decided to take the leap and pursue my dream. 
            I spent months researching and preparing, sourcing the best ingredients and curating an array of delicious drinks. 
            Running my own bubble tea store is not just a business, but a true passion that brings me joy and fulfillment every day.
          </p>
        </div>
        <div className="w-full flex items-center justify-between pt-5">
          {/* Utililzing React Marquee Fast for animations on About Us Component */}
          <Marquee gradientColor={[245, 243, 243]}>
            <img src={Logo} className="w-16 object-contain mx-12" alt="logo" />
            <img src={Logo} className="w-16 object-contain mx-12" alt="logo" />
            <img src={Logo} className="w-16 object-contain mx-12" alt="logo" />
            <img src={Logo} className="w-16 object-contain mx-12" alt="logo" />
            <img src={Logo} className="w-16 object-contain mx-12" alt="logo" />
            <img src={Logo} className="w-16 object-contain mx-12" alt="logo" />
            <img src={Logo} className="w-16 object-contain mx-12" alt="logo" />
            <img src={Logo} className="w-16 object-contain mx-12" alt="logo" />
            <img src={Logo} className="w-16 object-contain mx-12" alt="logo" />
            <img src={Logo} className="w-16 object-contain mx-12" alt="logo" />
            <img src={Logo} className="w-16 object-contain mx-12" alt="logo" />
          </Marquee>
        </div>
        {/* Info Cards For AboutUs Component */}
        <div className="w-full flex items-center justify-center pt-5 gap-10">
          <MDBCard className="rounded-3xl w-460 shadow-2xl">
            <MDBCardImage src='https://tastylicious.com/wp-content/uploads/2022/05/tapioca-pearls-boba-720x479.jpg' alt='tapiocapearls' position='top' className="rounded-t-3xl w-full h-300"  />
            <MDBCardBody className="rounded-3xl px-5 py-5 h-225 d-flex justify-content-center align-items-center flex-column" >
              <MDBCardText className="pt-3 text-center">
              We insist on making the tapioca pearls from scratch: making the dough, kneading and rolling the dough into small pearls, which creates better texture and aroma for the tapioca. Each bite is unique, satisfying the craving for the perfect taste.
              </MDBCardText>
            </MDBCardBody>
          </MDBCard>
          <MDBCard className="rounded-3xl w-460 shadow-2xl">
            <MDBCardImage src='https://img.freepik.com/premium-photo/concept-chinese-japanese-green-dried-tea-leaves-bamboo-scoop-round-bowl-close-up-natural-wooden-top-view-text-copy-space_137271-256.jpg?w=2000' alt='...' position='top' className="rounded-t-3xl w-full h-300"  />
            <MDBCardBody className="rounded-3xl px-5 py-5 h-225" >
              <MDBCardText className="pt-3 text-center" >
              Quality is our guarantee. From choosing the type of tea leaves, the hand-picking process and roasting with other ingredients, each cup of tea has its own determined aroma and taste. The flavour may be short-lived, but the memory everlasting.
              </MDBCardText>
            </MDBCardBody>
          </MDBCard>
          <MDBCard className="rounded-3xl w-460 shadow-2xl">
            <MDBCardImage src='https://getinspiredeveryday.com/wp-content/uploads/2022/11/Winter-Fruit-Salad-Get-Inspired-Everyday-6.jpg' alt='...' position='top' className="rounded-t-3xl w-full h-300"/>
            <MDBCardBody className="rounded-3xl px-5 py-5 h-225" >
              <MDBCardText className="pt-3 text-center">
              We are committed to using only the freshest fruits in our drinks. We carefully select our fruits based on their ripeness, sweetness, and overall quality. When you order bubble tea from us, you can trust that you're getting only the best.
              </MDBCardText>
            </MDBCardBody>
          </MDBCard>
        </div>
      </section>
  );
};

export default AboutUsContainer;
