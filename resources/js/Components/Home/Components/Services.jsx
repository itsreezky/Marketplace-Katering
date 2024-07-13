import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCar,
    faMoneyBillWave,
    faHeadset,
    faLock,
} from "@fortawesome/free-solid-svg-icons";

function Services() {
    return (
        <>
            {/* Services Section Begin */}
            <section className="services spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-4 col-sm-6">
                            <div className="services__item">
                                <i>
                                    <FontAwesomeIcon icon={faCar} />
                                </i>
                                <h6>Free Shipping</h6>
                                <p>For all orders over Rp 1.500.000</p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-6">
                            <div className="services__item">
                                <i>
                                    <FontAwesomeIcon icon={faMoneyBillWave} />
                                </i>
                                <h6>Money Back Guarantee</h6>
                                <p>If goods have problems</p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-6">
                            <div className="services__item">
                                <i>
                                    <FontAwesomeIcon icon={faHeadset} />
                                </i>
                                <h6>Online Support 24/7</h6>
                                <p>Dedicated support team</p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-6">
                            <div className="services__item">
                                <i>
                                    <FontAwesomeIcon icon={faLock} />
                                </i>
                                <h6>Secure Payment</h6>
                                <p>100% secure payment</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Services Section End */}
        </>
    );
}

export default Services;
