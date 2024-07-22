import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { Editor } from '@tinymce/tinymce-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const AdminWrapper = styled.div`
  padding: 2rem;
`;

const BlogForm = styled.form`
  margin-bottom: 2rem;
`;

const Input = styled.input`
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

const BlogList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const BlogItem = styled.li`
  margin-bottom: 1rem;
`;

function BlogAdmin() {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    const response = await axios.get('http://localhost:3001/blogs');
    setBlogs(response.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const blogPost = { title, content, imageUrl, excerpt };

    if (editingId) {
      await axios.put(`http://localhost:3001/blogs/${editingId}`, blogPost);
    } else {
      await axios.post('http://localhost:3001/blogs', blogPost);
    }

    clearForm();
    fetchBlogs();
  };

  const handleEdit = (blog) => {
    setTitle(blog.title);
    setContent(blog.content);
    setImageUrl(blog.imageUrl);
    setExcerpt(blog.excerpt);
    setEditingId(blog.id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3001/blogs/${id}`);
    fetchBlogs();
  };

  const clearForm = () => {
    setTitle('');
    setContent('');
    setImageUrl('');
    setExcerpt('');
    setEditingId(null);
  };

  return (
    <>
      <Header />
      <AdminWrapper>
        <h1>Administración de Blog</h1>
        <BlogForm onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Editor
            apiKey='1ot7r4f5xuw60ert2x7e9evj6pm1b5h72mufdheu9fx7czt0'
            value={content}
            init={{
              plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss markdown',
              toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
              tinycomments_mode: 'embedded',
              tinycomments_author: 'Author name',
              mergetags_list: [
                { value: 'First.Name', title: 'First Name' },
                { value: 'Email', title: 'Email' },
              ],
              ai_request: (request, respondWith) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
              height: 500,
              menubar: true
            }}
            onEditorChange={(newContent) => setContent(newContent)}
          />
          <Input
            type="text"
            placeholder="URL de la imagen"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Extracto"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
          />
          <Button type="submit">{editingId ? 'Actualizar' : 'Crear'} Post</Button>
          {editingId && <Button onClick={clearForm}>Cancelar Edición</Button>}
        </BlogForm>
        <BlogList>
          {blogs.map((blog) => (
            <BlogItem key={blog.id}>
              {blog.title}
              <Button onClick={() => handleEdit(blog)}>Editar</Button>
              <Button onClick={() => handleDelete(blog.id)}>Eliminar</Button>
            </BlogItem>
          ))}
        </BlogList>
        <Link to="/">Volver al inicio</Link>
      </AdminWrapper>
      <Footer />
    </>
  );
}

export default BlogAdmin;
