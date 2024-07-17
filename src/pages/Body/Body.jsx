import React from 'react';

const Body = () => {
    return (
        <div>
            <nav>
                <ul>
                    <li><a href="/profile">Profile</a></li>
                    <li><a href="/login">Log In</a></li>
                    <li><a href="/logout">Log Out</a></li>
                    <li><a href="/contact">Contact</a></li>
                </ul>
            </nav>
            {/* Your content goes here */}
            <footer>
                SURFING WORLD TATTOO 2024
            </footer>
        </div>
    );
};

export default Body;