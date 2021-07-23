import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import LoginModal from '../Modal/LoginModal';
import SearchModal from '../Modal/SearchModal';

export const LoginState = React.createContext();

const Nav = () => {
  const [isModalOn, setIsModalOn] = useState(false);
  const [isSearchModalOn, setIsSearchModalOn] = useState(false);
  const [isLoginOn, setIsLoginOn] = useState(false);

  const handleModal = () => {
    setIsModalOn(prevIsModal => !prevIsModal);
  };

  const handleSearch = () => {
    setIsSearchModalOn(prevIsSearch => !prevIsSearch);
  };

  const handleLogout = () => {
    localStorage.removeItem('kakao_token');
    setIsLoginOn(false);
  };

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
            <li onClick={handleSearch}>
              <i className="fas fa-search" />
            </li>
            {isSearchModalOn && <SearchModal clickSearch={handleSearch} />}
            {!isLoginOn ? (
              <li onClick={handleModal}>회원가입/로그인</li>
            ) : (
              <li onClick={handleLogout}>로그아웃</li>
            )}

            <LoginState.Provider value={{ isLoginOn, setIsLoginOn }}>
              {isModalOn && <LoginModal clickModal={handleModal} />}
            </LoginState.Provider>

            <li>기업 서비스</li>
          </AsideNav>
        </aside>
      </Container>
    </Section>
  );
};

const Section = styled.section`
  position: fixed;
  width: 100%;
  border-bottom: 1px solid black;
  background-color: white;
`;

const Container = styled.div`
  ${({ theme }) => theme.setFlex('space-around')}
  width: 1398px;
  height: 50px;
  margin: auto;

  h1 {
    font-size: 30px;
    font-weight: 700;
  }
`;

const NavCategory = styled.ul`
  ${({ theme }) => theme.setFlex}

  li {
    padding: 15px;

    &:hover {
      border-bottom: 1px solid ${({ theme }) => theme.onetedGray};
    }
  }
`;

const AsideNav = styled.ul`
  ${({ theme }) => theme.setFlex}

  li {
    padding: 10px;
  }
`;

export default Nav;
