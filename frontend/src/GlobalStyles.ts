import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyles = createGlobalStyle`
  ${reset}
  #root {
    display: contents;
  }
  html {
    font-size: 62.5%;
    --main-background-color: linear-gradient(45deg, #fdefee, #ffffff);
    --primary-color: #e74c3c;
    --secondary-background-color: linear-gradient(45deg, #e2e5ee, #f5f5f5);
    --main-grid: [full-left left-start] 5rem [left-end center-start]  repeat(8, [col-start] 1fr [col-end]) [center-end right-start] 5rem [right-end full-right];
    --light-border: .4px solid lightgray;
  }
  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }
  body {
    display: grid;
    border: 0;
    padding: 0;
    font-size: 1.6rem;

    /* Set dimensions */
    min-width: 100vw;
    min-height: 100vh;

    background-image: var(--main-background-color);
    grid-template-columns: var(--main-grid);
    grid-template-rows: 5rem  8rem auto;

    grid-gap: 2rem;
  }
`;

export default GlobalStyles;
