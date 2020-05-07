import styled from 'styled-components';
import { CSSProperties} from 'react';
import {font} from '../../globalStyledVariables';

export const TitleContainer = styled.div`
    text-align:left;
    font-face: ${font.face};
    font-family: ${font.family};
    border:#D4D4CE 2px solid;
    padding: 10px 15px 10px 19px;
    box-shadow: 1px 2px 5px 2px #D4D4CE;
    background:#87C0CD;
    margin-bottom: 2rem;
`;

export const FormContainer = styled.div`
display: block;
margin-left: 2rem;
`;
