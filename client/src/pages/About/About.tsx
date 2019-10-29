import React from 'react'
import styled, { css } from 'styled-components';

const StyledAbout = styled.article`
  grid-column: 1/-1;
  grid-row: 1/-1;
  display: grid;
  grid-template-columns: calc(100vw - 96%) 1fr calc(100vw - 96%);
  word-wrap: break-word;
  &::selection {
    background-color: var(--primary-color);
  }
  &::-moz-selection {
    background-color: var(--primary-color);
  }
  a {
    &,
    &:link,
    &:active,
    &:visited {
      color: var(--primary-color);
    }
  }
  h1 {
    font-weight: 600;
    font-size: 4rem;
    margin: 0 0 1rem 0;
    color: var(--primary-color);
  }

  h2 {
    font-weight: 600;
    font-size: 3rem;
    margin: 2rem 0 1rem 0;
    color: var(--primary-color);
  }

  p {
    text-align: justify;
  }

  section {
    grid-column: 2/3;
      p.bio {
        line-height: 2rem;
        &::after {
          content: "";
          clear: both;
          display: table;
        }
        img {
          max-height: 100%;
          height: auto;
          width: 15rem;
          object-fit: contain;
          filter: grayscale(80%);
          float: left;
          shape-outside: circle(50%);
          margin-right: 3rem;
          clip-path: circle(50%);
        }
      }
      &.site {
        ul {
          display: grid;
          grid-row-gap: .5rem;
        }
      }
    }
  section {
    margin: 3rem 0;
  }
`;

const About = () => {
  return (
    <StyledAbout>
      <section className="site">
        <h1>About NewsGrubber</h1>
        <p>
          NewsGrubber is a noncommercial site built only for experimentation
          and to put into practice some of what I've learned.
          It it scrapes the homepage of <a href="www.cnet.com" target="_blank">CNET.com</a> capturing the titles, subtitles, url,
          picture and other information of some of the displayed articles.
        </p>
        <h2>Tech Used to Build NewsGrubber</h2>
        <ul>
          <li>React and Typescript</li>
          <li>Node and Express</li>
          <li>MongoDB</li>
          <li>Docker</li>
          <li>Jest</li>
          <li>JWT for authentication</li>
          <li>Styled-Components (Styling)</li>
          <li>Git (Version Control)</li>
          <li>NPM (Package Management)</li>
          <li></li>
        </ul>
      </section>
      <section className="dev">
        <h1>About Developer</h1>
        <p className="bio">
          <img src={`${process.env.PUBLIC_URL}/images/dev_photo.jpg`} alt="developer"/>
          Hi, my name's Juan John-Charles. I'm a full stack web developer who love what he does.
          I'm originally from the country of Dominica, not Dominican Republic, just
          Dominica. It's a very tiny Island in the Caribbean, known as the "Nature Isle' of the Caribbean".
          It's a very beautiful place. I moved to the US and
          and fell in love with programming. I took my baby steps in programming at the Rutgers University
          Coding Bootcamp, where I learned the basics of web development but has since built upon the foundation that was laid, through taking
          courses, lots of personal practice, and professional experience. I make it a goal to grow, learn something new everyday,
          deepening my knowledge and sharpening my skills.
        </p>
      </section>
    </StyledAbout>
  );
}

export default About;
