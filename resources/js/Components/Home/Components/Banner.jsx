import React, { useEffect } from "react";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel";

const Banner = () => {
    const bannerItems = [
        {
            text: "Special Breakfast Offer",
            title: "Delicious Pancakes",
            link: "#",
        },
        {
            text: "Lunch Time Specials",
            title: "Grilled Chicken Salad",
            link: "#",
        },
        {
            text: "Dinner Delights",
            title: "Pasta Primavera",
            link: "#",
        },
    ];

    useEffect(() => {
        // Initialize the Owl Carousel
        window.$(".banner__slider").owlCarousel({
            loop: true,
            margin: 10,
            nav: true,
            items: 1,
            autoplay: true,
            autoplayTimeout: 5000,
            autoplayHoverPause: true,
        });
    }, []);

    return (
        <>
            {/* Banner Section Begin */}
            <section
                className="banner"
                style={{
                    backgroundImage: "url('assets/banner/banner-2.jpg')",
                }}
            >
                <div className="container">
                    <div className="row">
                        <div className="col-xl-7 col-lg-8 m-auto">
                            <div className="banner__slider owl-carousel">
                                {bannerItems.map((item, index) => (
                                    <div key={index} className="banner__item">
                                        <div className="banner__text">
                                            <span>{item.text}</span>
                                            <h1>{item.title}</h1>
                                            <a href={item.link}>
                                                Order Sekarang
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Banner Section End */}
        </>
    );
};

export default Banner;
