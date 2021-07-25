import React, { useRef } from 'react';

import styled from 'styled-components';

function Modal({ title, handleModal, regionFetchHandler }) {
  const selectedRegion = useRef('');

  const getRegion = event => {
    if (event.target.value === '전체') selectedRegion.current = '';
    else selectedRegion.current = event.target.value;
  };

  const confirm = () => {
    regionFetchHandler(selectedRegion.current);
    handleModal();
  };
  return (
    <ModalBackgournd>
      <ModalOverlay onClick={handleModal} />
      <ModalBox>
        <ModalHeader>
          <ResetButton />
          <h1>{title}</h1>
          <CloseButton name="close" onClick={handleModal}>
            <i className="fal fa-times" />
          </CloseButton>
        </ModalHeader>
        <Container>
          <Selector onChange={getRegion}>
            {REGION.map(regionList => (
              <Option key={regionList.id} value={regionList.region}>
                {regionList.region}
              </Option>
            ))}
          </Selector>
        </Container>
        <Container>
          <ConfirmButton onClick={e => confirm(e)}>확인</ConfirmButton>
        </Container>
      </ModalBox>
    </ModalBackgournd>
  );
}

export default Modal;

const ModalBackgournd = styled.form`
  ${({ theme }) => theme.setFlex()};
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const ModalOverlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
`;

const ModalBox = styled.div`
  position: relative;
  background-color: white;
  text-align: center;
  width: 500px;
  height: 264px;
`;

const ModalHeader = styled.header`
  ${({ theme }) => theme.setFlex('space-between', 'center')}
  font-size: 16px;
  width: 100%;
  height: 54px;
  margin-bottom: 30px;
`;

const ResetButton = styled.div`
  ${({ theme }) => theme.setFlex()};
  width: 83px;
  height: 54px;
  background: none;
  border: none;
  color: ${({ theme }) => theme.onetedGray};
  cursor: pointer;
  & .fas {
    margin-right: 5px;
  }
`;

const CloseButton = styled.div`
  ${({ theme }) => theme.setFlex()};
  width: 54px;
  height: 54px;
  color: ${({ theme }) => theme.onetedGray};
  cursor: pointer;
`;

const Container = styled.div`
  ${({ theme }) => theme.setFlex()};
`;

const Selector = styled.select`
  height: 50px;
  width: 400px;
  margin-bottom: 20px;
`;

const Option = styled.option`
  width: 300px;
`;

const ConfirmButton = styled.div`
  ${({ theme }) => theme.setFlex()};
  font-size: 16;
  font-weight: bold;
  color: white;
  text-align: center;
  height: 50px;
  width: 90%;
  border-radius: 25px;
  background-color: ${({ theme }) => theme.onetedBlue};
  margin-top: 20px;
  border: none;
`;

const REGION = [
  { id: 1, region: '전체' },
  { id: 2, region: '서울' },
  { id: 3, region: '대전' },
  { id: 4, region: '대구' },
  { id: 5, region: '부산' },
];
