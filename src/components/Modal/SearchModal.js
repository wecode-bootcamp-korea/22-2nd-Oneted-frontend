import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { API } from '../../config';
import SearchListModal from './SearchListModal';
import TagModal from './TagModal';

function SearchModal({ clickSearch }) {
  const [postingInfo, setPostingInfo] = useState([]);
  const [searchText, setSearchText] = useState('');
  const timerRef = useRef(undefined);
  const history = useHistory();

  useEffect(() => {
    if (timerRef.current > 0) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      fetch(`${API.AUTO_SEARCH}?query=${searchText}`)
        .then(res => res.json())
        .then(result => setPostingInfo(result.result));
    }, 400);
  }, [searchText]);

  const clickInput = e => {
    e.stopPropagation();
  };

  // 검색 입력 값 state 저장
  const handleChange = e => {
    if (e.target.value !== '') {
      setSearchText(e.target.value);
    }
  };

  // enter 키 이벤트
  const handleKeyEvent = e => {
    if (e.key === 'Enter') {
      history.push(`/search?query=${searchText}`);
      clickSearch();
      e.preventDefault();
    }
  };

  return (
    <Dimmer onClick={clickSearch}>
      <SearchContainer>
        <Wrapper>
          <form>
            <div>
              <input
                type="search"
                placeholder="#태그,포지션 검색"
                onChange={handleChange}
                onClick={clickInput}
                onKeyPress={handleKeyEvent}
              />
              <i className="fas fa-search" />
            </div>
          </form>
          {searchText ? (
            <SearchListModal
              postingInfo={postingInfo}
              searchText={searchText}
            />
          ) : (
            <TagModal />
          )}
        </Wrapper>
      </SearchContainer>
    </Dimmer>
  );
}

export default SearchModal;

const Dimmer = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #00000080;
  z-index: 200;
`;

const SearchContainer = styled.section`
  background-color: white;
`;

const Wrapper = styled.div`
  padding: 30px 0 100px 0;

  form {
    display: flex;
    justify-content: center;

    div {
      position: relative;
      i {
        position: absolute;
        margin: 0 16px 0 16px;
        font-size: 18px;
        top: 15px;
        left: 0;
      }

      input {
        width: 962px;
        height: 48px;
        padding: 0 26px 0 40px;
        border: 1px solid blue;
        border-radius: 25px;
        outline: none;
      }
    }
  }
`;
