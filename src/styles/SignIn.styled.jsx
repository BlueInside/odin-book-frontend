import styled from 'styled-components';

export const OrDivider = styled.p`
  color: #666;
  margin: 20px 0;
  text-align: center;
  font-size: 16px;
  font-weight: bold;
`;

export const StyledButton = styled.button`
  background-color: #1877f2;
  color: white;
  font-size: 18px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 5px; // Adds a bit of spacing around the buttons
  display: block; // Makes each button take the full line
  width: 100%; // Ensures the buttons extend full width of their container

  &:hover {
    background-color: #165eab;
  }
`;

export const ErrorMessage = styled.p`
  background-color: #ffdddd;
  border-left: 5px solid #f44336;
  color: #d32f2f;
  padding: 10px 20px;
  margin: 10px 0;
  border-radius: 5px;
  font-family: Arial, sans-serif;
  font-size: 14px;
  text-align: left;

  &:before {
    content: '⚠️ ';
  }
`;

export const PageLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 98vh;
`;

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 90vh;
  background-color: #f0f2f5;
`;

export const ContentContainer = styled.div`
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 300px;
`;

export const Title = styled.h2`
  color: #1c1e21;
  font-size: 24px;
  margin-bottom: 20px;
`;

export const Logo = styled.img`
  width: 100px;
  margin-bottom: 20px;
`;
