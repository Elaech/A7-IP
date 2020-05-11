import styled from 'styled-components';
import {CSSProperties} from 'react';

export const CommentFormContainer = styled.div`
font: 15px Spectral;
width:  35%;
background:#F3F9FB;
margin-left: 28%;
margin-top: 0%;
border:#D4D4CE 1px solid;
border-radius: 20px;
padding: 35px 35px 35px 35px;
box-shadow: 1px 2px 5px 2px #D4D4CE;
backgroundColor: #113F67;
@media screen and (max-width:1180px){
    width:50%;
    margin-left: 21%;
    margin-top: 18%;
}
@media screen and (max-width:715px){
    width:82%;
    margin-left:3%;
    margin-top:33%;
}
@media screen and (max-width:448px){
    margin-top:80%;
    margin-left:0rem;
    width:115%;
}
`;

export const CommentFormSection = styled.div`
    margin-top:10%;
`;

export const buttonStyles: CSSProperties = {
    backgroundColor: '#87C0CD',
    width: '30%',
    marginTop: '15%',
    marginLeft: '35%',
    boxShadow: '1px 2px 5px 2px #D4D4CE',
};

export const Comentariu1 = styled.div``;
export const AuthorContainer = styled.div``; 
export const ContentComment = styled.div``; 
export const Comentariu2 = styled.div``;