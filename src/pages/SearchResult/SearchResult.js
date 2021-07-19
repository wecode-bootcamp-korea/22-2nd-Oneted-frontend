import React from 'react';
import styled from 'styled-components';

function SearchResult(props) {
  const keyword = props.location.search.slice(7);

  return (
    <section>
      <Keyword>{keyword}</Keyword>
    </section>
  );
}

export default SearchResult;

const Keyword = styled.p`
  ${({ theme }) => theme.setFlex('center')}

  height: 159px;
  font-size: 48px;
  border-bottom: 1px solid #e1e2e3;
`;
