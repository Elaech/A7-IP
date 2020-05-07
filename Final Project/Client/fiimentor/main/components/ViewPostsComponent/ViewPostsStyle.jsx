import styled from 'styled-components';
import {CSSProperties} from 'react';

export const TableContainer = styled.div`
    font: 15px Spectral;
    width: 50%;
    background:#F3F9FB;
    margin-left: 23%;
    margin-top:4%;
    border:#D4D4CE 1px solid;
    border-radius: 35px;
    padding: 0px 25px 25px 25px;
    box-shadow: 1px 2px 5px 2px #D4D4CE;
    @media screen and (max-width:950px){
        width:65%;
        margin-left:16%;
    }
    @media screen and (max-width:640px){
        width:83%;
        margin-left:4%;
    }
    @media screen and (max-width:450px){
        width: 116%;
        margin-top:30%;
    }
`;
