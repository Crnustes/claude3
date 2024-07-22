import styled from 'styled-components';

const BannerWrapper = styled.section`
  background-image: url('/public/images/fondobanner.jpg');
  background-size: cover;
  background-position: center;
  color: #000000;
  padding: 8rem 2rem 4rem;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  font-size: 1.5rem;
  font-weight: 600;
`;

function Banner() {
  return (
    <BannerWrapper>
      <Title>¡Hola! Soy Cristian Ñustes</Title>
      <Subtitle>
      Desarrollador Frontend con 4 Años de Experiencia <br/>
      Ideas en Experiencias Digitales Excepcionales <br/>
      Experto en WordPress y React, Creando Soluciones a Medida para tu Negocio
      </Subtitle>
    </BannerWrapper>
  );
}

export default Banner;