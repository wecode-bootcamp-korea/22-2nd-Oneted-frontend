import React, { useState } from 'react';

import styled from 'styled-components';

import Modal from './FilterModal/FilterModal';

function Button({ title, description, tagFetchHandler, tagFetchData }) {
  const [modalOn, setModalOn] = useState(false);

  const handleModal = () => {
    setModalOn(!modalOn);
  };

  const descriptionHandler = () => {
    let descriptions = '';
    if (tagFetchData.length === 1) {
      descriptions = tagFetchData[0];
    } else if (tagFetchData.length > 1) {
      descriptions = tagFetchData[0] + ' 외';
    }
    return descriptions;
  };

  return (
    <>
      <FilterButton onClick={handleModal}>
        <span>{title}</span>
        {tagFetchData.length > 0 ? (
          <Text oneted color="Blue" bold="bold">
            {descriptionHandler()}
          </Text>
        ) : (
          <Text oneted color="Gray">
            {description}
          </Text>
        )}

        <i className="fas fa-caret-down"></i>
      </FilterButton>
      {modalOn && (
        <Modal
          title="태그"
          handleModal={handleModal}
          tagFetchHandler={tagFetchHandler}
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

const Text = styled.span`
  font-size: ${props => props.size};
  color: ${props =>
    props.oneted ? props.theme['oneted' + props.color] : props.color};
  font-weight: ${props => props.bold};
`;
