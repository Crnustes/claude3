import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    
    
  }

  body {
    font-family: 'Poppins', sans-serif;
    line-height: 1.6;
    color: #333;
    background: #000000;
    color: #ffffff;
  }

  a {
    color: #ffffff;
    font-weight: 700;
    text-decoration: none;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Montserrat', sans-serif;
    margin-bottom: 1rem;
  }
  .ciphAQ a{
    color: #000000;
  }
`;

export default GlobalStyles;