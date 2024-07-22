import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import BlogAdmin from './pages/BlogAdmin';
import ProjectAdmin from './pages/ProjectAdmin';
import BlogPost from './pages/BlogPost';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/blog/:id" element={<BlogPost />} />
        <Route
          path="/admin/blog"
          element={
            <PrivateRoute>
              <BlogAdmin />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/projects"
          element={
            <PrivateRoute>
              <ProjectAdmin />
            </PrivateRoute>
          }
        />
      </Routes>
     
    </Router>
  );
}

export default App;