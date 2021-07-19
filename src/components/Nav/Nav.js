import React from 'react';
import styled from 'styled-components';
import { setFlex, theme } from '../../styles/theme';

const Nav = () => {
  return (
    <Section>
      <Container>
        <div>
          <h1>wanted</h1>
        </div>
        <NavCategory>
          <li>탐색</li>
          <li>커리어 성장</li>
          <li>직군별 연봉</li>
          <li>이력서</li>
        </NavCategory>
        <aside>
          <AsideNav>
            <li>
              <i className="fas fa-search"></i>
            </li>
            <li>회원가입/로그인</li>
            <li>
              <a href="/">기업 서비스</a>
            </li>
          </AsideNav>
        </aside>
      </Container>
    </Section>
  );
};

const Section = styled.section`
  border-bottom: 1px solid black;
`;

const Container = styled.div`
  ${setFlex};
  align-items: center;
  justify-content: space-around;
  width: 1398px;
  height: 50px;
  margin: auto;

  h1 {
    font-size: 30px;
    font-weight: 700;
  }
`;

const NavCategory = styled.ul`
  ${setFlex};

  li {
    padding: 15px;

    &:hover {
      border-bottom: 1px solid ${theme.onetedGray};
    }
  }
`;

const AsideNav = styled.ul`
  ${setFlex}

  li {
    padding: 10px;
  }
`;

export default Nav;
