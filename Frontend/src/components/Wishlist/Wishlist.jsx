import React, { useState, useEffect } from "react";
import Wishlist_Mentor from "./Wishlist_Mentor";
import CursorAnimation from "../CursorAnimation";
import "./Wishlist.css";
import { gsap } from "gsap";
import Swal from "sweetalert2";
import UseFetchWishlist from "../../hooks/useFetchWishlist";
import UseRegisterMentors from "../../hooks/useRegisterMentors";
import UseDeleteFromWishlist from "../../hooks/useDeleteFromWishlist";
import styled from "styled-components";
import "./Card.css";
import Wishlist_MentorCard from "./Wishlist_MentorCards";

export default function Wishlist(props) {
  const [profile, setProfile] = useState({
    pref1: "",
    pref2: "",
    pref3: "",
    pref4: "",
    pref5: "",
  });

  const [check, setCheck] = useState(false);
  const [showError, setShowError] = useState(null);
  // const [errorBlacklistedMentors, setErrorBlacklistedMentors] = useState(null);
  const [same, setSame] = useState(null);
  const { fetchMentors, setError, loading, error, mentors, setMentors } = UseFetchWishlist();
  const { deleteMentor } = UseDeleteFromWishlist();
  const { registerMentors, error: registerError, success } = UseRegisterMentors(props);
  // const [blacklistedMentors, setBlacklistedMentors] = useState([]);

  const handleInputChange = (index, event) => {
    const { value } = event.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [`pref${index + 1}`]: value,
    }));
  };

  // useEffect(() => {
  //   const blacklisted = mentors.filter(mentor => !mentor.should_show).map(mentor => mentor.id);
  //   setBlacklistedMentors(blacklisted);
  // }, [mentors]);

  useEffect(() => {
    if (
      profile.pref1.length > 0 &&
      profile.pref2.length > 0 &&
      profile.pref3.length > 0 &&
      profile.pref4.length > 0 &&
      profile.pref5.length > 0
    ) {
      setCheck(true);
    } else {
      setCheck(false);
    }

    if (
      profile.pref5.length !== 0 &&
      profile.pref1.length !== 0 &&
      profile.pref2.length !== 0 &&
      profile.pref3.length !== 0 &&
      profile.pref4.length !== 0 &&
      (profile.pref1 == profile.pref2 ||
        profile.pref1 == profile.pref3 ||
        profile.pref1 == profile.pref4 ||
        profile.pref1 == profile.pref5 ||
        profile.pref2 == profile.pref3 ||
        profile.pref2 == profile.pref4 ||
        profile.pref2 == profile.pref5 ||
        profile.pref3 == profile.pref4 ||
        profile.pref3 == profile.pref5 ||
        profile.pref4 == profile.pref5)
    ) {
      setSame("Please enter different preferences");
      setCheck(false);
    } else {
      setSame(null);
      if (
        profile.pref1.length > 0 &&
        profile.pref2.length > 0 &&
        profile.pref3.length > 0 &&
        profile.pref4.length > 0 &&
        profile.pref5.length > 0
      ) {
        setCheck(true);
      }
    }

    if (
      profile.pref1.length > 0 &&
      profile.pref2.length > 0 &&
      profile.pref3.length > 0 &&
      profile.pref4.length > 0 &&
      profile.pref5.length > 0
    ) {
      setShowError(null);
    } else {
      setShowError("Please enter all preferences");
    }

    // const blacklisted = mentors.filter(mentor => !mentor.should_show).map(mentor => mentor.id);
    // const isBlacklisted = (pref) => blacklisted.includes(pref);
    // console.log(isBlacklisted(profile.pref1))
    // console.log(blacklisted)
    // console.log(mentors)

    // if (isBlacklisted(profile.pref1) ||
    //     isBlacklisted(profile.pref2) || 
    //     isBlacklisted(profile.pref3) ||
    //     isBlacklisted(profile.pref4) || 
    //     isBlacklisted(profile.pref5)) {
    //   // setErrorBlacklistedMentors("The mentor is blacklisted, please enter a different mentor");
    //   console.log("one mentor is blacklisted")
    // } else {
    //   setErrorBlacklistedMentors(null);
    // }
  }, [
    profile.pref1,
    profile.pref2,
    profile.pref3,
    profile.pref4,
    profile.pref5,
    profile,
    // blacklistedMentors,
  ]);

  useEffect(() => {
    const { to, set } = gsap;

    function delay(fn, ms) {
      let timer = 0;
      return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(fn.bind(this, ...args), ms || 0);
      };
    }

    const getPoint = (point, i, a, smoothing) => {
      const cp = (current, previous, next, reverse) => {
        const p = previous || current,
          n = next || current,
          o = {
            length: Math.sqrt(
              Math.pow(n[0] - p[0], 2) + Math.pow(n[1] - p[1], 2)
            ),
            angle: Math.atan2(n[1] - p[1], n[0] - p[0]),
          },
          angle = o.angle + (reverse ? Math.PI : 0),
          length = o.length * smoothing;
        return [
          current[0] + Math.cos(angle) * length,
          current[1] + Math.sin(angle) * length,
        ];
      };

      const cps = cp(a[i - 1], a[i - 2], point, false),
        cpe = cp(point, a[i - 1], a[i + 1], true);
      return `C ${cps[0]},${cps[1]} ${cpe[0]},${cpe[1]} ${point[0]},${point[1]}`;
    };

    const getPath = (x, smoothing) => {
      return [
        [2, 2],
        [12 - x, 12 + x],
        [22, 22],
      ].reduce(
        (acc, point, i, a) =>
          i === 0
            ? `M ${point[0]},${point[1]}`
            : `${acc} ${getPoint(point, i, a, smoothing)}`,
        ""
      );
    };

    document.querySelectorAll(".input").forEach((elem) => {
      const clear = elem.querySelector(".clear"),
        input = elem.querySelector("input"),
        { classList } = elem,
        svgLine = clear.querySelector(".line"),
        svgLineProxy = new Proxy(
          {
            x: null,
          },
          {
            set(target, key, value) {
              target[key] = value;
              if (target.x !== null) {
                svgLine.setAttribute("d", getPath(target.x, 0.1925));
              }
              return true;
            },
            get(target, key) {
              return target[key];
            },
          }
        );

      svgLineProxy.x = 0;

      input.addEventListener(
        "input",
        delay(() => {
          const bool = input.value.length;
          to(elem, {
            "--clear-scale": bool ? 1 : 0,
            duration: bool ? 0.5 : 0.15,
            ease: bool ? "elastic.out(1, 0.7)" : "none",
          });
          to(elem, {
            "--clear-opacity": bool ? 1 : 0,
            duration: 0.15,
          });
        }, 250)
      );

      clear.addEventListener("click", () => {
        classList.add("clearing");
        set(elem, {
          "--clear-swipe-left": (input.offsetWidth - 16) * -1 + "px",
        });
        to(elem, {
          keyframes: [
            {
              "--clear-rotate": "45deg",
              duration: 0.25,
            },
            {
              "--clear-arrow-x": "2px",
              "--clear-arrow-y": "-2px",
              duration: 0.15,
            },
            {
              "--clear-arrow-x": "-3px",
              "--clear-arrow-y": "3px",
              "--clear-swipe": "-3px",
              duration: 0.15,
              onStart() {
                to(svgLineProxy, {
                  x: 3,
                  duration: 0.1,
                  delay: 0.05,
                });
              },
            },
            {
              "--clear-swipe-x": 1,
              "--clear-x": input.offsetWidth * -1 + "px",
              duration: 0.45,
              onComplete() {
                input.value = "";
                input.focus();
                to(elem, {
                  "--clear-arrow-offset": "4px",
                  "--clear-arrow-offset-second": "4px",
                  "--clear-line-array": "8.5px",
                  "--clear-line-offset": "27px",
                  "--clear-long-offset": "24px",
                  "--clear-rotate": "0deg",
                  "--clear-arrow-o": 1,
                  duration: 0,
                  delay: 0.7,
                  onStart() {
                    classList.remove("clearing");
                  },
                });
                to(elem, {
                  "--clear-opacity": 0,
                  duration: 0.2,
                  delay: 0.55,
                });
                to(elem, {
                  "--clear-arrow-o": 0,
                  "--clear-arrow-x": "0px",
                  "--clear-arrow-y": "0px",
                  "--clear-swipe": "0px",
                  duration: 0.15,
                });
                to(svgLineProxy, {
                  x: 0,
                  duration: 0.45,
                  ease: "elastic.out(1, 0.75)",
                });
              },
            },
            {
              "--clear-swipe-x": 0,
              "--clear-x": "0px",
              duration: 0.4,
              delay: 0.35,
            },
          ],
        });
        to(elem, {
          "--clear-arrow-offset": "0px",
          "--clear-arrow-offset-second": "8px",
          "--clear-line-array": "28.5px",
          "--clear-line-offset": "57px",
          "--clear-long-offset": "17px",
          duration: 0.2,
        });
      });
    });
  }, []);

  const styles = {
    "@media (max-width: 768px)": {
      formContainer: {
        width: "90%",
        padding: "10px",
      },
      profilelabel: {
        flexBasis: "100%",
        marginBottom: "5px",
      },
      profileinput: {
        width: "100%",
      },
      textarea: {
        width: "100%",
      },
      submitButton: {
        width: "100%",
      },
    },

    profileformArea: {
      backgroundColor: "#000",
      color: "white",
      fontFamily: "'Source Sans Pro', 'Roboto', sans-serif",
      textAlign: "center",
      padding: "20px",
      width: "100vw",
    },
    formContainer: {
      margin: "0 7%",
      marginleft: "10px !important",
      padding: "20px",
      width: "80%",
      backgroundColor: "#000",
      borderRadius: "20px",
    },
    headingContainer: {
      textAlign: "center",
      marginBottom: "20px",
      backgroundColor: "#3D52D5",
      boxShadow: "0px 0px 3px 7px #FFF",
      borderRadius: "10vw",
      margin: "10vh 37vw",
      fontSize: "32px",
      padding: "10px",
      width: "300px",
    },
    profHead: {
      textDecoration: "none", // Remove underline from the text itself
    },
    constituents: {
      display: "flex", // Use flex to place label and input on the same line
      alignItems: "center", // Vertically center the content
      margin: "5px 0", // Add space between label and input field
      width: "100%",
    },
    profilelabel: {
      flexBasis: "30%", // Adjust the label width as needed
      marginRight: "10px",
      color: "#fff",
      fontSize: "20px",
    },
    input: {
      flexBasis: "70%", // Adjust the input width as needed
      border: "none",
      borderBottom: "1px solid #ccc",
      padding: "5px",
      borderRadius: "1rem",
      outline: "none",
      backgroundColor: "#BDD4E7",
      color: "#000",
      fontSize: "20px",
    },
    textarea: {
      width: "100%",
      border: "none",
      borderBottom: "1px solid #ccc",
      padding: "10px",
      borderRadius: "2rem",
      outline: "none",
      backgroundColor: "#BDD4E7",
      height: "150px",
    },
    textCenter: {
      textAlign: "center",
      marginBottom: "20px",
    },
    submitButton: {
      margin: "10px",
      width: "200px",
      textAlign: "center",
      padding: "1%",
      fontFamily: "Fraunces, serif",
      fontSize: "2vw",
      color: "white",
      background: "rgba(48, 82, 52, 0.5)",
      boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.67)",
      backdropFilter: "blur(3px)",
      WebkitBackdropFilter: "blur(9px)",
      border: "3px solid rgba(255, 255, 255, 0.3)",
      borderRadius: "17px",
      lineHeight: "1.2",
    },
  };

  const clearInput = (index) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      [`pref${index + 1}`]: "",
    }));
  };

  // async function handleSubmit() {
  //   try {
  //     // const accessToken = localStorage.getItem("accessToken");
  //     const accessToken = "184b1568-7e1b-4a92-a811-02e91f496510";
  //     profile.accessToken = accessToken;

  //     const swalWithBootstrapButtons = Swal.mixin({
  //       customClass: {
  //         confirmButton: "btn btn-success",
  //         cancelButton: "btn btn-danger",
  //       },
  //       buttonsStyling: false,
  //     });

  //     swalWithBootstrapButtons
  //       .fire({
  //         title: "Are you sure?",
  //         text: "You can register only once",
  //         icon: "warning",
  //         showCancelButton: true,
  //         confirmButtonText: "Yes register!",
  //         cancelButtonText: "No, cancel!",
  //       })
  //       .then((result) => {
  //         if (result.isConfirmed) {
  //           registerMentors(profile);
  //           if (success) {
  //             Swal.fire(
  //               "Registered!",
  //               "You have successfully registered your preferences.",
  //               "success"
  //             );
  //           }
  //         }
  //       });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }
  async function handleSubmit() {
    try {
      // const accessToken = "82cf3f73-f995-4d72-92bb-7c158a38232a";
      const accessToken = localStorage.getItem("accessToken");
      profile.accessToken = accessToken;

      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger",
        },
        buttonsStyling: false,
      });

      swalWithBootstrapButtons
        .fire({
          title: "Are you sure?",
          text: "You can register only once",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes register!",
          cancelButtonText: "No, cancel!",
        })
        .then((result) => {
          if (result.isConfirmed) {
            registerMentors(profile);
            if (success) {
              console.log("Registered successfully");
              Swal.fire(
                "Registered!",
                "You have successfully registered your preferences.",
                "success"
              );
            }
          }
        });
    } catch (err) {
      console.log("Error registering mentors");
      console.log(err);
    }
  }

  async function deleteFromWishlist(id) {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to remove this mentor from wishlist",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteMentor(id);
        const newMentors = [...mentors];
        let something = newMentors.filter((mentor) => mentor.id == id)[0];
        newMentors.splice(newMentors.indexOf(something), 1);
        setMentors(newMentors);
        Swal.fire(
          "Removed!",
          "Mentor has been removed from wishlist, please refresh this page.",
          "success"
        );
      }
    });
  }

  // if (!mentors || mentors.length == 0) {
  //   return (
  //     <div className="loader-container">
  //       <h2 style={{ color: "black" }}>No Mentors in the wishlist</h2>
  //     </div>
  //   );
  // }

  // useEffect(() => {
  //   fetchMentors();
  // }, [mentors]);

  useEffect(() => {
    const checkMentors = async () => {
      await fetchMentors();
    };
    checkMentors();
  }, [fetchMentors]);

  return (
    <>
      <CursorAnimation />
      <div className="wishlist-background-image">
        <div style={{ height: "10vh" }}></div>
        <div className="wishlist-headings-1">Wishlist</div>

        {/* <Wishlist_Mentor /> */}
        <div className="wishlist-mentor-cards-ka-div">
          {mentors && mentors.length > 0 ? (
            mentors.map((mentor, index) => (
              <Wishlist_MentorCard key={mentor.id} mentor={mentor} />
            ))
          ) : (
            <p
              style={{
                fontFamily: "Fraunces, serif",
                fontSize: "4vw",
                lineHeight: "1.2",
                color: "white",
              }}
            >
              No mentors in the wishlist
            </p>
          )}
        </div>

        {/*
         <div className="wishlist-headings-2">Preferences</div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div className={`input ${profile.pref1 ? "clearing" : ""}`}>
            <div className="text">
              <input
                type="text"
                name="pref1"
                placeholder="First Preference Mentor ID"
                value={profile.pref1}
                onChange={(event) => handleInputChange(0, event)}
              />
            </div>
            <button className="clear" onClick={() => clearInput(0)}>
              <svg viewBox="0 0 24 24">
                <path className="line" d="M2 2L22 22" />
                <path className="long" d="M9 15L20 4" />
                <path className="arrow" d="M13 11V7" />
                <path className="arrow" d="M17 11H13" />
              </svg>
            </button>
          </div>

          <div className={`input ${profile.pref2 ? "clearing" : ""}`}>
            <div className="text">
              <input
                type="text"
                name="pref2"
                placeholder="Second Preference Mentor ID"
                value={profile.pref2}
                onChange={(event) => handleInputChange(1, event)}
              />
            </div>
            <button className="clear" onClick={() => clearInput(1)}>
              <svg viewBox="0 0 24 24">
                <path className="line" d="M2 2L22 22" />
                <path className="long" d="M9 15L20 4" />
                <path className="arrow" d="M13 11V7" />
                <path className="arrow" d="M17 11H13" />
              </svg>
            </button>
          </div>

          <div className={`input ${profile.pref3 ? "clearing" : ""}`}>
            <div className="text">
              <input
                type="text"
                name="pref3"
                placeholder="Third Preference Mentor ID"
                value={profile.pref3}
                onChange={(event) => handleInputChange(2, event)}
              />
            </div>
            <button className="clear" onClick={() => clearInput(2)}>
              <svg viewBox="0 0 24 24">
                <path className="line" d="M2 2L22 22" />
                <path className="long" d="M9 15L20 4" />
                <path className="arrow" d="M13 11V7" />
                <path className="arrow" d="M17 11H13" />
              </svg>
            </button>
          </div>

          <div className={`input ${profile.pref4 ? "clearing" : ""}`}>
            <div className="text">
              <input
                type="text"
                name="pref4"
                placeholder="Fourth Preference Mentor ID"
                value={profile.pref4}
                onChange={(event) => handleInputChange(3, event)}
              />
            </div>
            <button className="clear" onClick={() => clearInput(3)}>
              <svg viewBox="0 0 24 24">
                <path className="line" d="M2 2L22 22" />
                <path className="long" d="M9 15L20 4" />
                <path className="arrow" d="M13 11V7" />
                <path className="arrow" d="M17 11H13" />
              </svg>
            </button>
          </div>

          <div className={`input ${profile.pref5 ? "clearing" : ""}`}>
            <div className="text">
              <input
                type="text"
                name="pref5"
                placeholder="Fifth Preference Mentor ID"
                value={profile.pref5}
                onChange={(event) => handleInputChange(4, event)}
              />
            </div>
            <button className="clear" onClick={() => clearInput(4)}>
              <svg viewBox="0 0 24 24">
                <path className="line" d="M2 2L22 22" />
                <path className="long" d="M9 15L20 4" />
                <path className="arrow" d="M13 11V7" />
                <path className="arrow" d="M17 11H13" />
              </svg>
            </button>
          </div>
        </div>
        */}

        <div style={styles.textCenter}>
          {showError && <p style={{ color: "white" }}>{showError}</p>}
          {registerError && <p style={{ color: "white" }}>{registerError}</p>}
          {same && <p style={{ color: "white" }}>{same}</p>}
          <button
            disabled={showError || registerError || same}
            onClick={handleSubmit}
            className="submit-button"
            style={styles.submitButton}
          >
            Register
          </button>
        </div>
      </div>
    </>
  );
}
