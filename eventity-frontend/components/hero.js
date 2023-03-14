import React, { useEffect } from "react";
import { FaRegLightbulb } from "react-icons/fa";
import { BiLoader } from "react-icons/bi";
import { MdOutlineEvent } from "react-icons/md";
import Link from "next/link";

const Hero = () => {
  return (
    <div
      className="hero bg-image"
      style={{ backgroundImage: "url(/images/hero-bg.jpg)" }}
    >
      <div className="hero__wrapper">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xxl-6 col-xl-7 col-lg-8 col-md-10 text-center">
              <h2 className="hero__title">
                Discover Events & workshops Around You
              </h2>
              <p className="hero__description mt-4">
                Don't miss out on the experience of a lifetime - secure your
                spot at your preferable events with our easy online ticket
                purchasing system and join it for building a good community.
              </p>
              <div className=" hero__button mt-5">
                <button
                  onClick={() => {
                    const myId = document.getElementById("upcoming-events");
                    myId.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  {" "}
                  <BiLoader /> Upcoming Events
                </button>
                <button
                  onClick={() => {
                    const myId = document.getElementById("featured-events");
                    myId.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  {" "}
                  <FaRegLightbulb /> Featured Events
                </button>
                <Link href="/events">
                  <button>
                    {" "}
                    <MdOutlineEvent /> All Events
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
