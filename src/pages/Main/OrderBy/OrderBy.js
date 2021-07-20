import React, { useState, useEffect } from 'react';

import styled from 'styled-components';

function OrderBy({ orderByFetchHandler }) {
  const [selected, setSelected] = useState('최신순');
  const [sortList, setSortList] = useState([]);
  const [toggleActive, setToggleActive] = useState(false);

  useEffect(() => {
    const newSortList = DATA.filter(data => data.name !== selected);
    setSortList(newSortList);
  }, [selected]);

  const toggleHandler = () => {
    setToggleActive(!toggleActive);
  };

  const setlectSort = name => {
    setSelected(name);
    setToggleActive(!toggleActive);
  };

  const sortHandler = list => {
    setlectSort(list.name);
    orderByFetchHandler(list.params);
  };

  return (
    <Container>
      <OrderByButton onClick={() => toggleHandler()}>
        <span>{selected}</span>
        <i className="fas fa-caret-down"></i>
      </OrderByButton>
      {toggleActive &&
        sortList.map(list => (
          <OrderByButton key={list.id} onClick={() => sortHandler(list)}>
            <span>{list.name}</span>
          </OrderByButton>
        ))}
    </Container>
  );
}

export default OrderBy;

const Container = styled.div`
  position: relative;
`;

const OrderByButton = styled.button`
  background: none;
  border: 1px solid rgb(236, 236, 236);
  height: 40px;
  width: 100px;
  display: flex;
  justify-content: flex-start;
  align-content: center;
  flex-wrap: wrap;
  background-color: white;

  & span {
    margin-left: 10px;
  }

  & .fas {
    justify-self: flex-end;
    margin-left: auto;
    margin-right: 10px;
  }
`;

const DATA = [
  { id: 1, name: '최신순', params: 'latest' },
  { id: 2, name: '인기순', params: 'popular' },
  { id: 3, name: '신청순', params: 'apply' },
];
