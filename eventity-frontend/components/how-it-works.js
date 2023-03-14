import React from 'react';
import SectionTitle from './global/section-title';

const HowItWorks = () => {
    return (
        <div className="how-works section-padding">
                <div className="container">
                    <SectionTitle title="How It Works" />
                    <div className="row align-items-center justify-content-around">
                        <div className="col-md-6 col-lg-4 mb-4 mb-lg-0 text-center">
                           <div className="how-works__item">
                           <div className="how-works__item--number">
                                01
                            </div>
                            <h3>Find Events</h3>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime, rerum big occasion!</p>
                           </div>
                        </div>
                        <div className="col-md-6 col-lg-4 mb-4 mb-lg-0 text-center">
                           <div className="how-works__item">
                           <div className="how-works__item--number">
                                02
                            </div>
                            <h3>Select Events</h3>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime, rerum Trick Question!</p>
                           </div>
                        </div>
                        <div className="col-md-6 col-lg-4 mb-4 mb-lg-0 text-center">
                           <div className="how-works__item">
                           <div className="how-works__item--number">
                                03
                            </div>
                            <h3>Confirm Tickets</h3>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime, rerum Array too!</p>
                           </div>
                        </div>
                       
                    </div>
                </div>
            </div>
    );
};

export default HowItWorks;