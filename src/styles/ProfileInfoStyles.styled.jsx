import styled from 'styled-components';

export const EditButton = styled.button`
  background-color: #1877f2; // Facebook blue
  color: white;
  border: none;
  border-radius: 5px;
  padding: 8px 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  font-weight: bold;
  gap: 5px; // Space between icon and text

  &:hover {
    background-color: #165fe2;
  }
`;

export const SuccessMessage = styled.div`
  position: absolute;
  top: 30px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #d4edda;
  color: #155724;
  border-radius: 5px;
  padding: 8px 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

export const Container = styled.div`
  font-family: Arial, sans-serif;
`;

export const Cover = styled.div`
  width: 100%;
  height: 325px;
  display: flex;
  overflow: hidden;
  position: relative;
  img {
    width: 100%;
    height: auto;
    filter: brightness(80%);
    object-fit: cover;
    object-position: center;
  }
`;

export const ProfileDetails = styled.div`
  display: flex;
  text-align: center;
  padding: 20px;
  position: relative;
  background: white;
  flex-direction: column;
  align-items: center;
`;

export const ProfilePic = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 4px solid white;
  position: absolute;
  top: -75px;
  left: calc(50% - 75px);
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const StyledButton = styled.button`
  background-color: #4c69ba;
  color: white;
  border: none;
  padding: 10px 20px;
  margin: 10px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #365899;
  }
`;

export const Title = styled.h1`
  color: #333;
  font-size: 24px;
  font-weight: bold;
  margin-top: 75px;
  margin-bottom: 10px;
`;

export const Text = styled.p`
  color: #666;
  font-size: 16px;
  margin: 5px 0;
`;

export const HighlightText = styled(Text)`
  color: #444;
  font-weight: bold;
`;

export const ProfileSection = styled.div`
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  margin-top: -50px; // Adjust as needed based on your layout
  position: relative;
  z-index: 2; // Make sure it's above any other overlapping elements
`;
