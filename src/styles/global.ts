import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 62.5%;
  }

  :focus-visible {
    outline: 0;
    box-shadow: 0 0 0 2px ${(p) => p.theme['green-500']};
  }

  body {
    background-color: ${(p) => p.theme['gray-900']};
    color: ${(p) => p.theme['gray-300']};
  }

  body, input, textarea, button {
    font-family: 'Roboto', 'Arial', sans-serif;
    font-weight: 400;
    font-size: 1.6rem;
  } 
`
