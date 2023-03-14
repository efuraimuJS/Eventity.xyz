import React from "react";
import Layout from "../components/global/layout";
import { Accordion } from "react-bootstrap";
import SectionTitle from "../components/global/section-title";
import { IoIosArrowDown } from "react-icons/io";
import { CONTACT_FORM } from "../config";



const Contact = () => {
  return (
    <Layout title="Contact">
      <div className="contact section-padding-b">
        <div
          className="contact-image"
          style={{ backgroundImage: "url(/images/contact.jpg)" }}
        >
          <div className="row">
            <div className="col-md-8 col-lg-6 mx-auto text-center">
              <h2 className="title">Contact Us</h2>
              <p className="description">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Eligendi eveniet officia officiis omnis magnam totam placeat
                odio voluptas cum adipisci.
              </p>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-lg-6 mx-auto">
              <form action={CONTACT_FORM} method="post" className="contact-form">
                <h3>Send us a message</h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Laboriosam, odit.
                </p>
                <div className="row my-3">
                  <div className="col-md-6 mb-3">
                    <input name="name" type="text" placeholder="Name" />
                  </div>
                  <div className="col-md-6 mb-3">
                    {" "}
                    <input name="phone" type="text" placeholder="Phone" />
                  </div>
                  <div className="col-12 mb-3">
                    {" "}
                    <input name="email" type="email" placeholder="Email" />
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
              <SectionTitle title="Frequently Asked Question" />
              <Accordion
                className="accordion-flush faq-accordion"
                defaultActiveKey="0"
              >
                <Accordion.Item eventKey="0">
                  <Accordion.Header>
                    {" "}
                    <span>How the payment works?</span> <IoIosArrowDown />{" "}
                  </Accordion.Header>
                  <Accordion.Body>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>
                    {" "}
                    <span>How to collect tickets?</span> <IoIosArrowDown />
                  </Accordion.Header>
                  <Accordion.Body>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                  <Accordion.Header>
                    {" "}
                    <span>How to buy premium tickets?</span> <IoIosArrowDown />
                  </Accordion.Header>
                  <Accordion.Body>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
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
