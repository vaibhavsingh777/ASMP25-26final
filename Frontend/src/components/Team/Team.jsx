import React from "react";
import "./Team.css";
import instagramIcon from "../../assets/teampage/instagram.svg";
import linkedinIcon from "../../assets/teampage/linkedin.svg";

// Overall Coordinator
import image1 from "../../assets/teampage/Karthik Vaishnav.png";
// ASMP Team
import image9 from "../../assets/teampage/asmpctm1.png";
import image10 from "../../assets/teampage/asmpctm2.png";
import image15 from "../../assets/teampage/ac1.png";
import image16 from "../../assets/teampage/ac2.png";
import image5 from "../../assets/teampage/ac3.png";
import image3 from "../../assets/teampage/ac5.png";
import image14 from "../../assets/teampage/ac5.png";
// Web Team
import image13 from "../../assets/teampage/arush.png";
import image11 from "../../assets/teampage/khushi.png";
import image2 from "../../assets/teampage/kapil.png";
import image7 from "../../assets/teampage/vanshika.png";
import image20 from "../../assets/teampage/aditya.png";
import image21 from "../../assets/teampage/vaibhav.png";
import image22 from "../../assets/teampage/rutika.png";
import image23 from "../../assets/teampage/tarun.png";
// Design Team
import image17 from "../../assets/teampage/designctm1.png";
import image18 from "../../assets/teampage/designctm2.png";
import image25 from "../../assets/teampage/dc1.png";
import image26 from "../../assets/teampage/dc2.png";
import image27 from "../../assets/teampage/dc3.png";
import image28 from "../../assets/teampage/dc4.png";
import image29 from "../../assets/teampage/dc5.png";
import image30 from "../../assets/teampage/dc6.png";

import CursorAnimation from "../CursorAnimation";

const Team = () => {
  const teamData = {
    overallCoordinator: {
      name: "Karthik Vaishnav",
      image: image1,
      instagram: "https://www.instagram.com/kartik__vaishnav/",
      linkedin: "https://www.linkedin.com/in/kartik-vaishnav-12a758251/",
    },

    webTeams: [
      {
        title: "ASMP TEAM 2025-26",
        coreMembers: [
          {
            name: "Aadit Sule",
            image: image9,
            instagram: "https://www.instagram.com/aaadit_s/",
            linkedin: "https://www.linkedin.com/in/aadit-sule/",
          },
          {
            name: "Aastha Maliwal",
            image: image10,
            instagram: "https://www.instagram.com/aasthamaliwal/",
            linkedin: "https://www.linkedin.com/in/aastha-maliwal-2ba2b0287/",
          },
        ],
        coordinators: [
          {
            name: "Manas Gupta",
            image: image15,
            instagram: "https://www.instagram.com/manasgupta1014/",
            linkedin: "https://www.linkedin.com/in/manas-gupta-bb487b317",
          },
          {
            name: "Ridham Saxena",
            image: image16,
            instagram: "https://www.instagram.com/ridham.2006/",
            linkedin:
              "https://www.linkedin.com/in/ridham-saxena-5a1555318?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
          },
          {
            name: "Srishti Poddar",
            image: image5,
            instagram: "https://www.instagram.com/srishtipodda.r/",
            linkedin: "www.linkedin.com/in/srishti-poddar-855944260",
          },
          {
            name: "Vaibhav Kumar",
            image: image14,
            instagram: "https://www.instagram.com/fr._.vaibhav/",
            linkedin: "https://www.linkedin.com/in/vaibhav-kumar-6a7b84330/",
          },
          {
            name: "Jasnoor Kaur",
            image: image3,
            instagram: "https://www.instagram.com/_noor._.78/",
            linkedin: "linkedin.com/in/jasnoor-kaur-24b40734a",
          },
        ],
      },
      {
        title: "WEB TEAM 2025-26",
        coreMembers: [
          {
            name: "Arush Srivastava",
            image: image13,
            instagram: "https://www.instagram.com/itss.arushhh/",
            linkedin:
              "https://www.linkedin.com/in/arush-narayan-srivastav-001/",
          },
          {
            name: "Khushi Yadav",
            image: image11,
            instagram: "https://www.instagram.com/yadavk_18/",
            linkedin: "https://www.linkedin.com/in/khushi-yadav-0275b6293/",
          },
        ],
        coordinators: [
          {
            name: "Kapil Chhipa",
            image: image2,
            instagram:
              "https://www.instagram.com/kapi_lchhipa?igsh=M2ZsNHAyM2o4dDR4",
            linkedin: "https://www.linkedin.com/in/kapil-chhipa-05a741330/",
          },
          {
            name: "Aditya Chaurasiya",
            image: image20,
            instagram: "https://www.instagram.com/adityachaurasiya.8807/",
            linkedin:
              "https://www.linkedin.com/in/aditya-chaurasiya-70785531b/",
          },
          {
            name: "Vaibhav Singh",
            image: image21,
            instagram: "https://www.instagram.com/cheekycaibhav/",
            linkedin: "www.linkedin.com/in/vaibhav-singh-35110022a",
          },
          {
            name: "Rutika Hake",
            image: image22,
            instagram:
              "https://www.instagram.com/rutikahake?igsh=MXF2d3FxbTNpODEzaA==",
            linkedin: "https://www.linkedin.com/in/rutika-hake-990787322",
          },
          {
            name: "Tarun Kadam",
            image: image23,
            instagram:
              "https://www.instagram.com/tarunkadam06?igsh=MXd5MnNnbnk2anRkeg==",
            linkedin: "https://www.linkedin.com/in/tarun-kadam-657a44330",
          },
          {
            name: "Vanshika Nalamasa",
            image: image7,
            instagram:
              "https://www.instagram.com/vanshikazz0405?igsh=MXV1ZDdnYXZwaGwzNQ==",
            linkedin: "https://www.linkedin.com/in/vanshika-nalamasa-04b6bb326",
          },
        ],
      },
      {
        title: "DESIGN TEAM 2025-26",
        coreMembers: [
          {
            name: "Sarthak Hase",
            image: image17,
            instagram:
              "https://www.instagram.com/sarthak_hase?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
            linkedin: "https://www.linkedin.com/in/sarthak-hase-9503aa241/",
          },
          {
            name: "Gayatri Sahu",
            image: image18,
            instagram: "https://www.instagram.com/_gayu_02__/",
            linkedin: "https://www.linkedin.com/in/gayatri-sahu-948310295/",
          },
        ],
        coordinators: [
          {
            name: "Ayushi Sahani",
            image: image25,
            instagram:
              "https://www.instagram.com/ay_ushi6556?igsh=cWQ4cm5nZjE5OHBp",
            linkedin:
              "https://www.linkedin.com/in/ayushi-sahani-922bb5369?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
          },
          {
            name: "Manvi Sheth",
            image: image26,
            instagram: "https://www.instagram.com/ivnam_9/",
            linkedin: "https://www.linkedin.com/in/manvi-sheth-18725a379/",
          },
          {
            name: "Rutuparn Ranade ",
            image: image27,
            instagram: "https://www.instagram.com/ingenious_rutu/",
            linkedin: "https://www.linkedin.com/in/rutuparn-ranade-95623b340/",
          },
          {
            name: "Shravanee Kulkarni",
            image: image28,
            instagram:
              "https://www.instagram.com/shravanee_09?igsh=eDZqazd0Y3E1NDRn",
            linkedin:
              "https://www.linkedin.com/in/shravanee-kulkarni-230989356/",
          },
          {
            name: "Umesh Motiwale",
            image: image29,
            instagram:
              "https://www.instagram.com/umesh_motiwale?igsh=MWV0NmZmdDFrZ3J1MA==",
            linkedin:
              "https://www.linkedin.com/in/umesh-motiwale-289132319?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
          },
          {
            name: "Viraj Jadhav",
            image: image30,
            instagram:
              "https://www.instagram.com/viraj_jadhav_0108?igsh=b243dWx6aW1samZt-- ",
            linkedin:
              "https://www.linkedin.com/in/viraj-jadhav-7b4933346?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
          },
        ],
      },
    ],
  };

  const renderMember = (member, isOverall = false) => (
    <div className="team-member">
      <div
        className={isOverall ? "image-circle-large" : "image-circle"}
        style={{ backgroundImage: `url(${member.image})` }}
      ></div>
      <div className="name">{member.name}</div>
      {(member.instagram || member.linkedin) && (
        <div className="social-links">
          {member.instagram && (
            <a
              href={member.instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={instagramIcon} alt="Instagram" className="icon" />
            </a>
          )}
          {member.linkedin && (
            <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
              <img src={linkedinIcon} alt="LinkedIn" className="icon" />
            </a>
          )}
        </div>
      )}
    </div>
  );

  return (
    <>
      <CursorAnimation />
      <div className="team-members">
        <h1 className="headingg">SARC TEAM 2024-25</h1>

        <h2 className="head2">OVERALL COORDINATOR</h2>
        <div className="team-grid-single">
          {renderMember(teamData.overallCoordinator, true)}
        </div>

        {teamData.webTeams.map((webTeam, teamIndex) => (
          <div key={`web-team-${teamIndex}`}>
            <h1 className="headingg">{webTeam.title}</h1>

            <h2 className="head2">CORE TEAM MEMBERS</h2>
            <div className="team-grid-core">
              {webTeam.coreMembers.map((member, index) => (
                <React.Fragment key={`core-${teamIndex}-${index}`}>
                  {renderMember(member)}
                </React.Fragment>
              ))}
            </div>

            <h3 className="sub-head">COORDINATORS</h3>
            <div className="team-grid-core">
              {webTeam.coordinators
                .filter(
                  (member) =>
                    member.name !== "Jasnoor Kaur" &&
                    member.name !== "Vaibhav Kumar"
                )
                .map((member, index) => (
                  <React.Fragment key={`coord-${teamIndex}-${index}`}>
                    {renderMember(member)}
                  </React.Fragment>
                ))}
            </div>

            <div className="team-grid-core">
              {webTeam.coordinators
                .filter(
                  (member) =>
                    member.name === "Jasnoor Kaur" ||
                    member.name === "Vaibhav Kumar"
                )
                .map((member, index) => (
                  <React.Fragment key={`coord-extra-${teamIndex}-${index}`}>
                    {renderMember(member)}
                  </React.Fragment>
                ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Team;
