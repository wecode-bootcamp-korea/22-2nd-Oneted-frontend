import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
          <Link to="/">
            <h1>wanted</h1>
          </Link>
        </div>
        <NavCategory>
          <Link to="/">
            <li>탐색</li>
          </Link>
          <Link to="/salary">
            <li>직군별 연봉</li>
          </Link>
          <Link to="/resume">
            <li>이력서</li>
          </Link>
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
              <>
                <Link to={'/mypage'}>
                  <i className="far fa-user" />
                </Link>
                <li onClick={handleLogout}>로그아웃</li>
              </>
            )}

            <LoginState.Provider value={{ isLoginOn, setIsLoginOn }}>
              {isModalOn && <LoginModal clickModal={handleModal} />}
            </LoginState.Provider>
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
  z-index: 9999;
`;

const Container = styled.div`
  ${({ theme }) => theme.setFlex('space-around')}
  width: 100vw;
  height: 50px;
  margin: auto;

  h1 {
    font-size: 30px;
    font-weight: 700;
  }

  a {
    color: black;
    text-decoration: none;
  }
`;

const NavCategory = styled.ul`
  ${({ theme }) => theme.setFlex}

  li {
    padding: 15px;
    color: black;
    cursor: pointer;

    &:hover {
      border-bottom: 1px solid ${({ theme }) => theme.onetedGray};
    }
  }

  a {
    text-decoration: none;
  }
`;

const AsideNav = styled.ul`
  ${({ theme }) => theme.setFlex}

  li {
    padding: 10px;
    cursor: pointer;
  }
`;

export default Nav;
