import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { API } from '../../config';
import PostCard from '../Main/PostList/PostCard/PostCard';

function SearchResult(props) {
  const [postings, setPostings] = useState([]);
  const history = useHistory();

  let keyword = '';
  if (props.location.pathname === '/search') {
    keyword = props.location.search.slice(7);
  } else if (props.location.pathname === '/tag-search') {
    keyword = props.location.search.slice(5);
  }

  useEffect(() => {
    if (props.location.pathname === '/search') {
      fetch(`${API.SEARCH}?query=${keyword}`)
        .then(res => res.json())
        .then(data => setPostings(data.result));
    } else if (props.location.pathname === '/tag-search') {
      fetch(`${API.SEARCH}?tag=${keyword}`)
        .then(res => res.json())
        .then(data => setPostings(data.result));
    }
  }, [keyword]);

  return (
    <>
      <Keyword>
        <p>{keyword}</p>
      </Keyword>
      <section>
        <PostCaradList>
          {postings?.map(post => (
            <li
              key={post.id}
              onClick={() => {
                history.push(`/jobpostings/${post.id}`);
              }}
            >
              <PostCard list={post} />
            </li>
          ))}
        </PostCaradList>
      </section>
    </>
  );
}

export default SearchResult;

const Keyword = styled.p`
  display: flex;
  justify-content: center;
  padding-top: 100px;
  height: 159px;
  font-size: 48px;
  border-bottom: 1px solid #e1e2e3;
`;

const PostCaradList = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-items: center;

  width: 1100px;
  margin: 50px auto;
  row-gap: 10px;

  li {
    ${({ theme }) => theme.setFlex}
    flex-direction: column;
    height: 334px;
    width: 270px;
    overflow: hidden;
  }
`;
