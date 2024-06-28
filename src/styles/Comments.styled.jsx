import styled from 'styled-components';

export const CommentsContainer = styled.div`
  margin-top: 10px;
  padding: 10px;
  background: #f8f9fa;  // A light grey background
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

export const Comment = styled.div`
  padding: 10px;
  margin-bottom: 8px;
  border-bottom: 1px solid #e9ecef; // Light grey border for separation
  &:last-child {
    border-bottom: none;
  }
`;

export const CommentText = styled.p`
  font-size: 14px;
  line-height: 1.5;
  color: #343a40; // Dark grey color for text
  margin: 0;
`;

export const AuthorName = styled.span`
  font-weight: bold;
  margin-right: 5px;
`;