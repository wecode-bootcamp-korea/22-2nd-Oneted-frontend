import React from 'react';
import styled from 'styled-components';

function TagModal() {
  return (
    <Wrapper>
      <h4>추천태그로 검색해보세요</h4>
      <ul>
        <li>
          <button>#퇴사율5%이하</button>
        </li>
        <li>
          <button>#mac</button>
        </li>
        <li>
          <button>연봉상위2%</button>
        </li>
      </ul>
    </Wrapper>
  );
}
export default TagModal;

const Wrapper = styled.div`
  padding-top: 50px;
  margin: 0 66px 0 56px;
  ul {
    display: flex;
    button {
      height: 50px;
      padding: 0 26px;
      border-radius: 20px;
      background-color: #effbf3;
      border: none;
      cursor: pointer;
    }
  }
`;
