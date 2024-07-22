import styled from 'styled-components';
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaWordpress, FaPhp, FaDatabase } from 'react-icons/fa';

const SkillsWrapper = styled.section`
  padding: 4rem 2rem;
  background-color: #000000;
  width: 80%;
  text-align: center;
  margin: auto;
`;

const SkillsTitle = styled.h2`
  text-align: center;
  margin-bottom: 3rem;
  color: #ffffff;
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
`;

const SkillItem = styled.div`
  background-color: #003518;
  border-radius: 8px;
  padding: 1rem;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  color: #ffffff;
`;

const IconWrapper = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const skills = [
  { name: 'HTML', icon: <FaHtml5 /> },
  { name: 'CSS', icon: <FaCss3Alt /> },
  { name: 'JavaScript', icon: <FaJs /> },
  { name: 'React', icon: <FaReact /> },
  { name: 'WordPress', icon: <FaWordpress /> },
  { name: 'PHP', icon: <FaPhp /> },
  { name: 'MySQL', icon: <FaDatabase /> },
];

function Skills() {
  return (
    <SkillsWrapper id="skills">
      <SkillsTitle>Mis Habilidades</SkillsTitle>
      <SkillsGrid>
        {skills.map((skill, index) => (
          <SkillItem key={index}>
            <IconWrapper>{skill.icon}</IconWrapper>
            {skill.name}
          </SkillItem>
        ))}
      </SkillsGrid>
    </SkillsWrapper>
  );
}

export default Skills;
