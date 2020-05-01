import logo from '../static/images/final-logo.png';
import React from 'react';
import styled from 'styled-components';


export const font = {
  face:
    `@font-face {
    font-family: "Graphik";
    src: url("../static/fonts/Graphik/GraphikMedium.ttf");
     }
    `,
  family: 'Graphik, sans-serif',
};

export const Logo = ()=> <img src={logo} className="logo" alt="Logo"/>;

export const SiteContainer = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  position: relative;

  .blue-band {
    background-color: #EFF8FA
    height: 120px;
    margin-bottom: -120px;
    margin-left: -50%;
    width: 200%;
    overflow: hidden;
    box-shadow: inset 0 1px 0 0 #e0dcdd
  }
`;

export const StyledContainer = styled.div`
  margin: 0 48px;
  margin-top: 48px;
  display: grid;
  grid-column-gap: 24px
  grid-template-columns: 1fr 3fr
  grid-template-areas: "sidebar ."
`;
