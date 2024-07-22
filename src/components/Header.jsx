import React, { useState, useEffect } from "react";
import { Link as ScrollLink } from "react-scroll";
import { Link as RouterLink, useLocation } from "react-router-dom";
import styled from "styled-components";

const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  transition: background-color 0.3s ease;
  background-color: ${({ $scrolled }) => $scrolled ? 'white' : 'transparent'};
  box-shadow: ${({ $scrolled }) => $scrolled ? '0 2px 4px rgba(0,0,0,0.1)' : 'none'};
  color: ${({ $scrolled }) => $scrolled ? 'white' : 'red'};
`;

const Logo = styled.img`
  height: 40px;
`;

const Nav = styled.nav`
  display: flex;
  gap: 1rem;

  @media (max-width: 768px) {
    display: ${({ $isOpen }) => ($isOpen ? "flex" : "none")};
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: #000000;
    padding: 1rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

const StyledLink = styled.a`
  text-decoration: none;
  color: ${({ $scrolled }) => $scrolled ? '#ffffff' : 'red'};
  font-weight: bold;
  cursor: pointer;

  &:hover {
    color: #0077b6;
  }

  @media (max-width: 768px) {
    color: #333;
  }
`;

const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: ${({ $scrolled }) => $scrolled ? '#333' : 'white'};

  @media (max-width: 768px) {
    display: block;
  }
`;

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const LinkComponent = ({ to, children }) => {
    if (isHomePage) {
      return (
        <ScrollLink
          to={to}
          smooth={true}
          duration={500}
          href={`/#${to}`}
          onClick={() => setIsMenuOpen(false)}
        >
          {children}
        </ScrollLink>
      );
    } else {
      return (
        <RouterLink to={`/#${to}`} onClick={() => setIsMenuOpen(false)}>
          {children}
        </RouterLink>
      );
    }
  };

  return (
    <HeaderWrapper $scrolled={scrolled}>
      <Logo src="/public/images/Logo.png" alt="Logo" />
      <MenuButton
        $scrolled={scrolled}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        ☰
      </MenuButton>
      <Nav $isOpen={isMenuOpen}>
        <StyledLink as={LinkComponent} to="home" $scrolled={scrolled}>
          Inicio
        </StyledLink>
        <StyledLink as={LinkComponent} to="skills" $scrolled={scrolled}>
          Habilidades
        </StyledLink>
        <StyledLink as={LinkComponent} to="experience" $scrolled={scrolled}>
          Experiencia
        </StyledLink>
        <StyledLink as={LinkComponent} to="projects" $scrolled={scrolled}>
          Proyectos
        </StyledLink>
        <StyledLink as={LinkComponent} to="blog" $scrolled={scrolled}>
          Blog
        </StyledLink>
        <StyledLink as={LinkComponent} to="contact" $scrolled={scrolled}>
          Contacto
        </StyledLink>
      </Nav>
    </HeaderWrapper>
  );
}

export default Header;
