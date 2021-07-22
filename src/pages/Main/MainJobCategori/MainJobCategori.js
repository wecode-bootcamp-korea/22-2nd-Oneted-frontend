import React from 'react';
import styled from 'styled-components';

function MainJobCategori() {
  return (
    <Container>
      {DATA.map(data => (
        <JobCategoriImage>
          <JobCategoriBox
            bacgourndColor={
              BACKGROUND_COLOR[
                Math.floor(Math.random() * (BACKGROUND_COLOR.length - 1))
              ]
            }
          >
            <Text>{data.name}</Text>
          </JobCategoriBox>
        </JobCategoriImage>
      ))}
    </Container>
  );
}

export default MainJobCategori;

const Container = styled.div`
  width: 1100px;
  margin: 10px auto;
  display: flex;
  overflow: hidden;
`;

const JobCategoriImage = styled.div`
  min-width: 120px;
  height: 60px;
  margin: 5px;
  background-image: url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80');
  background-size: cover;
`;

const JobCategoriBox = styled.div`
  min-width: 120px;
  height: 60px;
  opacity: 0.7;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.bacgourndColor};
`;

const Text = styled.h2`
  color: white;
  font-size: 14px;
`;

const DATA = [
  {
    id: 1,
    name: '서버개발자',
  },
  {
    id: 2,
    name: '프론트엔드 개발자',
  },
  {
    id: 3,
    name: '소프트웨어 개발자',
  },
  {
    id: 4,
    name: '서버개발자',
  },
  {
    id: 5,
    name: '프론트엔드 개발자',
  },
  {
    id: 6,
    name: '소프트웨어 개발자',
  },
  {
    id: 7,
    name: '서버개발자',
  },
  {
    id: 8,
    name: '프론트엔드 개발자',
  },
  {
    id: 9,
    name: '소프트웨어 개발자',
  },
  {
    id: 10,
    name: '서버개발자',
  },
  {
    id: 11,
    name: '프론트엔드 개발자',
  },
  {
    id: 12,
    name: '소프트웨어 개발자',
  },
];

const BACKGROUND_COLOR = ['#000066', '#33001a', '#1a1a00', '#000000'];
