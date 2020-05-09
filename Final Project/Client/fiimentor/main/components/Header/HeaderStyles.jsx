import styled from 'styled-components';
import { font } from '../../globalStyledVariables';


export const HeaderStyles = styled.header`
  height: 64px;
  padding: 0 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  font-weight: bold;
  font-face: ${font.face};
  font-family: ${font.family};

  span {
    margin-right: 16px;
    text-transform: capitalize;
  }

  button {
    border: none;
    outline: none;
    background: transparent;
    font-weight: bold;
  }
`;
export const LogoContainer = styled.div`
  font-face: ${font.face};
  font-family: ${font.family};
  cursor: pointer;
  margin-right: 1.5rem;
  text-align: left;
  height: 32px;
  width: 186px;

  span {
    margin: 0 8px;
  }

  a {
    text-decoration: none;
  }
`;
