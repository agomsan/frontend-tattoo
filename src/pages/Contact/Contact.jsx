import React from 'react';

const Contact = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
    };

    return (
        <div>
            <h1>Contact Us</h1>
            <p>Feel free to reach out to us with any questions or inquiries.</p>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" placeholder="Alex" />

                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" placeholder="surfingworld@surfingworld.com" />

                <label htmlFor="message">Message:</label>
                <textarea id="message" name="message" rows="4" placeholder="Enter your message here" />

                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Contact;