import styled from 'styled-components';
import {font} from '../../globalStyledVariables';

export const PostContainer = styled.div`
font-face: ${font.face};
font-family: ${font.family};
width:40%;
margin-left:5px;
`;

export const PostTitle = styled.div`
font-weight: bold;
font-size:35px;
padding:5px 5px 15px 5px;
`;

export const AuthorContainer = styled.div`
font-size:15px;
padding:12px 5px 12px 5px;
color:grey;
border-top: #ebebe0 1px solid;
border-bottom: #ebebe0 1px solid;
`;

export const LogoContainer = styled.div`
margin-top:10px;
`;

export const ContentContainer = styled.div`
font-size:20px;
`;
