import React, { useState, useEffect } from 'react';

import styled from 'styled-components';

import PostCard from './PostCard/PostCard';

function PostList() {
  const [requestList, setRequestList] = useState([]);

  useEffect(() => {
    fetch('/data/postListData.json')
      .then(res => res.json())
      .then(data => {
        setRequestList(data);
      });
  }, []);

  return (
    <PostCaradList>
      {requestList.map((post, index) => (
        <li key={index}>
          <PostCard list={post} />
        </li>
      ))}
    </PostCaradList>
  );
}

export default PostList;

const PostCaradList = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-items: center;
  width: 1100px;
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
