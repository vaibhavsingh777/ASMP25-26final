import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./Sneakpeak.css";
import CursorAnimation from "../CursorAnimation";

const slides = [
  {
    title: "ML engineer, Meta",
    location: "London",
    description: "Electrical Engineering DD 2014",
    link: "/Login",
    buttonText: "Grab Mentorship Now!",
  },
  {
    title: "Senior Scientist, University of Twente",
    location: "Netherlands",
    description: "Engineering Physics, 2014",
    link: "/Login",
    buttonText: "Grab Mentorship Now!",
  },
  {
    title: "Senior Director, Software Engineering, Salesforce, Inc",
    location: "Sunnyvale, US",
    description: "Computer Science Engineering, 1993",
    link: "/Login",
    buttonText: "Grab Mentorship Now!",
  },
  {
    title: "Strategy- Director's Office, Reliance Industries Limited",
    location: "Mumbai",
    description: "Electrical Engineering, 2011",
    link: "/Login",
    buttonText: "Grab Mentorship Now!",
  },
  {
    title: "Manager, Data Science and Business Analytics, ICICI Bank",
    location: "Bangalore",
    description: "MEMS, 2020",
    link: "/Login",
    buttonText: "Grab Mentorship Now!",
  },
];

function Sneakpeak() {
  const scrollRef = useRef(null);
  const intervalRef = useRef(null);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const scroll = () => {
      if (!scrollRef.current || hovering) return;
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      if (scrollLeft + clientWidth >= scrollWidth) {
        scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        scrollRef.current.scrollBy({ left: 400, behavior: "smooth" });
      }
    };

    intervalRef.current = setInterval(scroll, 3000);
    return () => clearInterval(intervalRef.current);
  }, [hovering]);

  const scrollByAmount = (amount) => {
    scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <>
      <CursorAnimation />
      <div className="sneakpeak-container">
       
        <div className="arrow left" onClick={() => scrollByAmount(-400)}>&#8592;</div>
        <div
          className="scroll-wrapper"
          ref={scrollRef}
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
        >
          {slides.map((slide, i) => (
            <motion.div
              className="mentor-card"
              key={i}
              whileHover={{ scale: 1.05, rotateY: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h4><b>{slide.title}</b></h4>
              <h6><b>{slide.location}</b></h6>
              <p>{slide.description}</p>
              <div className="btn-wrapper">
                <Link to={slide.link}>
                  <button className="btn">{slide.buttonText}</button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="arrow right" onClick={() => scrollByAmount(400)}>&#8594;</div>
      </div>
    </>
  );
}

export default Sneakpeak;