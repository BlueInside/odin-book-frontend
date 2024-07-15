import styled from 'styled-components';

export const DeleteButton = styled.button`
  padding: 4px;
  margin-left: auto;
  color: #dc3545; // Red color for delete actions
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #c82333;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(220, 53, 69, 0.5);
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

export const ErrorMessageBox = styled.div`
  padding: 10px 15px;
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
  margin: 10px;
  border-radius: 4px;
  text-align: center;
  font-size: 14px;
`;

export const ListWrapper = styled.div`
  max-width: 600px; // similar to Facebook's post width
  margin: auto;
  padding: 20px;
  &:last-child {
    margin-bottom: 40px;
  }
`;
