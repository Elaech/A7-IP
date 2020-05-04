import styled from 'styled-components';
import {CSSProperties} from 'react';


export const PostFormContainer = styled.div`
    font: 15px Spectral;
    width: 25%!important;
    background:#F3F9FB;
    margin-left: 1rem!important;
    border:#D4D4CE 1px solid;
    border-radius: 35px;
    padding: 25px 25px 25px 25px;
    box-shadow: 1px 2px 5px 2px #D4D4CE;
  
`;

export const TitleContainer = styled.div`
    text-align:center;
    background:#87C0CD;
    border-radius: 40px;
    margin-bottom: 10%;
    box-shadow: 1px 2px 5px 2px #D4D4CE;
`;

export const buttonStyles: CSSProperties = {
    backgroundColor: '#87C0CD',
    width: '30%',
    marginTop: '15%',
    marginLeft: '35%',
    boxShadow: '1px 2px 5px 2px #D4D4CE',
};

export const autoCompleteStyles: CSSProperties = {
    backgroundColor: 'transparent',
    width: '100%',
    marginBottom: '5%',
    border:'#D4D4CE 1px solid',
};


