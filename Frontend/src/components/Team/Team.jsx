import React from 'react';
import './Team.css';
import instagramIcon from '../../assets/images/instagram.svg';
import linkedinIcon from '../../assets/images/linkedin.svg';

// Images
import image1 from '../../assets/images/arush.png';
import kapil from '../../assets/images/kapil.png';
import image3 from '../../assets/images/aadit.png';
import image4 from '../../assets/images/aastha.png';
import image5 from '../../assets/images/ojas.png';
import image6 from '../../assets/images/parv.png';
import image7 from '../../assets/images/vanshika.png';
import image8 from '../../assets/images/yash.png';
import image9 from '../../assets/images/yashWeb.png';
import image10 from '../../assets/images/pratiksha.png';
import image11 from '../../assets/images/khushi.png';
import image12 from '../../assets/images/kaushik.png';
import image13 from '../../assets/images/arush.png';
import image14 from '../../assets/images/aryan.png';
import image15 from '../../assets/images/ctm3.png';
import image16 from '../../assets/images/ctm4.png';
import image17 from '../../assets/images/Gayatri.png';
import image18 from '../../assets/images/Najma.png';
import image19 from '../../assets/images/neha.png';
import image20 from '../../assets/images/aditya.png';
import image21 from '../../assets/images/vaibhav.png';
import image22 from '../../assets/images/rutika.png';
import image23 from '../../assets/images/tarun.png';
import image24 from '../../assets/images/ctm6.png';

const Team = () => {
  const teamData = {
    overallCoordinator: {
      name: 'Arush',
      image: image1,
      instagram: 'https://instagram.com/arush_instagram',
      linkedin: 'https://linkedin.com/in/arush_linkedin'
    },

    webTeams: [
      {
        title: 'ASMP TEAM 2025-26',
        coreMembers: [
          {
            name: 'Yash',
            image: image9,
            instagram: 'https://instagram.com/yash_insta',
            linkedin: 'https://linkedin.com/in/yash_linkedin'
          },
          {
            name: 'Pratiksha',
            image: image10,
            instagram: 'https://instagram.com/pratiksha_insta',
            linkedin: 'https://linkedin.com/in/pratiksha_linkedin'
          }
        ],
        coordinators: [
          { name: 'Khushi', image: image11, instagram: 'https://instagram.com/kapil_insta', linkedin: 'https://linkedin.com/in/kapil_linkedin' },
          { name: 'Kaushik', image: image12, instagram: 'https://instagram.com/kapil_insta', linkedin: 'https://linkedin.com/in/kapil_linkedin' },
          { name: 'Arush', image: image13, instagram: 'https://instagram.com/kapil_insta', linkedin: 'https://linkedin.com/in/kapil_linkedin' },
          { name: 'Aryan', image: image14, instagram: 'https://instagram.com/kapil_insta', linkedin: 'https://linkedin.com/in/kapil_linkedin' },
          { name: 'CTM3', image: image15, instagram: 'https://instagram.com/kapil_insta', linkedin: 'https://linkedin.com/in/kapil_linkedin' },
          { name: 'CTM4', image: image16, instagram: 'https://instagram.com/kapil_insta', linkedin: 'https://linkedin.com/in/kapil_linkedin' }
        ]
      },
      {
        title: 'WEB TEAM 2025-26',
        coreMembers: [
          { name: 'Arush', image: image1, instagram: 'https://instagram.com/kapil_insta', linkedin: 'https://linkedin.com/in/kapil_linkedin' },
          { name: 'Khushi', image: image11, instagram: 'https://instagram.com/kapil_insta', linkedin: 'https://linkedin.com/in/kapil_linkedin' }
        ],
        coordinators: [
          {
            name: 'Kapil',
            image: kapil,
            instagram: 'https://www.instagram.com/kapi_lchhipa?igsh=M2ZsNHAyM2o4dDR4',
            linkedin: 'https://linkedin.com/in/kapil-chhipa-05a741330'
          },
          {
            name: 'Aditya',
            image: image20,
            instagram: 'https://www.instagram.com/adityachaurasiya.8807/',
            linkedin: 'https://www.linkedin.com/in/aditya-chaurasiya-70785531b/'
          },
          {
            name: 'Vaibhav',
            image: image21,
            instagram: 'https://www.instagram.com/cheekycaibhav/',
            linkedin: 'www.linkedin.com/in/vaibhav-singh-35110022a'
          },
          {
            name: 'Rutika',
            image: image22,
            instagram: 'https://www.instagram.com/rutikahake?igsh=MXF2d3FxbTNpODEzaA==',
            linkedin: 'https://www.linkedin.com/in/rutika-hake-990787322'
          },
          {
            name: 'Tarun',
            image: image23,
            instagram: 'https://www.instagram.com/tarunkadam06?igsh=MXd5MnNnbnk2anRkeg==',
            linkedin: 'https://www.linkedin.com/in/tarun-kadam-657a44330'
          },
          {
            name: 'Vanshika',
            image: image24,
            instagram: 'https://www.instagram.com/vanshikazz0405?igsh=MXV1ZDdnYXZwaGwzNQ==',
            linkedin: 'https://www.linkedin.com/in/vanshika-nalamasa-04b6bb326'
          }
        ]
      },
      {
        title: 'ASMPTEAM 2025-26',
        coreMembers: [
          { name: 'Gayatri', image: image17, instagram: 'https://instagram.com/kapil_insta', linkedin: 'https://linkedin.com/in/kapil_linkedin' },
          { name: 'Najma', image: image18 }
        ],
        coordinators: [
          { name: 'Kapil', image: kapil, instagram: 'https://instagram.com/kapil_insta', linkedin: 'https://linkedin.com/in/kapil_linkedin' },
          { name: 'Aditya', image: image20, instagram: 'https://instagram.com/aditya_insta', linkedin: 'https://linkedin.com/in/aditya_linkedin' },
          { name: 'Aditya', image: image21, instagram: 'https://instagram.com/aditya_insta', linkedin: 'https://linkedin.com/in/aditya_linkedin' },
          { name: 'Aditya', image: image22, instagram: 'https://instagram.com/aditya_insta', linkedin: 'https://linkedin.com/in/aditya_linkedin' },
          { name: 'Aditya', image: image23, instagram: 'https://instagram.com/aditya_insta', linkedin: 'https://linkedin.com/in/aditya_linkedin' },
          { name: 'Aditya', image: image24, instagram: 'https://instagram.com/aditya_insta', linkedin: 'https://linkedin.com/in/aditya_linkedin' }
        ]
      }
    ]
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
            <a href={member.instagram} target="_blank" rel="noopener noreferrer">
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
            {webTeam.coordinators.map((member, index) => (
              <React.Fragment key={`coord-${teamIndex}-${index}`}>
                {renderMember(member)}
              </React.Fragment>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Team;
