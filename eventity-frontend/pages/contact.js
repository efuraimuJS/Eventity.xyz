import React from "react";
import Layout from "../components/global/layout";
import {Accordion} from "react-bootstrap";
import SectionTitle from "../components/global/section-title";
import {IoIosArrowDown} from "react-icons/io";
import {CONTACT_FORM} from "../config";


const Contact = () => {
    return (
        <Layout title="Contact">
            <div className="contact section-padding-b">
                <div
                    className="contact-image"
                    style={{backgroundImage: "url(/images/contact.jpg)"}}
                >
                    <div className="row">
                        <div className="col-md-8 col-lg-6 mx-auto text-center">
                            <h2 className="title">Contact Us</h2>
                            <p className="description">
                                Have a question about Eventity.xyz or need help planning your event? We're here to
                                assist you in any way we can. Simply fill out the form below and a member of our team
                                will get back to you as soon as possible.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 col-lg-6 mx-auto">
                            <form action={`https://formspree.io/f/meqwroej`} method="post" className="contact-form">
                                <h3>Send us a message</h3>
                                <p>
                                    Please provide us with some basic information so we
                                    can get in touch with you.
                                </p>
                                <div className="row my-3">
                                    <div className="col-md-6 mb-3">
                                        <input name="name" type="text" placeholder="Name"/>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        {" "}
                                        <input name="phone" type="text" placeholder="Phone"/>
                                    </div>
                                    <div className="col-12 mb-3">
                                        {" "}
                                        <input name="email" type="email" placeholder="Email"/>
                                    </div>
                                    <div className="col-12">
                    <textarea
                        name="message"
                        id=""
                        rows="5"
                        placeholder="Message"
                    ></textarea>
                                    </div>
                                </div>
                                <button type="submit" className="button">Send</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className="faq section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 col-lg-6 mx-auto">
                            <SectionTitle title="Frequently Asked Question"/>
                            <Accordion
                                className="accordion-flush faq-accordion"
                                defaultActiveKey="0"
                            >
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>
                                        {" "}
                                        <span>How the payment works?</span> <IoIosArrowDown/>{" "}
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        Introduce the different payment options available on eventity.xyz, such as credit/debit card, PayPal, and bank transfer.
                                        Explain the payment process step-by-step, including how to enter payment details, confirm the purchase, and receive a receipt.
                                        Mention any security measures in place to protect customers' payment information, such as SSL encryption or PCI compliance.

                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="1">
                                    <Accordion.Header>
                                        {" "}
                                        <span>How to collect tickets?</span> <IoIosArrowDown/>
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        Detail the ticket collection options available to customers, such as electronic tickets or physical tickets that can be picked up at the event venue.
                                        Provide clear instructions on how to access and print electronic tickets, or where and when to pick up physical tickets.
                                        Address common concerns or questions customers might have about ticket collection, such as what to do if they lose their tickets or if they are unable to attend the event.

                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="2">
                                    <Accordion.Header>
                                        {" "}
                                        <span>How to buy premium tickets?</span> <IoIosArrowDown/>
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        Explain what makes premium tickets different from standard tickets, such as better seating, VIP access, or additional perks.
                                        Provide information on how to purchase premium tickets, such as through a separate website or by contacting event organizers directly.
                                        Detail any restrictions or requirements for purchasing and using premium tickets, such as age limits or dress codes.
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Contact;
