import styled from 'styled-components';
import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation

export const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  background-color: #f0f2f5; // Facebook's background color
  color: #1c1e21; // Facebook's primary text color
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; // Similar to Facebook's font
`;

export const ErrorCode = styled.h1`
  font-size: 6rem; // Making the error code prominent
  color: #4b4f56; // Facebook's secondary text color
  margin-bottom: 20px;
`;

export const ErrorMessage = styled.h2`
  font-size: 1.8rem;
  color: inherit; // Inherits the primary text color
  margin-bottom: 10px;
`;

export const Suggestion = styled.p`
  font-size: 1.2rem;
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const HomeLink = styled(Link)`
  padding: 10px 20px;
  background-color: #1877f2; // Facebook's button color
  color: white;
  border-radius: 5px;
  text-decoration: none;
  font-size: 1rem;
  font-weight: bold;
  transition: background-color 0.3s;

  &:hover {
    background-color: #165db6;
  }
`;
