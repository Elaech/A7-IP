import styled from 'styled-components';
import {CSSProperties} from 'react';
import {font} from '../../globalStyledVariables';


export const FormContainer = styled.div`
    font: 15px;
    font-face: ${font.face};
    font-family: ${font.family};
    background:#F3F9FB;
    margin-left: 1rem;
    width: 50%;
    padding: 25px 25px 25px 25px;
`;

export const buttonStyles: CSSProperties = {
    backgroundColor: '#87C0CD',
    boxShadow: '1px 2px 5px 2px #D4D4CE',
};


