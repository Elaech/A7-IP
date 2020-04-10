import logo from '../static/images/final-logo.png';
import React from 'react';

export const font = {
  face:
    `@font-face {
    font-family: "Spectral";
    src: url("../static/fonts/Spectral/Spectral-Regular.ttf");
     }
    `,
  family: 'Spectral, sans-serif',
};

export const Logo = ()=> <img src={logo} className="logo" alt="Logo"/>;
