import styled from 'styled-components';

const ExperienceWrapper = styled.section`
  padding: 4rem 2rem;
`;

const ExperienceTitle = styled.h2`
  text-align: center;
  margin-bottom: 2rem;
`;

const ExperienceItem = styled.div`
  margin-bottom: 2rem;
`;

const ExperienceItemTitle = styled.h3`
  margin-bottom: 0.5rem;
`;

const ExperienceItemDate = styled.p`
  font-style: italic;
  margin-bottom: 0.5rem;
`;

const experiences = [
  {
    title: 'Desarrollador WordPress',
    company: 'Empresa XYZ',
    date: 'Enero 2020 - Presente',
    description: 'Desarrollo y mantenimiento de sitios web utilizando WordPress.'
  },
  {
    title: 'Desarrollador Web Freelance',
    company: 'Autónomo',
    date: 'Junio 2018 - Diciembre 2019',
    description: 'Creación de sitios web personalizados para diversos clientes.'
  }
];

function Experience() {
  return (
    <ExperienceWrapper id="experience">
      <ExperienceTitle>Experiencia Laboral</ExperienceTitle>
      {experiences.map((exp, index) => (
        <ExperienceItem key={index}>
          <ExperienceItemTitle>{exp.title} - {exp.company}</ExperienceItemTitle>
          <ExperienceItemDate>{exp.date}</ExperienceItemDate>
          <p>{exp.description}</p>
        </ExperienceItem>
      ))}
    </ExperienceWrapper>
  );
}

export default Experience;