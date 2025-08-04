import React from "react";
import LazyLoad from "react-lazyload";
import asmpTrailerMp4 from "../../assets/videos/asmp.mp4";

import posterImage from "../../assets/images/posterimage.jpg";
import "./Home.css";

function Home() {
  return (
    <>
      <div className="home">
        <div className="mainSection">
          <div className="video">
            <LazyLoad height={100} offset={100}>
              <video
                controls
                width="100%"
                style={{ maxWidth: "100%" }}
                poster={posterImage}
              >
                <source src={asmpTrailerMp4} type="video/mp4" />
                ASMP VIDEO
              </video>
            </LazyLoad>
          </div>
        </div>
      </div>
    </>
  );
}
export default Home;