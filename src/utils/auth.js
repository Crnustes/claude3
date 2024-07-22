export const login = (username, password) => {
    if (username === 'admin' && password === 'password') {
      localStorage.setItem('isAuthenticated', 'true');
      return true;
    }
    return false;
  };
  
  export const logout = () => {
    localStorage.removeItem('isAuthenticated');
  };
  
  export const isAuthenticated = () => {
    return localStorage.getItem('isAuthenticated') === 'true';
  };