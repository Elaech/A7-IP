import styled from 'styled-components';
import {CSSProperties} from 'react';
import { font } from '../../globalStyledVariables';

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
    `
export const LogoPosts = styled.div``; 

export const Button = styled.div``;

export const PostContainer = styled.div`
font-face: ${font.face};
font-family: ${font.family};
width:40%;
margin-left:5px;
`;

export const PostTitle = styled.div`
font-weight: bold;
font-size:22px;
padding:7px 7px 17px 7px;
border: 1px solid;
border-radius: 0px;
`;

export const AuthorContainer = styled.div`
font-size:15px;
padding:12px 5px 12px 5px;
color:grey;
border-top: #black 3px solid;
border-bottom: #black 3px solid;
border-style: double;
`;

export const LogoContainer = styled.div`
margin-top:10px;
width:78%;
`;

export const ContentContainer = styled.div`
font-size:20px;
padding:5px 5px 15px 5px;
`;
export const PostNr2 = styled.div`
margin-top:1%;
width:70%;
background:#FFFFFF;
border: 2px solid;
border-radius: 10px;
`;
export const PostNr1 = styled.div`
width:70%;
background:#FFFFFF;
border: 2px solid;
border-radius: 10px;
`;
export const DashboardContainer = styled.div`
    font-size:15px ;
    font-face:${font.face};
    font-family:${font.family};
    width: 59%;
    height: 570px;
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

