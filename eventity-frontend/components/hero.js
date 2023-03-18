import React from "react";
import SearchBar from "./search-bar";
import {useSession} from "next-auth/react";

const Hero = () => {
    const {data: session} = useSession();

    return (
        <div
            className="hero bg-image"
            style={{backgroundImage: "url(/images/hero-bg.jpg)"}}
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
                            {
                                (
                                    !session ? <SearchBar stylesValue={`mt-5`}/> : null
                                )
                            }

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
