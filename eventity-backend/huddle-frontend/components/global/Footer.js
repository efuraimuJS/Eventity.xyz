/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from "next/link";
import React from "react";
import { FaFacebookF, FaTwitter, FaYoutube, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <div className="footer">
        <div className="container">
          <section className="footer__top">
            <div className="row">
              <div className="footer__top__content">
                <h2>
                  Do you have any question? <br />
                  Feel free to contact me.
                </h2>
                <h2 className="display-4">
                  <Link href="tel:610383766284">+0123456789</Link>
                </h2>
                <Link href="/contact" className="smooth button button__primary">
                  <span>Send me a message</span>
                </Link>
              </div>
            </div>
          </section>
          <div className="footer__middle">
            <div className="row">
              <div className="col-lg-3 d-flex justify-content-center align-items-center mb-3 mb-lg-0 justify-content-lg-start">
                <Link href="/">
                  <h2 className="m-0">HUDDLE.</h2>
                </Link>
              </div>
              <div className="col-lg-6 d-flex justify-content-center align-items-center mb-3 mb-lg-0">
                <ul className="footer__middle__menu">
                  <li>
                    <Link href="/">Home</Link>
                  </li>
                  <li>
                    <Link href="/events">Events</Link>
                  </li>
                  <li>
                    <Link href="/blogs">Blog</Link>
                  </li>
                  <li>
                    <Link href="/contact">contact</Link>
                  </li>
                </ul>
              </div>
              <div className="col-lg-3 d-flex justify-content-center align-items-center mb-3 mb-lg-0 justify-content-lg-end">
                <ul className="social-icon">
                  <li>
                    <Link href="/">
                      <FaFacebookF />
                    </Link>
                  </li>
                  <li>
                    <Link href="/">
                      <FaTwitter />
                    </Link>
                  </li>
                  <li>
                    <Link href="/">
                      <FaYoutube />
                    </Link>
                  </li>
                  <li>
                    <Link href="/">
                      <FaWhatsapp />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <hr />
          <div className="footer__copyright">
            <div className="row">
              <div className="col-12">
                <p className="m-0 text-center">
                  &copy; 2023 All right reserved. Made with ❤ by FAHAD
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
    // <!-- ========== Footer section End ========== -->
  );
};

export default Footer;
