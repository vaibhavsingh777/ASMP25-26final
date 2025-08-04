import React, { useState } from "react";
import "./Wishlist_MentorCards.css";
import Swal from "sweetalert2";
import UseDeleteFromWishlist from "../../hooks/useDeleteFromWishlist";

const Wishlist_MentorCard = ({ mentor, mentors, setMentors }) => {
  const [clicked, setClicked] = useState(false);
  const { deleteMentor } = UseDeleteFromWishlist();

  const handleClick = async () => {
    console.log("Clicked!");
    setClicked((prevState) => !prevState);
    await deleteFromWishlist(mentor.id);
  };

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
          "Mentor has been removed from wishlist.",
          "success"
        );
      }
    });
  }

  return (
    <div style={{ margin: "1rem", height: "fit-content" }}>
      <div className="wishlist-card">
        <div className="wishlist-first-div"></div>
        <div className="upper-card">
          {/* <div className="mentor-id-div">
          Mentor ID: {mentor.should_show ? mentor.id : "-"}
          </div>*/}
          <div className="card-header">
            {mentor.designation}
          </div>
          <div className="card-header">
            {mentor.company_name}
          </div>
        </div>
        <div className="lower-card-body">
          {/* <p className="card-text">
            Experience: {mentor.designation}
          </p> */}
          <p className="card-text">
            Graduation year: {mentor.year}
          </p>
        </div>
        <p className="mentor-id-div">
          Work Profile: {mentor.work_profile}
        </p>

        <div className="add-to-wishlist">
          <p
            style={{
              marginBottom: 0,
              transition: "all 0.3s ease",
            }}
            onClick={handleClick}
          >
            Remove from Wishlist {clicked ? "\u2690" : "\u2691"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Wishlist_MentorCard;