import styled from 'styled-components';
import {CSSProperties} from 'react';


export const TitleContainer = styled.div`
    width: 100%;
    text-align:center;
    padding: 8px 0px 8px 0px;
    font:26px Spectral;
    background:#87C0CD;
    border-radius: 25px;
    @media screen and (max-width:800px){
        font-size:13px;
    }
`;


export const DashboardContainer = styled.div`
    font: 15px Spectral;
    width: 59%;
    height: 570px;
    background:#F3F9FB;
    border:#D4D4CE 1px solid;
    padding: 20px 20px 20px 20px;
    @media screen and (max-width : 1050px) {
        width:40%;
        margin-left: 30%;
    }
    @media screen and (max-width: 650px) {
        width:58%;
        margin-left:16%;
        margin-top: 14%;
    }
    @media screen and (max-width:435px){
        width:100%;
        margin-left:2%;
        margin-top:36%;
    }
`;

export const CardsContainer = styled.div`
    display:flex;
`;

