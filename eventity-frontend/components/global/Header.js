import Link from "next/link";
import {Navbar, NavDropdown} from "react-bootstrap";
import {AiOutlineLogin, AiOutlineUserAdd, AiOutlineUserDelete, AiTwotoneNotification} from "react-icons/ai";

import Image from 'next/image'
import {signOut, useSession} from 'next-auth/react';
import SearchBar from "../search-bar";
import {useEffect} from "react";

const Header = () => {

    const {data: session} = useSession();
    useEffect(() => {
        if (session == null) return;
        // console.log('session.jwt', session.jwt);
    }, [session]);
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
                        {
                            (!session ? (
                                    <>
                                        <ul className="navbar-nav">
                                            <div style={{position: "relative", alignItems: "center"}}>
                                                <NavDropdown
                                                    id="nav-dropdown-dark-example"
                                                    title="Services"
                                                    menuVariant="dark"
                                                >
                                                    <NavDropdown.Item href={`/services`}>
                                                        Event Ticketing
                                                    </NavDropdown.Item>

                                                    <NavDropdown.Item href={`/services`}>
                                                        Payment Analytics
                                                    </NavDropdown.Item>
                                                    <NavDropdown.Item href={`/services`}>
                                                        Events CRM
                                                    </NavDropdown.Item>
                                                    <NavDropdown.Divider/>
                                                    <NavDropdown.Item href={`/services`}>
                                                        Events Blogs
                                                    </NavDropdown.Item>
                                                </NavDropdown>

                                            </div>
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
                                    </>
                                ) : (
                                    <>
                                        <ul className="navbar-nav">
                                            <div style={{
                                                display: "inline-flex",
                                                alignItems: "center",
                                            }}>
                                                <li className="nav-item">
                                                    <SearchBar stylesValue={`mt-0 me-4`}/>
                                                </li>
                                                <li className="nav-item">
                                                    <Link className="nav-link" href="/pricing">
                                                        <AiTwotoneNotification/> My Eventities
                                                    </Link>
                                                </li>
                                                <li className="nav-item">
                                                    <Link className="nav-link" href="/pricing">
                                                        Payments
                                                    </Link>
                                                </li>
                                            </div>
                                        </ul>
                                    </>
                                )
                            )
                        }
                        <ul className="navbar-nav navbar__right d-block d-lg-none">
                            {
                                (
                                    !session ?
                                        <>
                                            <li className="nav-item">
                                                <Link className="nav-link" href="/signin">
                                                    <AiOutlineLogin/>
                                                    Log in
                                                </Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link className="nav-link" href="/signin/signup">
                                                    <AiOutlineUserAdd/>
                                                    Sign up
                                                </Link>
                                            </li>
                                        </> :

                                        <>
                                            <li className="nav-item">
                                                <Link onClick={signOut} className="nav-link" href="/">
                                                    <AiOutlineUserAdd/>
                                                    Sign Out
                                                </Link>
                                            </li>
                                        </>

                                )
                            }
                        </ul>
                    </Navbar.Collapse>

                    <ul className="navbar-nav navbar__right d-none d-lg-flex align-items-center gap-2">
                        {
                            (
                                !session ?
                                    <>
                                        <li className="nav-item">
                                            <Link className="nav-link" href="/signin">
                                                <AiOutlineLogin/>
                                                Log in
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" href="/signin/signup">
                                                <AiOutlineUserAdd/>
                                                Sign up
                                            </Link>
                                        </li>
                                    </> :

                                    <>
                                        <li className="nav-item">
                                            <Link onClick={signOut} className="nav-link" href="/">
                                                <AiOutlineUserAdd/>
                                                Sign Out
                                            </Link>
                                        </li>
                                    </>

                            )
                        }
                    </ul>
                </Navbar>
            </div>
        </div>
    );
};

export default Header;
