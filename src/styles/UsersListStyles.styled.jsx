import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
`;
export const UserContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ccc;
  margin-bottom: 5px;
  &:last-child {
    border-bottom: none;
  }
`;

export const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 15px;
`;

export const UserName = styled.span`
  font-size: 16px;
  font-weight: 500;
`;

export const ActionButton = styled.button`
  margin-left: auto;
  padding: 5px 10px;
  font-size: 14px;
  display: flex;
  align-items: center;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background: #0056b3;
  }

  svg {
    margin-right: 5px;
  }
`;
