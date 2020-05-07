import styled from 'styled-components';
import {CSSProperties} from 'react';
import { font } from '../../globalStyledVariables';

export const RegisterFormContainer = styled.div`
    width: 50%;
    font: 15px Spectral;
    background: #F3F9FB;
    margin-left: 20rem;
    padding: 25px 25px 25px 25px;
    font-face: ${font.face};
    font-family: ${font.family};
    @media screen and (max-width:1100px){
        width:50%;
        margin-left: 14rem;
    }
    @media screen and (max-width:665px){
        width:60%;
        font-size: 13px;
        margin-left: 7rem;
    }
    @media screen and (max-width:460px){
        margin-left: 1.5rem;
        width:70%;
    }
`;

export const TitleContainer = styled.div`
    text-align:center;
    font-size: 2rem;
    margin-bottom: 5%;
    font-face: ${font.face};
    font-family: ${font.family};
    @media screen and (max-width:665px){
        font-size: 22px;
    }
`;

export const TextStyle = styled.input`
    font: inherit;
    color: currentColor;
    width: 90%;
    border: 1px solid grey;
    height: 0.2rem;
    margin: 3px 0 1px 0;
    display: block;
    padding: 18.5px 14px;
    min-width: 0;
    background: none;
    box-sizing: content-box;
    animation-name: mui-auto-fill-cancel;
    -webkit-tap-highlight-color: transparent;
    @media screen and (max-width:500px){
        font-size: 13px;
        height: 0px;
    }
`;

export const labelStyle: CSSProperties={
    color:'black',
}

export const registerButton: CSSProperties = {
    backgroundColor: '#87C0CD',
    width: '35%',
    marginTop:'2%',
    marginLeft:'6rem',
    marginBottom: '1rem',
    boxShadow: '5px 1px 5px 2px #D4D4CE',
}

