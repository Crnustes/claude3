import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

const BlogWrapper = styled.section`
  padding: 4rem 2rem;
`;

const BlogTitle = styled.h2`
  text-align: center;
  margin-bottom: 2rem;
`;

const BlogGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const BlogCard = styled.div`
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const BlogImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const BlogContent = styled.div`
  padding: 1rem;
`;

const BlogPostTitle = styled.h3`
  margin-bottom: 0.5rem;
`;

const BlogExcerpt = styled.p`
  margin-bottom: 1rem;
`;

const ReadMoreButton = styled(Link)`
  display: inline-block;
  padding: 0.5rem 1rem;
  background-color: #0077b6;
  color: white;
  text-decoration: none;
  border-radius: 4px;
`;

function Blog() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get('http://localhost:3001/blogs');
      setBlogs(response.data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  return (
    <BlogWrapper id="blog">
      <BlogTitle>Mi Blog</BlogTitle>
      <BlogGrid>
        {blogs.map((blog) => (
          <BlogCard key={blog.id}>
            <BlogImage src={blog.imageUrl} alt={blog.title} />
            <BlogContent>
              <BlogPostTitle>{blog.title}</BlogPostTitle>
              <BlogExcerpt>{blog.excerpt}</BlogExcerpt>
              <ReadMoreButton to={`/blog/${blog.id}`}>Leer más</ReadMoreButton>
            </BlogContent>
          </BlogCard>
        ))}
      </BlogGrid>
    </BlogWrapper>
  );
}

export default Blog;