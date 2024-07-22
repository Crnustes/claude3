import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';

const BlogPostWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const BlogImage = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
  margin-bottom: 2rem;
`;

const BlogTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const BlogContent = styled.div`
  line-height: 1.6;
`;

function BlogPost() {
  const [post, setPost] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/blogs/${id}`);
        setPost(response.data);
      } catch (error) {
        console.error('Error fetching blog post:', error);
      }
    };

    fetchPost();
  }, [id]);

  if (!post) {
    return <div>Cargando...</div>;
  }

  return (
    <>
      <Header />
      
      <BlogPostWrapper>
        <BlogImage src={post.imageUrl} alt={post.title} />
        <BlogTitle>{post.title}</BlogTitle>
        <BlogContent dangerouslySetInnerHTML={{ __html: post.content }} />
        
      </BlogPostWrapper>
      <Footer />
    </>
  );
}

export default BlogPost;