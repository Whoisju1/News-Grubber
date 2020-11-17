import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyles = createGlobalStyle`
  ${reset}
  #root {
    display: contents;
  }
  html {
    font-size: 62.5%;
    --bg1: linear-gradient(45deg, #fdefee, #ffffff);
    --primary-color: #e74c3c;
    --secondary-color: #ee8478;
    --bg2: linear-gradient(to right, #e2e5ee, #f5f5f5);
    --main-grid: [full-left left-start] 5rem [left-end center-start]  repeat(8, [col-start] 1fr [col-end]) [center-end right-start] 5rem [right-end full-right];
    --light-border: .4px solid #eee;
    --text-color__main: #333333;
    @media screen and (max-width: 1181px) {
      --main-grid: [full-left left-start] .5rem [left-end center-start]  repeat(8, [col-start] 1fr [col-end]) [center-end right-start] .5rem [right-end full-right];
    }
    @media screen and (max-width: 540px){
      --main-grid: [full-left left-start] 0rem [left-end center-start]  repeat(8, [col-start] 1fr [col-end]) [center-end right-start] 0rem [right-end full-right];
    }
  }
  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }
  * {
      &::selection {
        background-color: #e95a4b;
        color: #FFF;
      }
      &::-moz-selection {
        background-color: #e95a4b;
        color: #FFF;
      }
    }
  body {
    display: grid;
    border: 0;
    padding: 0;
    font-size: 1.6rem;
    color: var(--text-color__main);
    /* overflow-x: hidden; */

    /* Set dimensions */
    min-height: 100vh;

    background-image: var(--bg1);
    grid-template-columns: var(--main-grid);
    grid-template-rows: 5rem  8rem auto;

    grid-row-gap: 2rem;
    @media screen and (max-width: 1181px) {
      grid-template-rows: 5rem  8rem auto;
    }
    @media screen and (max-width: 985px) {
      grid-row-gap: 0rem;
    }
  }
`;

export default GlobalStyles;
