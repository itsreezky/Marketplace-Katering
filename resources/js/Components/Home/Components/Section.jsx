import React from "react";

const categoriesData = [
    {
        title: "Breakfast",
        description:
            "Start your day with a delicious and healthy breakfast from our curated selection.",
        link: "#",
        imageUrl:
            "https://plus.unsplash.com/premium_photo-1663013644564-f34ba6d12144?q=80&w=1550&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        large: true,
    },
    {
        title: "Lunch",
        description: "Fresh and tasty lunch options to fuel your afternoon.",
        link: "#",
        imageUrl:
            "https://images.unsplash.com/photo-1525351326368-efbb5cb6814d?q=80&w=380&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        large: false,
    },
    {
        title: "Dinner",
        description:
            "Delightful dinners that make the perfect end to your day.",
        link: "#",
        imageUrl:
            "https://images.unsplash.com/photo-1611765083444-a3ce30f1c885?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGRpbm5lcnxlbnwwfHwwfHx8MA%3D%3D",
        large: false,
    },
    {
        title: "Snacks",
        description: "Enjoy our variety of snacks for any time of the day.",
        link: "#",
        imageUrl:
            "https://images.unsplash.com/photo-1612739406461-8b8a9bf06996?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDR8fHxlbnwwfHx8fHw%3D",
        large: false,
    },
    {
        title: "Desserts",
        description: "Sweet treats to satisfy your cravings.",
        link: "#",
        imageUrl:
            "https://images.unsplash.com/photo-1604413191066-4dd20bedf486?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDZ8fHxlbnwwfHx8fHw%3D",
        large: false,
    },
];

const Section = () => {
    return (
        <>
            {/* Categories Section Begin */}
            <section className="categories">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-6 p-0">
                            <div
                                className="categories__item categories__large__item"
                                style={{
                                    backgroundImage: `url(${categoriesData[0].imageUrl})`,
                                }}
                            >
                                <div className="categories__text">
                                    <div
                                        className="card radius-10 bg-dark p-4"
                                        style={{
                                            opacity: "60%",
                                        }}
                                    >
                                        <h1 className="text-light">
                                            {categoriesData[0].title}
                                        </h1>
                                        <p className="text-light fw-bold mt-3">
                                            {categoriesData[0].description}
                                        </p>
                                        <a
                                            href={categoriesData[0].link}
                                            className="text-light"
                                        >
                                            Order Sekarang
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="row">
                                {categoriesData
                                    .slice(1)
                                    .map((category, index) => (
                                        <div
                                            key={index}
                                            className={`col-lg-6 col-md-6 col-sm-6 p-0`}
                                        >
                                            <div
                                                className="categories__item"
                                                style={{
                                                    backgroundImage: `url(${category.imageUrl})`,
                                                }}
                                            >
                                                <div className="categories__text">
                                                    <div
                                                        className="card radius-10 bg-dark p-3"
                                                        style={{
                                                            opacity: "60%",
                                                        }}
                                                    >
                                                        <h4 className="text-light">
                                                            {category.title}
                                                        </h4>
                                                        <p className="text-light fw-bold">
                                                            {
                                                                category.description
                                                            }
                                                        </p>
                                                        <a
                                                            href={category.link}
                                                            className="text-light"
                                                        >
                                                            Order Sekarang
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Categories Section End */}
        </>
    );
};

export default Section;
