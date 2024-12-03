import React from 'react';
import '../../styles/Header.css';
import '../../styles/font.css';
import '../../styles/link.css';


function Header() {

    return (


        <div className="introBlog">
            <div className="primaParte">
                <img id="logo" src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" alt="React logo" />
                <div className="titolo">
                    <h1>Blog Personale Matteo Kalcich</h1>
                </div>
            </div>
        </div>

    );
}

export default Header;