import styled from 'styled-components';

export const DetailContainer = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  margin: 20px;
  width: auto;
  max-width: 600px; // Limit the width for larger screens
  margin: 40px auto;
`;

export const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
`;

export const ProfilePicture = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
`;

export const Content = styled.div`
  font-size: 16px;
  line-height: 1.5;
  color: #333;
  margin-bottom: 20px;
`;

export const Stats = styled.div`
  font-size: 14px;
  color: #666;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const NoComments = styled.p`
  color: #888;
  font-style: italic;
`;