import React, { useState } from 'react';

import styled from 'styled-components';

import Modal from './RegionModal/RegionModal';

function Button({ title, description, regionFetchHandler }) {
  const [isModalOn, setisModalOn] = useState(false);

  const handleModal = () => {
    setisModalOn(prevModalOn => !prevModalOn);
  };

  return (
    <>
      <FilterButton onClick={handleModal}>
        <span>{title}</span>
        <span>{description}</span>
        <i className="fas fa-caret-down" />
      </FilterButton>
      {isModalOn && (
        <Modal
          title="지역"
          handleModal={handleModal}
          regionFetchHandler={regionFetchHandler}
        />
      )}
    </>
  );
}

export default Button;

const FilterButton = styled.button`
  background: none;
  border: 1px solid rgb(236, 236, 236);
  height: 40px;
  & span {
    margin-left: 8px;
  }
  & i {
    margin: 0 10px;
  }
`;
