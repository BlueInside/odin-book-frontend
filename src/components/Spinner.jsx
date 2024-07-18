import styled, { keyframes } from 'styled-components';

// Keyframes for the spinner animation
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// Styled component for the Spinner
const Spinner = styled.div`
  border: 4px solid #f3f3f3;
  border-top: 4px solid #4267b2;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: ${spin} 2s linear infinite;
`;

const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0.5);
  z-index: 1000;
`;

export default function LoadingSpinner() {
  return (
    <CenteredContainer>
      <Spinner aria-label="Loading..."></Spinner>{' '}
    </CenteredContainer>
  );
}
