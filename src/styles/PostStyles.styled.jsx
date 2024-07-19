import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const ImageContainer = styled.div`
  display: block;
  margin-top: 8px;
  margin-bottom: 8px;
  max-width: 100%;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  img {
    width: 100%;
    height: auto;
    display: block;
  }
`;

export const PostContainer = styled.article`
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 10px;
  margin-bottom: 20px;
  padding: 15px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  &:hover,
  &:active,
  &:focus {
    text-decoration: none;
    color: inherit;
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

export const IconText = styled.button`
  display: inline-flex;
  align-items: center;
  border: none;
  background: none;
  padding: 0;
  margin: 0;
  color: #606770;

  svg {
    margin-right: 5px;
    color: ${(props) => props.$liked && props.$icon === 'heart' && '#ed4956'};
  }

  &:hover {
    cursor: pointer;
    svg {
      color: ${(props) => (props.$icon === 'heart' ? '#ed4956' : '#0095f6')};
    }
  }

  &:focus {
    outline: none;
  }
`;
