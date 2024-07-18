import styled from 'styled-components';

// Styled components
export const SearchBarContainer = styled.div`
  margin: 20px 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledContainer = styled.div`
  max-width: 800px;
  margin: auto;
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
