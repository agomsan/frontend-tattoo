import React from 'react';
import "./Gallery.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Gallery = () => {
    
    const images = [
        '../../../img/image1.jpg',
        '../../../img/image2.jpg',
        '../../../img/image3.jpg',
        '../../../img/image4.jpg',
        '../../../img/image5.jpg',
    ];

    return (
        <div className="gallery-container">
            {images.map((image, index) => (
                <img key={index} src={image} alt={`Image ${index + 1}`} />
            ))}
        </div>
    );
};

export default Gallery;