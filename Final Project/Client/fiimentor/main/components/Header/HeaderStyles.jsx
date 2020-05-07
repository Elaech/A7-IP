import styled from 'styled-components';
export const HeaderStyles = styled.header`
  height: 64px;
  padding: 0 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  font-weight: bold;

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
  font-family: GraphikCond-Bold;
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
