import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

const AdminWrapper = styled.div`
  padding: 2rem;
`;

const ProjectForm = styled.form`
  margin-bottom: 2rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
`;

const Select = styled.select`
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: #0077b6;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 0.5rem;
`;

const ProjectList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const ProjectItem = styled.li`
  margin-bottom: 1rem;
`;

function ProjectAdmin() {
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [link, setLink] = useState('');
  const [category, setCategory] = useState('wordpress');
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const response = await axios.get('http://localhost:3001/projects');
    setProjects(response.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const project = { title, description, imageUrl, link, category };
    
    if (editingId) {
      await axios.put(`http://localhost:3001/projects/${editingId}`, project);
    } else {
      await axios.post('http://localhost:3001/projects', project);
    }
    
    clearForm();
    fetchProjects();
  };

  const handleEdit = (project) => {
    setTitle(project.title);
    setDescription(project.description);
    setImageUrl(project.imageUrl);
    setLink(project.link);
    setCategory(project.category);
    setEditingId(project.id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3001/projects/${id}`);
    fetchProjects();
  };

  const clearForm = () => {
    setTitle('');
    setDescription('');
    setImageUrl('');
    setLink('');
    setCategory('wordpress');
    setEditingId(null);
  };

  return (
    <AdminWrapper>
      <h1>Administración de Proyectos</h1>
      <ProjectForm onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Input
          type="text"
          placeholder="URL de la imagen"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Enlace del proyecto"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
        <Select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="wordpress">WordPress</option>
          <option value="react">React</option>
        </Select>
        <Button type="submit">{editingId ? 'Actualizar' : 'Crear'} Proyecto</Button>
        {editingId && <Button onClick={clearForm}>Cancelar Edición</Button>}
      </ProjectForm>
      <ProjectList>
        {projects.map((project) => (
          <ProjectItem key={project.id}>
            {project.title}
            <Button onClick={() => handleEdit(project)}>Editar</Button>
            <Button onClick={() => handleDelete(project.id)}>Eliminar</Button>
          </ProjectItem>
        ))}
      </ProjectList>
      <Link to="/">Volver al inicio</Link>
    </AdminWrapper>
  );
}

export default ProjectAdmin;