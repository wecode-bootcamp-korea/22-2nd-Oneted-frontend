import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

function SearchListModal({ datas, searchText }) {
  const result = datas.filter(post => {
    return post.title.includes(searchText);
  });

  return (
    <section>
      <div>
        <ListContainer>
          {result.map((post, idx) => {
            if (idx < 5) {
              return (
                <Link to={`/jobpostings?query=${post.title}`}>
                  <List>
                    <img alt="postingImg" src={post.img} />
                    <p>{post.title}</p>
                  </List>
                </Link>
              );
            }
          })}
        </ListContainer>
      </div>
    </section>
  );
}

export default SearchListModal;

const ListContainer = styled.ul`
  margin: auto;
  width: 1000px;
  padding: 15px;

  a {
    text-decoration: none;
    color: black;
  }
`;

const List = styled.li`
  ${({ theme }) => theme.setFlex}
  cursor: pointer;

  img {
    width: 20px;
    height: 20px;
    margin-right: 14px;
  }
`;
