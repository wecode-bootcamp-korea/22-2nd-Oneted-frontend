import React from 'react';

import styled from 'styled-components';

import PostList from './PostList/PostList';
import OrderBy from './OrderBy/OrderBy';

function Main() {
  return (
    <main>
      {/* <Slide />
      <FilterSlide />
      <PostList /> */}
      <OrderBy />
    </main>
  );
}

export default Main;

const Slide = styled.div`
  height: 300px;
  background-image: url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1363&q=80');
  background-position: bottom;
  background-size: cover;
`;

const FilterSlide = styled.div`
  height: 141px;
  background-image: url('https://images.unsplash.com/photo-1472148439583-1f4cf81b80e0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1778&q=80');
  background-position: center;
  background-size: cover;
  margin: 15px 0;
`;
