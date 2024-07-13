import React from 'react';

const Header = () => {
    return (
        <header>
            <h1>My Website</h1>
            <nav>
                <ul>
                    <li><a href="/">Inicio</a></li>
                    <li><a href="/about">Acerca de nosotros</a></li>
                    <li><a href="/contact">Contacto</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;