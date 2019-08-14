import React, { useEffect } from 'react'
import styled from 'styled-components';
import { getScrappedArticles } from '../../utils/requests';

const Section = styled.section`
  /* ... */
`;

function Articles()  {
  useEffect(() => {
    getScrappedArticles().then(articles => console.log(articles))
  }, [])
  return (
    <Section>

    </Section>
  )
}

export default Articles;
