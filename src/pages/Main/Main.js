import React, { useState, useEffect } from 'react';

import styled from 'styled-components';

import FilterButton from './FilterButton/FilterButton';
import OrderBy from './OrderBy/OrderBy';
import PostList from './PostList/PostList';

function Main(props) {
  //postList 데이터로 쓰일 state
  const [postListData, setpostListData] = useState([]);
  //tag Fetch에 쓰일 state
  const [tagFetchData, settagFetchData] = useState([]);
  //지역 Fetch에 쓰일 state
  const [regionFetch, setRegionFetch] = useState('');
  //최신순 등 Fetch에 쓰일 state
  const [orderByFetch, setOrderByFetch] = useState('latest');

  //postListData Fetch
  useEffect(() => {
    fetch(`http://54.180.99.36:8000/search?${makeQuery(tagFetchData)}`)
      .then(res => res.json())
      .then(data => {
        setpostListData(data.result.jobPostings);
      });
  }, [tagFetchData, regionFetch, orderByFetch]);

  const tagFetchHandler = picTag => {
    settagFetchData(picTag);
  };

  const orderByFetchHandler = name => {
    setOrderByFetch(name);
  };

  const makeQuery = state => {
    const query = state.reduce((acc, cv) => {
      if (!acc && cv) {
        return acc + 'tags=' + cv;
      }
      if (acc) {
        return acc + '&tags=' + cv;
      }
      return acc;
    }, '');
    return query + '&region=' + regionFetch + '&orderBy=' + orderByFetch;
  };

  return (
    <main>
      <FilterContainer>
        <FilterButton
          title="태그"
          description="딱맞는 기업 찾기"
          tagFetchHandler={tagFetchHandler}
          tagFetchData={tagFetchData}
        />
        <OrderBy orderByFetchHandler={orderByFetchHandler} />
      </FilterContainer>
      <PostList data={postListData} />
    </main>
  );
}

export default Main;

const FilterContainer = styled.div`
  ${({ theme }) => theme.setFlex('space-between', 'none')};
  width: 1100px;
  margin: 0 auto;
  padding-top: 100px;
  max-height: 40px;
`;
