import React, { useState, useEffect } from "react";

const Discount = () => {
    const calculateTimeLeft = () => {
        const difference = +new Date("2024-08-20") - +new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }

        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearTimeout(timer);
    }, [timeLeft]);

    return (
        <>
            {/* Discount Section Begin */}
            <section className="discount">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 p-0">
                            <div className="discount__pic">
                                <img
                                    src="https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHBhcnRuZXJzaGlwfGVufDB8fDB8fHww"
                                    alt=""
                                />
                            </div>
                        </div>
                        <div className="col-lg-6 p-0">
                            <div className="discount__text">
                                <div className="discount__text__title">
                                    <span>Merchants Partner !</span>
                                    <h2>Partnership 2024</h2>
                                    <h5>
                                        <span>Get Promotion Up to</span> 30%
                                        reach users.
                                    </h5>
                                </div>
                                <div className="discount__countdown">
                                    <div className="countdown__item">
                                        <span>{timeLeft.days || "0"}</span>
                                        <p>Days</p>
                                    </div>
                                    <div className="countdown__item">
                                        <span>{timeLeft.hours || "0"}</span>
                                        <p>Hours</p>
                                    </div>
                                    <div className="countdown__item">
                                        <span>{timeLeft.minutes || "0"}</span>
                                        <p>Minutes</p>
                                    </div>
                                    <div className="countdown__item">
                                        <span>{timeLeft.seconds || "0"}</span>
                                        <p>Seconds</p>
                                    </div>
                                </div>
                                <a href="#">Join Sekarang</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Discount Section End */}
        </>
    );
};

export default Discount;
