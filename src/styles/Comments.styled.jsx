import styled from 'styled-components';

export const CommentsContainer = styled.div`
  margin-top: 10px;
  padding: 10px;
  background: #f8f9fa; // A light grey background
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;
export const DeleteButton = styled.button`
  padding: 4px;
  margin-left: 10px;
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

export const Comment = styled.div`
  display: flex;
  padding: 10px;
  margin-bottom: 8px;
  border-bottom: 1px solid #e9ecef;
  justify-content: space-between;
  &:last-child {
    border-bottom: none;
  }
`;

export const CommentText = styled.p`
  font-size: 14px;
  line-height: 1.5;
  color: #343a40;
  margin: 0;
  word-wrap: break-word;
  overflow-wrap: break-word;
  hyphens: auto;
  width: 90%;
`;
export const ErrorMessage = styled.div`
  background-color: #f8d7da;
  color: #721c24;
  padding: 10px;
  margin: 10px 0;
  border-radius: 4px;
  border: 1px solid #f5c6cb;
  text-align: center;
`;

export const AuthorName = styled.span`
  font-weight: bold;
  margin-right: 5px;
`;
