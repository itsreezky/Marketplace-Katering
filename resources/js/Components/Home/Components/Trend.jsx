import React from "react";

const Trend = () => {
    const trendItems = [
        {
            category: "HOT ORDERS",
            items: [
                {
                    image: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=100&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8fHNjcmFtc2NvbWJ8ZW58MHx8fHx8&auto=format&fit=crop&w=100&q=60",
                    title: "Scrambled Eggs",
                    price: "Rp 30.000",
                    rating: 5,
                },
                {
                    image: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=100&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8fGdyaWxsZWQlMjBjaGlja2VuJTIwc2FsYWR8ZW58MHx8fHx8&auto=format&fit=crop&w=100&q=60",
                    title: "Grilled Chicken Salad",
                    price: "Rp 50.000",
                    rating: 5,
                },
                {
                    image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=100&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8fHBhc3RhJTIwcHJpbWF2ZXJhfGVufDB8fHx8&auto=format&fit=crop&w=100&q=60",
                    title: "Pasta Primavera",
                    price: "Rp 70.000",
                    rating: 5,
                },
            ],
        },
        {
            category: "Best Seller",
            items: [
                {
                    image: "https://images.unsplash.com/photo-1546069901-eacef0df6022?w=100&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8fHBhc3RhfGVufDB8fHx8fA%3D%3D",
                    title: "Spaghetti Bolognese",
                    price: "Rp 60.000",
                    rating: 5,
                },
                {
                    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=100&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDV8fHxlbnwwfHx8fHw%3D",
                    title: "Pancakes with Berries",
                    price: "Rp 40.000",
                    rating: 5,
                },
                {
                    image: "https://images.unsplash.com/photo-1584776296944-ab6fb57b0bdd?w=100&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dG9hc3R8ZW58MHx8MHx8fDA%3D",
                    title: "French Toast",
                    price: "Rp 35.000",
                    rating: 5,
                },
            ],
        },
        {
            category: "News",
            items: [
                {
                    image: "https://images.unsplash.com/photo-1567306301408-9b74779a11af?w=100&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8fGNhZXNhciUyMHNhbGFkfGVufDB8fHx8fA%3D%3D",
                    title: "Caesar Salad",
                    price: "Rp 55.000",
                    rating: 5,
                },
                {
                    image: "https://images.unsplash.com/photo-1607532941433-304659e8198a?w=100&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c2FsYWR8ZW58MHx8MHx8fDA%3D",
                    title: "Greek Salad",
                    price: "Rp 45.000",
                    rating: 5,
                },
                {
                    image: "https://images.unsplash.com/photo-1543339308-43e59d6b73a6?w=100&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHNhbGFkfGVufDB8fDB8fHww",
                    title: "Fruit Salad",
                    price: "Rp 50.000",
                    rating: 5,
                },
            ],
        },
    ];

    return (
        <>
            {/* Trend Section Begin */}
            <section className="trend spad">
                <div className="container">
                    <div className="row">
                        {trendItems.map((trend, index) => (
                            <div
                                key={index}
                                className="col-lg-4 col-md-4 col-sm-6"
                            >
                                <div className="trend__content">
                                    <div className="section-title">
                                        <h4>{trend.category}</h4>
                                    </div>
                                    {trend.items.map((item, idx) => (
                                        <div key={idx} className="trend__item">
                                            <div className="trend__item__pic">
                                                <img
                                                    src={item.image}
                                                    alt={item.title}
                                                />
                                            </div>
                                            <div className="trend__item__text">
                                                <h6>{item.title}</h6>
                                                <div className="rating">
                                                    {Array.from(
                                                        {
                                                            length: item.rating,
                                                        },
                                                        (_, i) => (
                                                            <i
                                                                key={i}
                                                                className="fa fa-star"
                                                            />
                                                        )
                                                    )}
                                                </div>
                                                <div className="product__price">
                                                    {item.price}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            {/* Trend Section End */}
        </>
    );
};

export default Trend;
