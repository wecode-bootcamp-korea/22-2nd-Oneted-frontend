import React, { useState, useEffect } from 'react';
import { API } from '../../config';
import styled from 'styled-components';
import PostList from './PostList/PostList';
function Application(props) {
  const [applicationList, setApplicationList] = useState([]);
  const [userApplication, setUserApplication] = useState([
    { name: '전체', count: 0 },
    { name: '지원 완료', count: 0 },
    { name: '서류 통과', count: 0 },
    { name: '최종 합격', count: 0 },
    { name: '불합격', count: 0 },
  ]);

  useEffect(() => {
    fetch(`${API.USER_INFO}`, {
      headers: {
        Authorization: localStorage.getItem('kakao_token'),
      },
    })
      .then(res => res.json())
      .then(data => {
        userApplication.filter(info => info.name === '전체')[0].count =
          data.result.applies.length;
        userApplication.filter(info => info.name === '지원 완료')[0].count =
          data.result.applies.length;
        setUserApplication(prev => [...prev]);
        setApplicationList(data.result.applies);
      });
  }, []);
  return (
    <Container>
      <Aside>
        <LeftContainer>
          <LeftSecction>
            <Title>지원현황</Title>
          </LeftSecction>
          <LeftSecction>
            <Text color="#859392" size="0.9rem">
              추천한 후보자
            </Text>
            <Text oneted color="Gray" size="1rem">
              추천보상금 대상자
            </Text>
          </LeftSecction>
          <BorderLeftSecction>
            <Text oneted color="Gray" size="1rem">
              지원
            </Text>
            <Text oneted color="Gray" size="1rem">
              작성 중
            </Text>
            <Text oneted color="Blue" size="1rem">
              지원한 포지션
            </Text>
          </BorderLeftSecction>
        </LeftContainer>
      </Aside>
      <Wraper>
        <CountBoxWraper>
          {userApplication.map((data, index) => (
            <CountBox key={index} index={index}>
              <p>{data.count}</p>
              <span>{data.name}</span>
            </CountBox>
          ))}
        </CountBoxWraper>
        <TotalCount>
          <span>
            총 {userApplication.filter(info => info.name === '전체')[0].count}{' '}
            건
          </span>
        </TotalCount>
        <SearchResult>
          <Info />
          <ListBox>
            {userApplication.length ? (
              <PostList history={props.history} data={applicationList} />
            ) : (
              <EmptyBox>
                <i className="fas fa-search"></i>
                <p>요청하신 결과가 없습니다.</p>
              </EmptyBox>
            )}
          </ListBox>
        </SearchResult>
      </Wraper>
    </Container>
  );
}
export default Application;
const Container = styled.div`
  display: flex;
  background-color: rgb(248, 248, 250);
`;
const Aside = styled.aside`
  height: 100vh;
  display: inline;
  margin-left: auto;
`;
const LeftContainer = styled.div`
  height: 50vh;
  width: 250px;
  right: 0;
  margin-left: auto;
  ${({ theme }) => theme.setFlexColumn};
`;
const LeftSecction = styled.div`
  flex: 1;
  ${({ theme }) => theme.setFlexColumn};
  justify-content: space-evenly;
`;
const BorderLeftSecction = styled(LeftSecction)`
  border-top: 1px solid ${({ theme }) => theme.onetedGray};
`;
const Title = styled.h1`
  font-size: 1.5em;
  margin-top: auto;
`;
const Wraper = styled.div`
  ${({ theme }) => theme.setFlexColumn};
  width: 800px;
  margin-right: auto;
`;
const CountBoxWraper = styled.div`
  height: 300px;
  width: 100%;
  display: flex;
`;
const Text = styled.p`
  font-size: ${props => props.size};
  color: ${props =>
    props.oneted ? props.theme['oneted' + props.color] : props.color};
`;
const CountBox = styled(LeftSecction)`
  height: 55%;
  margin-top: auto;
  ${({ theme }) => theme.setFlex};
  flex-direction: column;
  border-right: ${props =>
    props.index === APPLICATION_DATA.length - 1
      ? 'none'
      : `1px solid ${props.theme.onetedGray}`};
  & p {
    font-size: 3.5rem;
  }
  & span {
    font-size: 1rem;
  }
`;
const TotalCount = styled.div`
  height: 50px;
  display: flex;
  justify-content: space-between;
  & span {
    margin-top: auto;
    font-size: 1.2rem;
  }
`;
const SearchResult = styled.div`
  height: 300px;
  flex: 6;
  ${({ theme }) => theme.setFlexColumn};
`;
const Info = styled.div`
  flex: 1;
  border-bottom: 1px solid ${({ theme }) => theme.onetedGray};
`;
const ListBox = styled.div`
  flex: 9;
`;
const EmptyBox = styled.div`
  ${({ theme }) => theme.setFlex};
  flex-direction: column;
  margin-top: 100px;
  color: ${({ theme }) => theme.onetedGray};
  & .fas {
    font-size: 2rem;
    background-color: white;
    padding: 20px;
    border-radius: 40px;
    margin-bottom: 15px;
  }
`;
const APPLICATION_DATA = [
  { name: '전체', count: 0 },
  { name: '지원 완료', count: 0 },
  { name: '서류 통과', count: 0 },
  { name: '최종 합격', count: 0 },
  { name: '불합격', count: 0 },
];
