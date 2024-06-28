import styled from 'styled-components';

export const FormContainer = styled.div`
  margin-top: 20px;
  padding: 15px;
  background: #f0f2f5;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;

export const CharacterCounter = styled.div`
  text-align: right;
  font-size: 12px;
  margin-top: 5px;
  color: ${(props) =>
    props.$charactersRemaining < 50 ? '#dc3545' : '#6c757d'};
`;

export const StyledLabel = styled.label`
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

export const StyledTextArea = styled.textarea`
  padding: 10px;
  border: 1px solid #ccd0d5;
  border-radius: 8px;
  resize: vertical;
  min-height: 50px;
  font-size: 14px;
  color: #333;

  &:focus {
    border-color: #80bdff;
    outline: none;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }
`;

export const SubmitButton = styled.button`
  margin-top: 10px;
  padding: 8px 12px;
  background-color: #4267b2;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #365899;
  }

  &:disabled {
    background-color: #ccc;
    cursor: default;
  }
`;

export const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
`;
