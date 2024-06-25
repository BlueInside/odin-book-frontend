import styled from 'styled-components';
import Button from '../components/Button';

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

export const StyledButton = styled(Button)`
  background-color: #1877f2;
  color: white;
  font-weight: bold;
  padding: 10px 20px;
  border-radius: 6px;
  width: 100%;
  cursor: pointer;
  border: none;
  font-size: 16px;

  &:hover {
    background-color: #165c9c;
  }
`;

export const Logo = styled.img`
  width: 100px;
  margin-bottom: 20px;
`;
