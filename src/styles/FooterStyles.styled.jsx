import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const StyledFooter = styled.footer`
  display: flex;
  background-color: #4267b2;
  gap: 25px;
  color: white;
  padding: 15px 20px;
  justify-content: center;
  align-items: center;
`;

export const FooterText = styled.p`
  margin: 0;
  font-size: 14px;
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
`;
