import styled from 'styled-components';
import { font } from '../../globalStyledVariables';


export const TableContainer = styled.div`
    font-size: 15px;
    font-face: ${font.face};
    font-family: ${font.family};
    width: 50%;
    background:#F3F9FB;
    margin-left: 1rem;
    border:#D4D4CE 1px solid;
    border-radius: 35px;
    padding: 0px 25px 25px 25px;
    box-shadow: 1px 2px 5px 2px #D4D4CE;
`;


export const ThStyled = styled.th`
  color: #8e8e93;
  font-face: ${font.face};
  font-family: ${font.family};
  font-size: 16px;
  font-weight: 400;
  letter-spacing: 1px;
  line-height: 24px;
  text-align: left;
`;

export const TheadStyled = styled.thead`
  background-color: #ffffff;
  box-shadow: inset 0 1px 0 0 rgba(0, 0, 0, 0.15);
  width: 1002px;
  height: 32px;
  color: #8e8e93;
  font-face: ${font.face};
  font-family: ${font.family};
  font-size: 16px;
  font-weight: 400;
  letter-spacing: 1px;
  line-height: 24px;
  text-align: left;
`;

export const TrowStyled = styled.tr`
  background-color: #ffffff;
  box-shadow: inset 0 1px 0 0 rgba(0, 0, 0, 0.15);
  width: 1002px;
  height: 52px;
  color: #000000;
  font-face: ${font.face};
  font-family: ${font.family};
  font-size: 20px;
  font-weight: 400;
  letter-spacing: 1px;
  line-height: 30px;
  text-align: left;
`;
