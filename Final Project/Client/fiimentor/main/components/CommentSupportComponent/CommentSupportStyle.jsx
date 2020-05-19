import styled from 'styled-components';
import {font} from '../../globalStyledVariables';

export const CommentsContainer = styled.div`
font: 15px Spectral;
border-radius: 20px;
padding: 0.5rem;
backgroundColor: #113F67;

`;

export const CommentButton = styled.button`
background: #87C0CD;
box-shadow: 1px 2px 5px 2px #D4D4CE;
width: 20ch;
border-radius: 1rem;
margin-top: 1rem;
`;

export const CommentStyles = styled.div`
background:#FFFFFF;
border: 1px solid;
border-radius: 10px;
margin-top: 1rem;
`;

export const HeaderContainer = styled.div`
font-size:15px;
padding:12px 5px 12px 5px;
color:grey;
border-top: #black 3px solid;
border-bottom: #black 3px solid;
`;

export const ContentComment = styled.div`
font-size:15px;
padding:5px 5px 15px 5px;

`;

export const AuthorName = styled.div`
display:inline-flex;
color: black;
margin: 4px;
`;

export const CommentDate = styled.div`
`;

export const NumberOfComments = styled.div`
font-size: 20px;
padding: 0.5rem;
text-align: left;
font-face: ${font.face};
font-family: ${font.family};
`;

export const ViewMoreLabel = styled.label`
padding: 0.1rem 0.5rem;
color: grey;
`;

export const CreateCommentContainer = styled.div`
padding: 0.5rem;
margin-top: 2rem;
margin-bottom: 2rem;
`;
