import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFacebook,
    faTwitter,
    faYoutube,
    faInstagram,
    faPinterest,
} from "@fortawesome/free-brands-svg-icons";

function Footer() {
    return (
        <>
            {/* Footer Section Begin */}
            <footer className="footer">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-md-6 col-sm-7">
                            <div className="footer__about">
                                <div className="footer__logo">
                                    <a href="https://reezky.cloud/">
                                        <img
                                            src="https://resource.reezky.cloud/reezky/logo-v1/itsreezky-white.png"
                                            alt="reezky-icon"
                                            width={150}
                                        />
                                    </a>
                                </div>
                                <p>
                                    itsReezky's CloudServer a refined personal
                                    server environment crafted for developers.
                                    Experience seamless coding, secure data
                                    storage, and efficient project management in
                                    your dedicated digital oasis.
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-3 col-sm-5">
                            <div className="footer__widget">
                                <h6>Quick links</h6>
                                <ul>
                                    <li>
                                        <a href="https://reezky.cloud/">
                                            About
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://reezky.cloud/">
                                            Blogs
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://reezky.cloud/">
                                            Contact
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://reezky.cloud/">FAQ</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-3 col-sm-4">
                            <div className="footer__widget">
                                <h6>Account</h6>
                                <ul>
                                    <li>
                                        <a href="https://reezky.cloud/">
                                            My Account
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://reezky.cloud/">
                                            Orders Tracking
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://reezky.cloud/">
                                            Checkout
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://reezky.cloud/">
                                            Wishlist
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-8 col-sm-8">
                            <div className="footer__newslatter">
                                <h6>NEWSLETTER</h6>
                                <form action="#">
                                    <input type="text" placeholder="Email" />
                                    <button type="submit" className="site-btn">
                                        Subscribe
                                    </button>
                                </form>
                                <div className="footer__social">
                                    <a href="https://reezky.cloud/">
                                        <FontAwesomeIcon icon={faFacebook} />
                                    </a>
                                    <a href="https://reezky.cloud/">
                                        <FontAwesomeIcon icon={faTwitter} />
                                    </a>
                                    <a href="https://reezky.cloud/">
                                        <FontAwesomeIcon icon={faYoutube} />
                                    </a>
                                    <a href="https://reezky.cloud/">
                                        <FontAwesomeIcon icon={faInstagram} />
                                    </a>
                                    <a href="https://reezky.cloud/">
                                        <FontAwesomeIcon icon={faPinterest} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
                            <div className="footer__copyright__text">
                                <p>
                                    Copyright © All rights reserved | made with{" "}
                                    <i
                                        className="fa fa-heart"
                                        aria-hidden="true"
                                    />{" "}
                                    <a
                                        href="https://reezky.cloud/"
                                        target="_blank"
                                    >
                                        itsReezky
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
            {/* Footer Section End */}
        </>
    );
}

export default Footer;
