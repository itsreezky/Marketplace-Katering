import React from "react";

const products = [
    {
        category: "breakfast",
        imageUrl:
            "https://plus.unsplash.com/premium_photo-1663855532197-76b7c2d33c6a?q=80&w=300&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        label: "New",
        title: "Healthy Breakfast",
        price: "Rp 180.000",
        rating: 5,
    },
    {
        category: "lunch",
        imageUrl:
            "https://images.unsplash.com/photo-1604909052743-94e838986d24?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8R3JpbGxlZCUyMENoaWNrZW4lMjBTYWxhZHxlbnwwfHwwfHx8MA%3D%3D",
        title: "Grilled Chicken Salad",
        price: "Rp 225.000",
        rating: 5,
    },
    {
        category: "dinner",
        imageUrl:
            "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?q=80&w=300&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        label: "Out of Stock",
        title: "Pasta Primavera",
        price: "Rp 270.000",
        rating: 5,
    },
    {
        category: "snacks",
        imageUrl:
            "https://images.unsplash.com/photo-1522666257812-173fdc2d11fe?q=80&w=300&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "Fruit Platter",
        price: "Rp 120.000",
        rating: 5,
    },
    {
        category: "desserts",
        imageUrl:
            "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?q=80&w=300&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "Chocolate Cake",
        price: "Rp 150.000",
        rating: 5,
    },
    {
        category: "beverages",
        imageUrl:
            "https://images.unsplash.com/photo-1497534446932-c925b458314e?q=80&w=300&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        label: "Sale",
        title: "Fresh Juice",
        price: "Rp 75.000",
        oldPrice: "Rp 100.000",
        rating: 5,
    },
    {
        category: "lunch",
        imageUrl:
            "https://plus.unsplash.com/premium_photo-1704989937441-68b6536e6cf4?q=80&w=300&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "Quinoa Salad",
        price: "Rp 210.000",
        rating: 5,
    },
    {
        category: "snacks",
        imageUrl:
            "https://images.unsplash.com/photo-1708436477930-7ab5c26cff39?q=80&w=250&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "Veggie Sticks",
        price: "Rp 90.000",
        oldPrice: "Rp 120.000",
        rating: 5,
    },
];

const NewFood = () => {
    return (
        <>
            {/* Product Section Begin */}
            <section className="product spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-md-4">
                            <div className="section-title">
                                <h4>New food</h4>
                            </div>
                        </div>
                        <div className="col-lg-8 col-md-8">
                            <ul className="filter__controls">
                                <li className="active" data-filter="*">
                                    All
                                </li>
                                <li data-filter=".breakfast">Breakfast</li>
                                <li data-filter=".lunch">Lunch</li>
                                <li data-filter=".dinner">Dinner</li>
                                <li data-filter=".snacks">Snacks</li>
                                <li data-filter=".desserts">Desserts</li>
                                <li data-filter=".beverages">Beverages</li>
                            </ul>
                        </div>
                    </div>
                    <div className="row property__gallery">
                        {products.map((product, index) => (
                            <div
                                key={index}
                                className={`col-lg-3 col-md-4 col-sm-6 mix ${product.category}`}
                            >
                                <div className="product__item">
                                    <div
                                        className="product__item__pic"
                                        style={{
                                            backgroundImage: `url(${product.imageUrl})`,
                                        }}
                                    >
                                        {product.label && (
                                            <div className="label">
                                                {product.label}
                                            </div>
                                        )}
                                        <ul className="product__hover">
                                            <li>
                                                <a
                                                    href={product.imageUrl}
                                                    className="image-popup"
                                                >
                                                    <span className="arrow_expand" />
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <span className="icon_heart_alt" />
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <span className="icon_bag_alt" />
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="product__item__text">
                                        <h6>
                                            <a href="#">{product.title}</a>
                                        </h6>
                                        <div className="rating">
                                            {Array.from({
                                                length: product.rating,
                                            }).map((_, i) => (
                                                <i
                                                    key={i}
                                                    className="fa fa-star"
                                                />
                                            ))}
                                        </div>
                                        <div className="product__price">
                                            {product.price}
                                            {product.oldPrice && (
                                                <span>{product.oldPrice}</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            {/* Product Section End */}
        </>
    );
};

export default NewFood;
