import React, { useState, useEffect, useCallback } from "react";
import "./Profile.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import UseFetchProfile from "../hooks/useFetchProfile";
import UseEditProfile from "../hooks/useEditProfile";
import UseRegisterMentors from "../hooks/useRegisterMentors";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import WishlistModal from "./WishlistModal/WishlistModal";
import CursorAnimation from "./CursorAnimation";
import Swal from "sweetalert2";

export default function Profile(props) {
  const DEGREE_CHOICES = {
    btech: "B.Tech.",
    bs: "B.S.",
    dual_degree: "Dual Degree",
    mtech: "M.Tech.",
    msc: "M.Sc.",
    phd: "PhD",
    other_degree: "Other Degree",
  };

  const BRANCH_CHOICES = {
    aero: "Aerospace Engineering",
    cse: "Computer Science Engineering",
    ee: "Electrical Engineering",
    mech: "Mechanical Engineering",
    chem: "Chemistry",
    biosci: "Biosciences & Bioengineering",
    che: "Chemical Engineering",
    eco: "Economics",
    ieor: "Industrial Engineering and Operations Research",
    metallurgy: "Metallurgical Engineering and Material Science",
    engphy: "Engineering Physics",
    envsci: "Environmental Science & Engineering",
    energy: "Energy Science & Engineering",
    math: "Mathematics",
    civil: "Civil Engineering",
    earthsci: "Earth Sciences and Resource engineering",
    rural: "Technology for Rural Areas",
    design: "Design",
    other: "Other (If not mentioned above)",
  };

  const { editProfile, loading1, error, success: editSuccess } = UseEditProfile();
  const { fetchProfile, fetchedProfile } = UseFetchProfile();
  const { registerMentors, error: registerError, success: registerSuccess } = UseRegisterMentors(props);

  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({
    user: {},
    email: "",
    hostel: "",
    room_no: "",
    academic_program: "",
    joining_year: "",
    graduation_year: "",
    linkedin: "",
    sop: "",    
    expectations: "",
  });

  // Modal and preferences state
  const [preferences, setPreferences] = useState([
    null,
    null,
    null,
    null,
    null,
  ]);

  const [showWishlist, setShowWishlist] = useState(false);
  const [activeCard, setActiveCard] = useState(null);

  // Load profile and preferences
  useEffect(() => {
    const loadProfile = async () => {
      await fetchProfile();
      setLoading(false);
    };
    loadProfile();
  }, [fetchProfile]);

  useEffect(() => {
    if (fetchedProfile) {
      setProfile((prevProfile) => ({
        ...prevProfile,
        user: fetchedProfile.user || {},
        email: fetchedProfile.email || "",
        hostel: fetchedProfile.hostel || "",
        room_no: fetchedProfile.room_no || "",
        joining_year: fetchedProfile.joining_year || "",
        graduation_year: fetchedProfile.graduation_year || "",
        linkedin: fetchedProfile.linkedin || "",
        sop: fetchedProfile.sop || "",
        expectations: fetchedProfile.expectations || "",
      }));
    }
  }, [fetchedProfile]);

  // Load preferences
  useEffect(() => {
    const loadPreferences = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const resp = await fetch(
          "http://127.0.0.1:8000/api/registration/my-preferences/",
          {
            headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        const data = await resp.json();
        console.log("This is the data that i am testing: ", data);

        setPreferences([
          data.pref1,
          data.pref2,
          data.pref3,
          data.pref4,
          data.pref5,
        ]);
      } catch {
        setPreferences([null, null, null, null, null]);
      }
    };
    if (fetchedProfile) {
      loadPreferences();
    }
  }, [fetchedProfile]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProfile((prevProfile) => ({ ...prevProfile, [name]: value }));
  };

  const handleSubmit = (event) => {
    const accessToken = localStorage.getItem("accessToken");
    const updatedProfile = {
      ...profile,
      accessToken,
      email: profile.email,
      hostel: profile.hostel,
      room_no: profile.room_no,
      joining_year: profile.joining_year,
      graduation_year: profile.graduation_year,
      sop: profile.sop,
      expectations: profile.expectations,
    };
    editProfile(updatedProfile);
  };

  async function handleRegisteration() {
    try {
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

  // Card click handler to open wishlist modal for the selected preference slot
  const handleCardClick = useCallback((index) => {
    console.log("Card clicked:", index);
    setActiveCard(index);
    setShowWishlist(true);
  }, []);

  // Close modal handler
  const handleCloseModal = useCallback(() => {
    console.log("Closing modal");
    setShowWishlist(false);
    setActiveCard(null);
  }, []);

  // Mentor selection handler - assign selected mentor to active preference and close modal
  const handleMentorSelect = useCallback(
    async (mentor) => {
      if (activeCard === null || activeCard === undefined) {
        console.error("No active card selected.");
        return;
      }
      console.log("Mentor selected: ", mentor);

      try {
        const newPrefs = [...preferences];
        newPrefs[activeCard] = mentor;
        setPreferences(newPrefs);

        // Update backend
        const slotKey = `pref${activeCard + 1}_id`;

        const token = localStorage.getItem("accessToken");
        await fetch("http://127.0.0.1:8000/api/registration/my-preferences/", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify({ [slotKey]: mentor.id }),
        });

        // Close modal
        handleCloseModal();
      } catch (error) {
        console.error("Error selecting mentor:", error);
      }
    },
    [preferences, activeCard, handleCloseModal]
  );

  // Remove mentor handler
  const handleRemove = useCallback(
    async (i, e) => {
      e.stopPropagation(); // Prevent card click from triggering modal
      try {
        const newPrefs = [...preferences];
        newPrefs[i] = null;
        setPreferences(newPrefs);

        const slotKey = `pref${i + 1}_id`;

        const token = localStorage.getItem("accessToken");
        await fetch("http://127.0.0.1:8000/api/registration/my-preferences/", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify({ [slotKey]: null }),
        });
      } catch (error) {
        console.error("Error removing mentor:", error);
      }
    },
    [preferences]
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!fetchedProfile) {
    return <div>No profile data available.</div>;
  }

  return (
    <>
      <CursorAnimation />
      <Container
        className="w-screen min-h-screen py-24 profile cursor-auto"
        fluid
      >
        <h1 className="md:pt-5 xl:py-0 text-center text-[background: #FFFFFF]">
          User Profile
        </h1>

        <Row className="lg:px-20">
          <Col className="my-2 md:text-2xl text-sm" md={3} xs>
            Roll Number
          </Col>
          <Col
            className="bg-[#BDD4E7AB] text-black my-2 rounded-xl md:text-2xl text-sm justify-center items-center flex opacity-80"
            md={6}
            xs
          >
            {fetchedProfile.user.roll}
          </Col>
        </Row>

        <Row className="lg:px-20">
          <Col className="my-2 md:text-2xl text-sm" md={3} xs>
            Username
          </Col>
          <Col
            className="bg-[#BDD4E7AB] text-black my-2 rounded-xl md:text-2xl text-sm justify-center items-center flex opacity-80"
            md={6}
            xs
          >
            {fetchedProfile.user.fullname}
          </Col>
        </Row>

        <Row className="lg:px-20">
          <Col className="my-2 md:text-2xl text-sm" md={3} xs>
            LDAP
          </Col>
          <Col
            className="bg-[#BDD4E7AB] text-black my-2 rounded-xl md:text-2xl text-sm justify-center items-center flex opacity-80"
            md={6}
            xs
          >
            {fetchedProfile.user.ldap}
          </Col>
        </Row>

        <Row className="lg:px-20">
          <Col className="my-2 md:text-2xl text-sm" md={3} xs>
            Personal Email
          </Col>
          <Col
            className="bg-[#BDD4E7AB] text-black my-2 rounded-xl md:text-2xl text-sm justify-center items-center flex opacity-80"
            md={6}
            xs
          >
            <input
              type="text"
              onChange={handleInputChange}
              name="email"
              value={profile.email}
              className="bg-transparent text-black md:mx-5 my-2 rounded-xl md:text-2xl text-xs sm:p-0 p-1 justify-center items-center flex opacity-80 w-full text-center"
              placeholder="Personal Email"
            />
          </Col>
        </Row>

        <Row className="lg:px-20">
          <Col className="my-2 md:text-2xl text-sm" md={3} xs>
            Hostel:
          </Col>
          <Col
            className="bg-[#BDD4E7AB] text-black my-2 rounded-xl md:text-2xl text-sm justify-center items-center flex opacity-80"
            md={6}
            xs
          >
            <input
              type="text"
              onChange={handleInputChange}
              name="hostel"
              value={profile.hostel}
              className="bg-transparent text-black md:mx-5 my-2 rounded-xl md:text-2xl text-xs sm:p-0 p-1 justify-center items-center flex opacity-80 w-full text-center"
              placeholder="Hostel"
            />
          </Col>
        </Row>

        <Row className="lg:px-20">
          <Col className="my-2 md:text-2xl text-sm" md={3} xs>
            Room No:
          </Col>
          <Col
            className="bg-[#BDD4E7AB] text-black my-2 rounded-xl md:text-2xl text-sm justify-center items-center flex opacity-80"
            md={6}
            xs
          >
            <input
              type="text"
              onChange={handleInputChange}
              name="room_no"
              value={profile.room_no}
              className="bg-transparent text-black md:mx-5 my-2 rounded-xl md:text-2xl text-xs sm:p-0 p-1 justify-center items-center flex opacity-80 w-full text-center"
              placeholder="Room No."
            />
          </Col>
        </Row>

        <Row className="lg:px-20 ">
          <Col className="my-2 md:text-2xl text-sm" md={3} xs>
            Academic:
          </Col>
          <Col
            className="bg-[#BDD4E7AB] text-black md:mx-5 mx-2 my-2 rounded-xl md:text-2xl text-sm sm:p-4 p-1 justify-center items-center flex opacity-80 text-center"
            xl={3}
            xs={5}
            sm={4}
          >
            {BRANCH_CHOICES[fetchedProfile.user.dept]}
          </Col>
          <Col
            className="bg-[#BDD4E7AB] text-black md:mx-5 mx-2 my-2 rounded-xl md:text-2xl text-sm sm:p-4 p-1 justify-center items-center flex opacity-80 text-center"
            xl={3}
            xs={5}
            sm={4}
          >
            {DEGREE_CHOICES[fetchedProfile.user.degree]}
          </Col>

          <Row className="lg:px-20">
            <Col className="my-2 md:text-2xl" md={3} xs></Col>
            <Col
              className="bg-[#BDD4E7AB] text-black md:mx-5 mx-2 my-2 rounded-xl md:text-2xl text-sm sm:p-4 p-1 justify-center items-center flex opacity-80 text-center"
              xl={3}
              xs={5}
              sm={4}
            >
              <input
                type="text"
                onChange={handleInputChange}
                name="joining_year"
                value={profile.joining_year}
                className="bg-transparent text-black md:mx-5 my-2 rounded-xl md:text-2xl text-xs sm:p-0 p-1 justify-center items-center flex opacity-80 w-full text-center"
                placeholder="Joining Year"
              />
            </Col>
            <Col
              className="bg-[#BDD4E7AB] text-black md:mx-5 mx-2 my-2 rounded-xl md:text-2xl text-sm sm:p-4 p-1 justify-center items-center flex opacity-80 text-center"
              xl={3}
              xs={5}
              sm={4}
            >
              <input
                type="text"
                onChange={handleInputChange}
                name="graduation_year"
                value={profile.graduation_year}
                className="bg-transparent text-black md:mx-5 my-2 rounded-xl md:text-2xl text-xs sm:p-0 p-1 justify-center items-center flex opacity-80 w-full text-center"
                placeholder="Graduation Year"
              />
            </Col>
          </Row>
        </Row>

        <Row className="lg:px-20">
          <Col className="my-2 md:text-2xl text-sm" md={3} xs>
            LinkedIn ID:
          </Col>
          <Col
            className="bg-[#BDD4E7AB] text-black my-2 rounded-xl md:text-2xl text-sm justify-center items-center flex opacity-80"
            md={6}
            xs
          >
            <input
              type="text"
              onChange={handleInputChange}
              name="linkedin"
              value={profile.linkedin}
              className="bg-transparent text-black md:mx-5 my-2 rounded-xl md:text-2xl text-xs sm:p-0 p-1 justify-center items-center flex opacity-80 w-full text-center"
              placeholder="LinkedIn ID"
            />
          </Col>
        </Row>

        <Row className="lg:px-20">
          <Col className="my-2 md:text-2xl text-sm" md={3} xs>
            SOP
          </Col>
          <Col
            className="bg-[#BDD4E7AB] text-black my-2 rounded-xl justify-center items-center flex opacity-80"
            md={9}
            xs={7}
          >
            <InputGroup size="xs" className="h-[150px]">
              <Form.Control
                as="textarea"
                aria-label="With textarea"
                onChange={handleInputChange}
                name="sop"
                value={profile.sop}
                className="text-black h-[100px] bg-[#BDD4E7AB] rounded-xl p-2"
              />
            </InputGroup>
          </Col>
        </Row>

        <Row className="lg:px-20">
          <Col className="my-2 md:text-2xl text-sm" md={3} xs>
            What are your Expectations from Mentor?
          </Col>
          <Col
            className="bg-[#BDD4E7AB] text-black my-2 rounded-xl justify-center items-center flex opacity-80"
            md={9}
            xs={7}
          >
            <InputGroup size="xs" className="h-[130px]">
              <Form.Control
                as="textarea"
                aria-label="With textarea"
                className="text-black"
                onChange={handleInputChange}
                name="expectations"
                value={profile.expectations}
              />
            </InputGroup>
          </Col>
        </Row>

        <Row>
          <Col className="flex justify-center items-center my-5">
            <Button
              onClick={handleSubmit}
              className="p-3 bg-[#83267E] text-white hover:bg-[#6b1f68] transition-colors duration-300 border-none"
            >
              Save Profile
            </Button>
          </Col>
        </Row>

        <h1 className="md:pt-5 xl:py-0 text-center text-[background: #FFFFFF]">
          Mentor Preferences
        </h1>

        <div className="min-h-screen bg-cover bg-center p-8 ">
          <div className="flex flex-wrap justify-center gap-20">
            {preferences.map((mentor, i) => (
              <div
                key={i}
                className="w-80 h-96 bg-[#932C92] border-3 border-white flex flex-col justify-between shadow-[0px_0px_3px_7px_#FFFFFF] cursor-pointer"
                onClick={() => handleCardClick(i)}
              >
                <div className="bg-[#A742A4] text-white text-center text-sm rounded-b-[49px] rounded-t-none px-2 py-16">
                  {mentor ? (
                    <>
                      <b>{mentor.fullname}</b>
                      <br />
                      <span>{mentor.designation}</span>
                    </>
                  ) : (
                    <>
                      Please select your
                      <br />
                      Preference {i + 1}
                    </>
                  )}
                </div>
                <div className="flex-grow"></div>
                {mentor && (
                  <button
                    className="m-3 bg-[#A742A4] text-white text-[25px] font-serif font-medium px-3 py-2 rounded-sm hover:bg-[#ba68c8] transition"
                    onClick={(e) => handleRemove(i, e)}
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <Row>
          <Col className="flex justify-center items-center my-5">
            <Button
              onClick={handleRegisteration}
              className="p-3 bg-[#83267E] text-white hover:bg-[#6b1f68] transition-colors duration-300 border-none"
            >
              Register!
            </Button>
          </Col>
        </Row>

        {/* Modal rendered OUTSIDE of cards - this is KEY! Pass activeCard */}
        {showWishlist && (
          <WishlistModal
            onClose={() => {
              setShowWishlist(false);
              setActiveCard(null);
            }}
            onSelect={handleMentorSelect}
          />
        )}
      </Container>
    </>
  );
}