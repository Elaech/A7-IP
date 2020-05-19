import styled from 'styled-components';
import { font } from '../../globalStyledVariables';


export const TitleContainer = styled.div`
    width: 100%;
    text-align:center;
    padding: 8px 0px 8px 0px;
    font-size:26px;
    font-face: ${font.face};
    font-family: ${font.family};
    background:#87C0CD;
    border-radius: 25px;
    @media screen and (max-width:800px){
        font-size:13px;
    }
    `

export const DashboardContainer = styled.div`
    font-size:15px ;
    font-face:${font.face};
    font-family:${font.family};
    background: rgb(243, 249, 251);
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

export const NotificationsContainer = styled.div`
margin-top: 1rem;
`;

export const Notification = styled.div`
background:#FFFFFF;
border: 1px solid;
border-radius: 10px;
margin-top: 1rem;
`;
