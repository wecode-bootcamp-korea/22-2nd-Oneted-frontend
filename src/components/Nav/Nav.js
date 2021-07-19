import { React, useState } from 'react';
import styled from 'styled-components';

import LoginModal from '../Modal/LoginModal';
import SearchModal from '../Modal/SearchModal';

const Nav = () => {
  const [isModal, setIsModal] = useState(false);
  const [isSearch, setIsSearch] = useState(false);

  const handleModal = () => {
    setIsModal(prevIsModal => !prevIsModal);
  };

  const handleSearch = () => {
    setIsSearch(prevIsSearch => !prevIsSearch);
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
            {isSearch && <SearchModal clickSearch={handleSearch} />}
            <li onClick={handleModal}>회원가입/로그인</li>
            {isModal && <LoginModal clickModal={handleModal} />}
            <li>기업 서비스</li>
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
