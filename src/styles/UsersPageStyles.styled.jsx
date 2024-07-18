import styled from 'styled-components';

// Styled components
export const SearchBarContainer = styled.div`
  margin: 20px 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SearchButton = styled.button`
  background-color: #4267b2; // Facebook blue
  color: white;
  border: none;
  border-radius: 5px; // Slightly rounded edges
  padding: 8px 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  outline: none;
  font-size: 14px;
  font-weight: bold;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #365899;
  }

  svg {
    margin-right: 5px;
  }
`;

export const StyledContainer = styled.div`
  min-height: 86vh;
  max-width: 800px;
  display: flex;
  margin: auto;
  flex-direction: column;
  justify-content: space-between;
`;
export const Label = styled.label`
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;

export const SearchInput = styled.input`
  padding: 10px 20px;
  font-size: 16px;
  border: 2px solid #ccc;
  border-radius: 8px;
  width: 300px;

  &:focus {
    outline: none;
    border-color: #0056b3;
    box-shadow: 0 0 8px #b3d1ff;
  }
`;
