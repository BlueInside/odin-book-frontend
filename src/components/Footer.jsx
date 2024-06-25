import { FaGithub } from 'react-icons/fa';
import {
  StyledFooter,
  FooterText,
  StyledLink,
} from '../styles/FooterStyles.styled';

export default function Footer() {
  return (
    <StyledFooter>
      <FooterText>© 2024 Odin-Book. All rights reserved.</FooterText>
      <StyledLink to={`https://github.com/BlueInside`}>
        <FaGithub size={50} />
      </StyledLink>
    </StyledFooter>
  );
}
