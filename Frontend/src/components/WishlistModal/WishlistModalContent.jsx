import React, { useEffect } from "react";
import UseFetchWishlist from "../../hooks/useFetchWishlist";
import UseDeleteFromWishlist from "../../hooks/useDeleteFromWishlist";
import Swal from "sweetalert2";

// MentorCard: always renders Select and Remove
const MentorCard = ({ mentor, onSelect, onDelete }) => (
  <div
    style={{
      width: "320px",
      height: "280px",
      background: "#932C92",
      border: "3px solid #fff",
      borderRadius: "18px",
      marginBottom: "18px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      boxShadow: "0px 0px 3px 7px #FFFFFF",
      paddingBottom: "11px",
    }}
  >
    <div
      style={{
        background: "#A742A4",
        color: "#fff",
        textAlign: "center",
        fontSize: "17px",
        borderRadius: "0 0 32px 32px",
        padding: "28px 0 6px 0",
      }}
    >
      <strong>{mentor.fullname || mentor.name}</strong>
      <br />
      {mentor.designation || mentor.work_profile || ""}
    </div>
    <div style={{ flexGrow: 1 }}></div>
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "10px",
      }}
    >
      <button
        onClick={() => onSelect(mentor)}
        style={{
          width: "90%",
          background: "#A742A4",
          color: "white",
          fontWeight: "bold",
          fontSize: "16px",
          borderRadius: "6px",
          padding: "7px 0 7px 0",
          border: "none",
          cursor: "pointer",
        }}
      >
        Select
      </button>
      <button
        onClick={() => onDelete(mentor.id)}
        style={{
          width: "90%",
          background: "#8B1E8B",
          color: "white",
          fontWeight: "bold",
          fontSize: "15px",
          borderRadius: "6px",
          padding: "7px 0 7px 0",
          border: "none",
          cursor: "pointer",
        }}
      >
        Remove
      </button>
    </div>
  </div>
);

export default function WishlistModalContent({ onSelect }) {
  const { fetchMentors, loading, error, mentors, setMentors } =
    UseFetchWishlist();
  const { deleteMentor } = UseDeleteFromWishlist();

  useEffect(() => {
    fetchMentors();
  }, [fetchMentors]);

  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You want to remove this mentor from wishlist",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, remove it!",
      });
      if (result.isConfirmed) {
        await deleteMentor(id);
        setMentors((m) => m.filter((mnt) => mnt.id !== id));
        Swal.fire(
          "Removed!",
          "Mentor has been removed from wishlist.",
          "success"
        );
      }
    } catch {
      Swal.fire("Error!", "Failed to remove mentor from wishlist.", "error");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-red-600">Error loading wishlist: {error}</div>
      </div>
    );
  if (!mentors || mentors.length === 0)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-600 text-center">
          <p className="text-lg">No mentors in your wishlist</p>
          <p className="text-sm mt-2">
            Add mentors to your wishlist to see them here.
          </p>
        </div>
      </div>
    );

  return (
    <div style={{ overflowY: "auto", maxHeight: "480px", padding: "0 6px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "8px" }}>My Wishlist</h2>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {mentors.map((mentor) => (
          <MentorCard
            key={mentor.id}
            mentor={mentor}
            onDelete={handleDelete}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
}