import Link from "next/link";
import { Navbar } from "react-bootstrap";
import { AiOutlineLogin, AiOutlineUserAdd } from "react-icons/ai";

import Image from 'next/image'
const Header = () => {
  return (
    <div className="header">
      <div className="container">
        <Navbar className="p-0" bg="none" expand="lg">
          <Link className="navbar-brand" href="/">
            <Image src="/logo-no-background_web.svg" alt="Eventity.xyz" width={150} height={37}/>
          </Link>
          <Navbar.Toggle
            className="navbar-toggler collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="togler-icon-inner">
              <span className="line-1"></span>
              <span className="line-2"></span>
              <span className="line-3"></span>
            </span>
          </Navbar.Toggle>
          <Navbar.Collapse
            className="collapse navbar-collapse main-menu pg-scroll justify-content-center"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" href="/services">
                  Services
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/about_us">
                  About Us
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/pricing">
                  Pricing
                </Link>
              </li>
            </ul>
            <ul className="navbar-nav navbar__right d-block d-lg-none">
              <li className="nav-item">
                <Link className="nav-link" href="/signin">
                <AiOutlineLogin />
                  Log in
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/signin/signup">
                  <AiOutlineUserAdd />
                  Sign up
                </Link>
              </li>
            </ul>
          </Navbar.Collapse>

          <ul className="navbar-nav navbar__right d-none d-lg-flex align-items-center gap-2">
            <li className="nav-item">
              <Link className="nav-link" href="/signin">
                <AiOutlineLogin />
                Log in
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/signin/signup">
              <AiOutlineUserAdd />
                Sign up
              </Link>
            </li>
          </ul>
        </Navbar>
      </div>
    </div>
  );
};

export default Header;
