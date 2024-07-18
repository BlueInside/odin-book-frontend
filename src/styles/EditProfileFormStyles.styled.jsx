import styled from 'styled-components';

export const FormContainer = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin: 20px auto;
  max-width: 800px;
  width: 100%;
  margin-bottom: 60px;
`;

export const StyledForm = styled.form`
  display: grid;
  grid-gap: 15px;
  grid-template-columns: 1fr;
`;

export const FormLabel = styled.label`
  color: #555;
  display: block;
  margin-bottom: 5px;
`;

export const StyledInput = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const StyledSelect = styled.select`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const StyledTextArea = styled.textarea`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  height: 100px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

export const Button = styled.button`
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  color: #fff;
  cursor: pointer;
  background-color: #1877f2;

  &:disabled {
    background-color: #ccc;
  }

  &:hover {
    background-color: #165fe2;
  }
`;

export const ErrorMsg = styled.p`
  color: #d9534f;
`;
