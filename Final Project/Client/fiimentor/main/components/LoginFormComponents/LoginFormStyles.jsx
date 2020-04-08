import styled from 'styled-components';
import { FormatAlignCenter } from '@material-ui/icons';
import { CSSProperties} from 'react';

export const TitleContainer = styled.div`
    width:100%;
    text-align:center;
    margin-bottom:3%;
`;

export const LoginFormContainer = styled.div`
    font: 15px Spectral;
    width: 28%;
    background:#F3F9FB;
    margin-left: 1rem!important;
    border:#D4D4CE 2px solid;
    padding: 10px 15px 20px 19px;
    box-shadow: 1px 2px 5px 2px #D4D4CE;
`;

export const buttonStyles: CSSProperties = {
    backgroundColor: '#87C0CD',
    width: '35%',
    marginTop:'2%',
    marginLeft:'35%',
    boxShadow: '5px 1px 5px 2px #D4D4CE',
};

export const TextInput = styled.input `
    font: inherit;
    color: currentColor;
    width: 90%;
    border: 1px solid grey;
    height: 0.2rem;
    margin: 3px 0 20px 0;
    display: block;
    padding: 18.5px 14px;
    min-width: 0;
    background: none;
    box-sizing: content-box;
    animation-name: mui-auto-fill-cancel;
    -webkit-tap-highlight-color: transparent;
`;

