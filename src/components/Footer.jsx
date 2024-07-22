import styled from 'styled-components';

const FooterWrapper = styled.footer`
  background-color: #333;
  color: white;
  padding: 2rem;
  text-align: center;
`;

const SocialLinks = styled.div`
  margin-top: 1rem;
`;

const SocialLink = styled.a`
  color: white;
  margin: 0 0.5rem;
  font-size: 1.5rem;
`;

function Footer() {
  return (
    <FooterWrapper>
      <p>© 2024 Cristian David Ñustes. Todos los derechos reservados.</p>
      <SocialLinks>
        <SocialLink href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
          LinkedIn
        </SocialLink>
        <SocialLink href="https://github.com" target="_blank" rel="noopener noreferrer">
          GitHub
        </SocialLink>
        <SocialLink href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          Twitter
        </SocialLink>
      </SocialLinks>
    </FooterWrapper>
  );
}

export default Footer;