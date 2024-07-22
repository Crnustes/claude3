import { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const ProjectsWrapper = styled.section`
  padding: 4rem 2rem;
  background-color: #f8f8f8;
`;

const ProjectsTitle = styled.h2`
  text-align: center;
  margin-bottom: 2rem;
`;

const TabsWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
`;

const Tab = styled.button`
  padding: 0.5rem 1rem;
  margin: 0 0.5rem;
  background-color: ${props => props['data-active'] ? '#0077b6' : 'white'};
  color: ${props => props['data-active'] ? 'white' : '#333'};
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const ProjectsContainer = styled.div`
  display: flex;
  overflow-x: auto;
  padding-bottom: 1rem;
  -webkit-overflow-scrolling: touch;
  &::-webkit-scrollbar {
    height: 8px;
  }
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

const ProjectCard = styled.div`
  flex: 0 0 auto;
  width: 300px;
  margin-right: 1rem;
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ProjectImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const ProjectTitle = styled.h3`
  padding: 1rem;
  text-align: center;
`;

function Projects() {
  const [projects, setProjects] = useState([]);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get('http://localhost:3001/projects');
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const filteredProjects = activeTab === 'all'
    ? projects
    : projects.filter(project => project.category === activeTab);

  return (
    <ProjectsWrapper id="projects">
      <ProjectsTitle>Mis Proyectos</ProjectsTitle>
      <TabsWrapper>
        <Tab data-active={activeTab === 'all'} onClick={() => setActiveTab('all')}>Todos</Tab>
        <Tab data-active={activeTab === 'wordpress'} onClick={() => setActiveTab('wordpress')}>WordPress</Tab>
        <Tab data-active={activeTab === 'react'} onClick={() => setActiveTab('react')}>React</Tab>
      </TabsWrapper>
      <ProjectsContainer>
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id}>
            <a href={project.link} target="_blank" rel="noopener noreferrer">
              <ProjectImage src={project.imageUrl} alt={project.title} />
            </a>
            <ProjectTitle>{project.title}</ProjectTitle>
          </ProjectCard>
        ))}
      </ProjectsContainer>
    </ProjectsWrapper>
  );
}

export default Projects;