import styled from 'styled-components';

export const LogoutButton = styled.button`
  background-color: #1877f2; /* Facebook's button blue */
  color: white;
  font-size: 16px;
  font-family: Arial, sans-serif; /* Simplistic font similar to what Facebook uses */
  padding: 8px 16px;
  border: none;
  border-radius: 5px; /* Slightly rounded corners, as used in Facebook's design */
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* Soft shadow for depth */

  &:hover {
    background-color: #165eab; /* A darker blue for the hover state */
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #fff, 0 0 0 4px #1877f2; /* Accessibility focus ring */
  }
`;

export const HeaderContainer = styled.header`
  background-color: #4267b2;
  color: white;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Logo = styled.img`
  height: 50px;
`;

export const WelcomeMessage = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

export const StyledHeader = styled.header`
  background-color: #4267b2;
  color: white;
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.h1`
  margin: 0;
  font-size: 24px;
  font-weight: bold;
`;

export const Tagline = styled.p`
  margin: 5px 0 0;
  font-size: 14px;
  color: #dfe3ee;
`;
