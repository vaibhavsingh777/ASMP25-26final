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
import UnifiedMentorCard from "./UnifiedMentorCard";

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
  const [isRegistered, setIsRegistered] = useState(false);

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
          `http://127.0.0.1:8000/api/registration/my-preferences/?accessToken=${token}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        
        if (resp.status === 404) {
          // No registration exists yet, set empty preferences
          setPreferences([null, null, null, null, null]);
          setIsRegistered(false);
          return;
        }
        
        const data = await resp.json();
        console.log("This is the data that i am testing: ", data);

        if (data.error) {
          // Handle error case
          setPreferences([null, null, null, null, null]);
          setIsRegistered(false);
          return;
        }

        setPreferences([
          data.pref1,
          data.pref2,
          data.pref3,
          data.pref4,
          data.pref5,
        ]);
        
        // If we successfully loaded preferences, user is registered
        setIsRegistered(true);
      } catch (error) {
        console.log("Error loading preferences:", error);
        setPreferences([null, null, null, null, null]);
        setIsRegistered(false);
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
      
      // Check if SOP and LinkedIn are filled
      if (!profile.sop || !profile.linkedin) {
        Swal.fire({
          icon: "error",
          title: "Profile Incomplete",
          text: "Please fill in your SOP and LinkedIn before registering for mentors.",
        });
        return;
      }
      
      // Check if all 5 preferences are selected
      const hasAllPreferences = preferences.every(pref => pref !== null && pref !== undefined);
      if (!hasAllPreferences) {
        Swal.fire({
          icon: "error",
          title: "Incomplete Preferences",
          text: "Please select all 5 mentor preferences before registering.",
        });
        return;
      }

      // Validate that all preferences have valid IDs
      const validPreferences = preferences.every(pref => pref && pref.id);
      if (!validPreferences) {
        Swal.fire({
          icon: "error",
          title: "Invalid Preferences",
          text: "Please ensure all mentor preferences are properly selected.",
        });
        return;
      }

      // Prepare registration data with preferences
      const registrationData = {
        accessToken: accessToken,
        pref1_id: preferences[0].id,
        pref2_id: preferences[1].id,
        pref3_id: preferences[2].id,
        pref4_id: preferences[3].id,
        pref5_id: preferences[4].id,
      };

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
            registerMentors(registrationData);
            if (registerSuccess) {
              console.log("Registered successfully");
              setIsRegistered(true);
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

        // Don't make backend call here - just store locally
        // Backend calls will be made during registration

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

        // Don't make backend call here - just store locally
        // Backend calls will be made during registration
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
            LinkedIn ID: <span className="text-red-500">*</span>
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
              placeholder="LinkedIn ID (Required)"
            />
          </Col>
        </Row>

        <Row className="lg:px-20">
          <Col className="my-2 md:text-2xl text-sm" md={3} xs>
            SOP <span className="text-red-500">*</span>
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
                placeholder="Statement of Purpose (Required)"
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

        <Row className="lg:px-20 mb-4">
          <Col className="text-center">
            <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
              <strong>Note:</strong> You must fill in your LinkedIn ID and SOP before you can register for mentor preferences.
            </div>
          </Col>
        </Row>

        <h1 className="md:pt-5 xl:py-0 text-center text-[background: #FFFFFF]">
          Mentor Preferences
        </h1>

        <Row className="lg:px-20 mb-4">
          <Col className="text-center">
            {!isRegistered ? (
              <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded">
                <strong>How to register:</strong> Click on each preference card to select your mentors, then click "Register!" when all 5 preferences are filled.
              </div>
            ) : (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                <strong>Registration Status:</strong> You have successfully registered your mentor preferences. Your selections are now locked.
              </div>
            )}
          </Col>
        </Row>

        <div className="min-h-screen bg-cover bg-center p-8 ">
          <div className="flex flex-wrap justify-center gap-20">
            {preferences.map((mentor, i) => (
              <UnifiedMentorCard
                key={i}
                mentor={mentor}
                mode="profile"
                onSelect={() => !isRegistered && handleCardClick(i)}
                onRemove={() => handleRemove(i)}
                isRegistered={isRegistered}
                mentors={preferences}
                setMentors={setPreferences}
                preferenceIndex={i}
              />
            ))}
          </div>
        </div>

        <Row>
          <Col className="flex justify-center items-center my-5">
            {!isRegistered && (
              <Button
                onClick={handleRegisteration}
                className="p-3 bg-[#83267E] text-white hover:bg-[#6b1f68] transition-colors duration-300 border-none"
              >
                Register!
              </Button>
            )}
            {isRegistered && (
              <div className="text-center">
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                  <strong>Registration Complete!</strong> Your mentor preferences have been submitted successfully.
                </div>
              </div>
            )}
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