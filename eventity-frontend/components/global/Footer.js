/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from "next/link";
import React from "react";
import { AiOutlineGithub} from "react-icons/ai";
import { SiGmail} from "react-icons/si";

import Image from "next/image";

const Footer = () => {
  return (
    <>
      <div className="footer">
        <div className="container">
          <section className="footer__top">
            <div className="row">
              <div className="footer__top__content">
                <h2>
                  Join us for the most exciting <br />
                  events of the year!
                </h2>
                {/*<h2 className="display-4">*/}
                {/*  <Link href="tel:610383766284">+0123456789</Link>*/}
                {/*</h2>*/}
                <Link href="/contact" className="smooth button button__primary">
                  <span>Send us a message</span>
                </Link>
              </div>
            </div>
          </section>
          <div className="footer__middle">
            <div className="row">
              <div className="col-lg-3 d-flex justify-content-center align-items-center mb-3 mb-lg-0 justify-content-lg-start">
                <Link className="navbar-brand" href="/">
                  <Image src="/logo-no-background_web.svg" alt="Eventity.xyz" width={150} height={37}/>
                </Link>
              </div>
              <div className="col-lg-6 d-flex justify-content-center align-items-center mb-3 mb-lg-0">
                <ul className="footer__middle__menu">
                  <li>
                    <Link href="/blogs">Events Blogs</Link>
                  </li>
                </ul>
              </div>
              <div className="col-lg-3 d-flex justify-content-center align-items-center mb-3 mb-lg-0 justify-content-lg-end">
                <ul className="social-icon">
                  <li>
                    <Link href="https://github.com/efuraimuJS">
                      <AiOutlineGithub />
                    </Link>
                  </li>
                  <li>
                    <Link href="mailto:efuraimu.js@gmail.com">
                      <SiGmail />
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
                  &copy; 2023 All right reserved. Made with ❤ by <Link href="https://github.com/efuraimuJS"> efuraimuJS </Link>
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
