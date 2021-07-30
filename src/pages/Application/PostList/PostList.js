import React from 'react';

import styled from 'styled-components';

import PostCard from './PostCard/PostCard';

function PostList({ data }) {
  console.log(`data`, data);
  return (
    <PostCaradList>
      {data.map(post => (
        <li key={post.id}>
          <PostCard list={post.targetedPosting} />
        </li>
      ))}
    </PostCaradList>
  );
}

export default PostList;

const PostCaradList = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-items: center;
  width: 100%;
  margin: 0 auto;
  row-gap: 10px;

  & li {
    ${({ theme }) => theme.setFlex()}
    flex-direction: column;
    height: 334px;
    width: 270px;
    overflow: hidden;
  }
`;
