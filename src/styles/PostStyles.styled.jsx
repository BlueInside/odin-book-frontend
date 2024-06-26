import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const PostContainer = styled.article`
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 10px;
  margin-bottom: 20px;
  padding: 15px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

export const StyledLink = styled(Link)`
  text-decoration: none; // Removes underline from the link
  color: inherit; // Inherits color from parent element
  &:hover,
  &:active,
  &:focus {
    text-decoration: none; // Ensures no underline on hover, focus, or active states
    color: inherit; // Keeps the color consistent on interaction
  }
`;
export const PostHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

export const ProfilePic = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
`;

export const PostContent = styled.div`
  margin-top: 10px;
`;

export const InteractionBar = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  font-size: 14px;
  color: #606770;
`;

export const IconText = styled.span`
  display: inline-flex;
  align-items: center;
  svg {
    margin-right: 5px;
  }

  &:hover svg {
    color: ${(props) => (props.$icon === 'heart' ? '#ed4956' : '#0095f6')};
  }
`;
