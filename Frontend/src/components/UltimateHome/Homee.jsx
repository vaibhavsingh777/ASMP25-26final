import React from 'react';
import About from "../About/About";
import Home from "../Home/Home";
import Faq from "../Faq";
import TestimonialSlider from "../TestimonialSlider/Testimonial";
import CursorAnimation from "../CursorAnimation";
import Lottie from "lottie-react";
import animationData from "../../assets/scroll.json";
import Footer from "../Footer/Footer";
import './Homee.css'

export default function Homee() {
  const scrollAnimation = () => {
    const scrollElement = document.body;
    const currentScrollPosition = scrollElement.scrollTop;
    scrollElement.scrollTo({
      top: currentScrollPosition + 1000,
      behavior: 'smooth'
    });
  };

  return (
    <>
      <div className='home-background-image'>
        <CursorAnimation />
        <div  
          style={{
            position: "fixed",
            bottom: "2%",
            right: "2%",
            width: "5%",
            height: "auto",
            zIndex: 1000,
            cursor: "pointer",
          }}
        >
          <Lottie
            animationData={animationData}
            onClick={() => {
              console.log("Scroll button clicked!");
              scrollAnimation();
            }}
          />
        </div>
        <div style={{width:'100vw',height:'7vh',backgroundColor:'transparent'}}></div>
        <Home />
        <About />
        <div style={{height:'1px'}} id="testimonials"></div>
        <TestimonialSlider />
        <div id="faq"></div>
        <Faq />
        <Footer />
      </div>
    </>
  );
}
