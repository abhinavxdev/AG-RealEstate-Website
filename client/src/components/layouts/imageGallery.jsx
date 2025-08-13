import React, { useState } from "react";

const ImageGallery = ({ images }) => {
    // Handle undefined or empty image arrays
    if (!images || images.length === 0) {
        return <p>No images available for this listing.</p>;
    }

    const [selectedImage, setSelectedImage] = useState(images[0]);

    return (
        <div>
            {/* Main Image */}
            <div className="main-image mb-4">
                <img
                    src={`http://localhost:8050${selectedImage}`}
                    alt="Main"
                    crossOrigin="anonymous"
                    className="img-fluid"
                    style={{
                        width: "100%",
                        height: "50%",
                        objectFit: "cover",
                        borderRadius: "10px",
                    }}
                />
            </div>

            {/* Thumbnails */}
            <div
                className="thumbnail-gallery d-flex gap-2"
                style={{
                    overflowX: "auto", // Make it scrollable horizontally
                    whiteSpace: "nowrap", // Prevent line wrapping for thumbnails
                    paddingBottom: "10px", // Add some padding for better spacing
                }}
            >
                {images.map((image, index) => (
                    <img
                        key={index}
                        src={`http://localhost:8050${image}`}
                        alt={`Thumbnail ${index}`}
                        crossOrigin="anonymous"
                        className="img-thumbnail"
                        style={{
                            width: "80px",
                            height: "70px",
                            objectFit: "cover",
                            cursor: "pointer",
                            border:
                                selectedImage === image ? "2px solid #bd986b" : "1px solid #ccc",
                            borderRadius: "5px", // Add some rounded corners
                            display: "inline-block", // Keep thumbnails in a single row
                        }}
                        onClick={() => setSelectedImage(image)}
                    />
                ))}
            </div>
        </div>
    );
};

export default ImageGallery;
