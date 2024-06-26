import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f0f2f5;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  max-width: 500px; // Limit width for larger screens
  margin: auto;
  margin-top: 20px;
`;

export const Form = styled.form`
  width: 100%;
`;

export const Label = styled.label`
  display: block;
  font-weight: 600;
  margin-bottom: 5px;
  color: #555;
`;

export const Input = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 2px solid #ccc;
  border-radius: 5px;
  margin-bottom: 20px;
  box-sizing: border-box;
  resize: none;
  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

export const ErrorMsg = styled.p`
  color: red;
  font-size: 0.875em;
`;

export const SubmitButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #ccc;
    cursor: default;
  }
`;
