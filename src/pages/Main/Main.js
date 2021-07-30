import React, { useState, useEffect, useRef } from 'react';

import styled from 'styled-components';

import FilterButton from './FilterButton/FilterButton';
import OrderBy from './OrderBy/OrderBy';
import PostList from './PostList/PostList';
import RegionButton from './RegionButton/RegionButton';

function Main() {
  const [postListData, setpostListData] = useState([]);
  const [tagFetchData, settagFetchData] = useState([]);
  const [regionFetch, setRegionFetch] = useState('');
  const [orderByFetch, setOrderByFetch] = useState('latest');
  const [isLoading, setIsLoading] = useState(true);

  const listCount = useRef(0);
  const offsetNumberRef = useRef(0);
  const fetchTarget = useRef(null);

  useEffect(() => {
    fetch(
      `http://54.180.99.36:8000/jobpostings?${makeQuery(
        tagFetchData
      )}&offset=0&limit=20`
    )
      .then(res => res.json())
      .then(data => {
        setpostListData(data.result);
        listCount.current = data.count;
      });
  }, [tagFetchData, regionFetch, orderByFetch]);

  const tagFetchHandler = picTag => {
    settagFetchData(picTag);
  };

  const orderByFetchHandler = name => {
    setOrderByFetch(name);
  };

  const regionFetchHandler = region => {
    setRegionFetch(region);
  };

  const makeQuery = state => {
    const query = state.reduce((acc, cv) => {
      if (!acc && cv) {
        return acc + 'tag=' + cv;
      }
      if (acc) {
        return acc + '&tag=' + cv;
      }
      return acc;
    }, '');
    return query + '&region=' + regionFetch + '&orderBy=' + orderByFetch;
  };

  const onIntersect = ([entry]) => {
    offsetNumberRef.current = offsetNumberRef.current + 20;
    console.log(
      `fetch`,
      `${makeQuery(tagFetchData)}&offset=${offsetNumberRef.current}&limit=20`
    );
    if (entry.isIntersecting) {
      fetch(
        `http://54.180.99.36:8000/jobpostings?${makeQuery(
          tagFetchData
        )}&offset=${offsetNumberRef.current}&limit=20`
      )
        .then(res => res.json())
        .then(data => {
          setpostListData(prev => [...prev, ...data.result]);
          listCount.current = data.count;
          console.log(`data.result`, data.result);
        });
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(onIntersect, { threshold: 0.5 });
    observer.observe(fetchTarget.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (listCount.current < offsetNumberRef.current) setIsLoading(false);
  }, [postListData]);

  const gotoTopHandler = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <main>
      <FilterContainer>
        <LeftFilterButtonWrap>
          <FilterButton
            title="태그"
            description="딱맞는 기업 찾기"
            tagFetchHandler={tagFetchHandler}
            tagFetchData={tagFetchData}
          />
        </LeftFilterButtonWrap>
        <RightFilterButtonWrap>
          <RegionButton
            title={regionFetch === '' ? '전체' : regionFetch}
            regionFetchHandler={regionFetchHandler}
          />
          <OrderBy orderByFetchHandler={orderByFetchHandler} />
        </RightFilterButtonWrap>
      </FilterContainer>
      <PostList data={postListData} />
      {isLoading && <Loading ref={fetchTarget}> Loading...</Loading>}
      <GotoTop onClick={gotoTopHandler}>
        <i className="fas fa-arrow-alt-circle-up" />
      </GotoTop>
    </main>
  );
}

export default Main;

const FilterContainer = styled.div`
  ${({ theme }) => theme.setFlex('space-between', 'none')};
  width: 1100px;
  margin: 0 auto;
  padding-top: 55px;
  margin-bottom: 50px;
  max-height: 40px;
`;

const LeftFilterButtonWrap = styled.div`
  flex: 4;
`;

const RightFilterButtonWrap = styled.div`
  display: flex;
  justify-content: space-between;
  flex: 1;
`;

const Loading = styled.div`
  ${({ theme }) => theme.setFlex()}
`;

const GotoTop = styled.button`
  position: fixed;
  right: 0;
  bottom: 0;
  margin-right: 20px;
  margin-bottom: 10px;
  background: inherit;
  border: none;
  box-shadow: none;
  border-radius: 0;
  padding: 0;
  overflow: visible;
  cursor: pointer;
  font-size: 40px;
`;
