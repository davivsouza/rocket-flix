import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body{
    min-height: 100vh;


    -webkit-font-smoothing: antialiased;
    background: linear-gradient(67.08deg, #1E46A3 0%, #000000 48.94%, #C12A23 99.97%);
  } 


  .App{
    
    padding: 2rem 0;

    display: flex;
    flex-direction: column;
    gap: 1.875rem;
  }
`;
