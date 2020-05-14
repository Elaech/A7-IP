import logo from '../static/images/final-logo.png';
import logoPosts from '../static/images/logoPost.png';
import React from 'react';
import styled, {createGlobalStyle} from 'styled-components';
import profile from '../static/images/profile.png'

export const font = {
  face:
    `@font-face {
    font-family: "Spectral";
    src: url("../static/fonts/Spectral/Spectral-Medium.ttf");
     }
    `,
  family: 'Spectral, sans-serif',
};


export const LogoHome = ()=> <img src={logo} className="logo" alt="Logo"/>;
export const LogoLogin = ()=> <img src={logo} className="logoLogin" alt="Logo"/>
export const LogoPosts = ()=> <img src={logoPosts} className="logoPosts" alt="Logo" width="90%"/>;
export const Profile = () => <img src={profile} className="Profile" alt="Profile" width="13%"/>;

export const SiteContainer = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  position: relative;

  .blue-band {
    background-color: #EFF8FA;
    height: 120px;
    margin-bottom: -120px;
    margin-left: -50%;
    width: 200%;
    overflow: hidden;
    box-shadow: inset 0 1px 0 0 #e0dcdd;
  }
`;

export const StyledContainer = styled.div`
  margin: 0 48px;
  margin-top: 48px;
  display: grid;
  grid-column-gap: 24px;
  grid-template-columns: 1fr 3fr;
  grid-template-areas: "sidebar .";
`;

export const GlobalStyle = createGlobalStyle`

  ${font.face}

  * {
    box-sizing: border-box;
  }

  html {
    font-family: ${font.family}};
    font-size: ${font.size};
  }

  body {
    margin: 0;
    padding: 0;
    font-family: ${font.family}};
    font-size: ${font.size};
  }

  p {
    margin-bottom: 8px;
    margin-top: 0;
  }

  .bg-white {
    color: #fff;
  }

  .page-title {
    font-size: 48px;
    margin-bottom: 40px;
  }
`;

