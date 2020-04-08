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
    margin-left: 1rem;
    border:#D4D4CE 2px solid;
    padding: 10px 15px 20px 19px;
    box-shadow: 1px 2px 5px 2px #D4D4CE;
    font-face: ${font.face};
    font-family: ${font.family};
    color: black;

`;

export const FormGroupContainer = styled.div`
    margin-bottom: 1rem;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
`;

export const buttonStyles: CSSProperties = {
    backgroundColor: '#87C0CD',
    width: '35%',
    marginTop:'2%',
    marginLeft:'8rem',
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
