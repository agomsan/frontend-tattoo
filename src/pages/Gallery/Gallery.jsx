import React from 'react';

const Gallery = () => {
    const images = [
        '/path/to/image1.jpg',
        '/path/to/image2.jpg',
        '/path/to/image3.jpg',
        '/path/to/image4.jpg',
        '/path/to/image5.jpg',
    ];

    return (
        <div className="Gallery">
            {images.map((image, index) => (
                <img key={index} src={image} alt={`Image ${index + 1}`} />
            ))}
        </div>
    );
};

export default Gallery;