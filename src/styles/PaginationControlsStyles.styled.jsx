import styled from 'styled-components';

export const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

export const PageButton = styled.button`
  background: none;
  border: none;
  padding: 8px 12px;
  margin: 0 4px;
  font-size: 16px;
  cursor: pointer;
  color: #007bff;
  font-weight: ${(props) => (props.isActive ? 'bold' : 'normal')};

  &:disabled {
    color: #000;
    cursor: default;
  }

  &:hover:not(:disabled) {
    background-color: #f8f9fa;
  }
`;

export const NavButton = styled(PageButton)`
  background-color: #e9ecef;
  border-radius: 5px;

  &:hover {
    background-color: #dee2e6;
  }
`;
