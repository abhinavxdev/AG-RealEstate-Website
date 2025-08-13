import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const CategoryMenu = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const { data } = await axios.get("http://localhost:8050/api/categories");
                setCategories(data.categories);
            } catch (error) {
                console.error("Error fetching categories:", error.message);
            }
        };
        fetchCategories();
    }, []);

    return (
        <div className="col-12 col-md-4 mb-4">
            <div className="card shadow-sm border-0">
                <div
                    className="card-header text-center"
                    style={{
                        backgroundColor: "#bc986b",
                        color: "white",
                        fontWeight: "600",
                        fontSize: "1.1rem",
                    }}
                >
                    Filter by Categories
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <Link
                            to="/listings"
                            className="text-decoration-none"
                            style={{
                                color: "#555",
                                fontSize: "1rem",
                                fontWeight: "500",
                            }}
                        >
                            <i
                                className="fa-solid fa-list me-2"
                                style={{ color: "#bc986b" }}
                            />
                            All Categories
                        </Link>
                    </li>
                    {categories.map((category) => (
                        <li key={category._id} className="list-group-item">
                            <Link
                                to={`/categories/${category.slug}`}
                                className="text-decoration-none"
                                style={{
                                    color: "#555",
                                    fontSize: "1rem",
                                    fontWeight: "500",
                                }}
                            >
                                <i
                                    className="fa-solid fa-chevron-right me-2"
                                    style={{ color: "#bc986b" }}
                                />
                                {category.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default CategoryMenu;
