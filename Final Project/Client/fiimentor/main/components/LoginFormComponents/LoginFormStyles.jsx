import styled from 'styled-components';
import { CSSProperties} from 'react';
import {font} from '../../globalStyledVariables';

export const TitleContainer = styled.div`
    width:100%;
    text-align:center;
    margin-bottom:3%;
    font-face: ${font.face};
    font-family: ${font.family};
`;

export const LoginFormContainer = styled.div`
    font: 15px Spectral;
    width: 28%;
    background:#F3F9FB;
    margin-left: 30rem;
    margin-top: 10%;
    border:#D4D4CE 2px solid;
    padding: 10px 15px 20px 19px;
    box-shadow: 1px 2px 5px 2px #D4D4CE;
    font-face: ${font.face};
    font-family: ${font.family};
    color: black;
    @media screen and (max-width:1255px){
        margin-left:25rem;
        width:35%;
    }
    @media screen and (max-width:965px){
        margin-left:12rem;
        width:48%;
        margin-top:18%;
    }
    @media screen and (max-width:690px){
        margin-left: 5rem;
        width:64%;
        margin-top:25%;
    }
    @media screen and (max-width:465px){
        margin-left: 1rem;
        width:80%;
        margin-top:30%;
    }
`;

export const FormGroupContainer = styled.div`
    margin-bottom: 1rem;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
`;

export const FormGroup = styled.form`
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
`;

export const buttonStyles: CSSProperties = {
    backgroundColor: '#87C0CD',
    width: '35%',
    marginTop:'2%',
    position: 'relative',
    left: '30%',
    marginBottom: '1rem',
    boxShadow: '5px 1px 5px 2px #D4D4CE',
};

export const TextInput = styled.input `
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
`;

export const labelStyle: CSSProperties = {
    color: 'black',
};
