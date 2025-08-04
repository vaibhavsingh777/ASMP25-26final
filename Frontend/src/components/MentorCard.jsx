import React, { useState, useEffect } from "react";
import "./MentorCard.css";
import Swal from "sweetalert2";
import UseAddToWishlist from "../hooks/useAddToWishlist";
import UseFetchWishlist from "../hooks/useFetchWishlist";

const MentorCard = ({ mentor }) => {
  const [clicked, setClicked] = useState(false);
  const { addMentor } = UseAddToWishlist();
  const [isInWishlist, setIsInWishlist] = useState(false);
  const { fetchMentors, mentors } = UseFetchWishlist();

const handleClick = async () => {
  if (!isInWishlist) {
    setClicked((prevState) => !prevState);
    await addToWishlist(mentor.id); // Don't set wishlist here
  }
};


  async function addToWishlist(id) {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to add this mentor to the wishlist",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
  await addMentor(id);
  setIsInWishlist(true); // ✅ Now this is correct
  Swal.fire("Added!", "Mentor has been added to wishlist.", "success");
}

    });
  }

  useEffect(() => {
    const checkWishlist = async () => {
      await fetchMentors();
      const mentorInWishlist = mentors.some((item) => item.id === mentor.id);
      setIsInWishlist(mentorInWishlist);
    };
    checkWishlist();
  }, [mentor.id, fetchMentors]);

  return (
    <div style={{ margin: "1rem", height: "fit-content" }}>
      <div
        className="mentor-ke-card"
        style={{
          backgroundColor: mentor.should_show ? "rgba(96, 184, 208, 0.79)" : "grey",
          opacity: mentor.should_show ? 1 : 0.5,
          pointerEvents: mentor.should_show ? "all" : "none",
        }}
      >
        <div className="mentor-first-div"></div>
        <div className="mentor-upper-card">
          {/*<div className="mentor-id-div">
            Mentor ID: {mentor.should_show ? mentor.id : "-"}
          </div>*/}
          <div className="card-header">{mentor.designation}</div>
          <div className="card-header">{mentor.company_name}</div>
        </div>
        <div className="lower-card-body">
          {/* <p className="card-text">
            Experience: {mentor.designation}
          </p> */}
          <p className="card-text">Graduation year: {mentor.year}</p>
          <p className="mentor-id-div">Work Profile: {mentor.work_profile}</p>
        </div>
        <div className="add-to-wishlist">
          <p
            style={{
              marginBottom: 0,
              transition: "all 0.3s ease",
                  color: isInWishlist ? "rgba(255, 0, 238, 0.88)" : "#ffffff", // Example: Gold if added, white if not
    cursor: "pointer"
            }}
            onClick={handleClick}
          >
            Add to Wishlist {isInWishlist ? "\u2691" : "\u2690"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MentorCard;
