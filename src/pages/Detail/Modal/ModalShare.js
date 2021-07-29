import React, { useState, useRef } from 'react';
import styled from 'styled-components';

const ModalShare = props => {
  const [successTextCopy, setSuccessTextCopy] = useState(false);

  const textInput = useRef();

  const copy = () => {
    const copyText = textInput.current;
    copyText.select();
    document.execCommand('copy');
    setSuccessTextCopy(true);
  };

  return (
    <ModalShareBg>
      <ModalOverlay onClick={props.closeModal} />
      <ModalShareContainer>
        <ModalTop>
          <CloseBtn onClick={props.closeModal}>X</CloseBtn>
          <ModalTopTitle>공유하기</ModalTopTitle>
          <p>
            이 포지션과 어울리는 사람을 알고 있다면, 공유해주세요!
            <br />
            공유 후 추천까지 완료하면, 지원자 최종합격시 보상금을
            지급해드립니다.
          </p>
        </ModalTop>
        <hr />
        <ModalBottom>
          <p>링크 공유</p>
          <div onClick={copy}>
            <CopyInputBox
              ref={textInput}
              type="text"
              value="url 주소"
              readOnly
            />
            <CopyBtn>복사</CopyBtn>
          </div>
          {successTextCopy && <Success>복사되었습니다</Success>}
        </ModalBottom>
      </ModalShareContainer>
    </ModalShareBg>
  );
};

const ModalShareBg = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const ModalTop = styled.div`
  height: 110px;
  padding: 20px 20px;
  font-size: 14px;
  text-align: center;

  p {
    margin-top: 10px;
    line-height: 1.5;
    color: #b5b5b5;
  }
`;

const ModalBottom = styled.div`
  padding: 20px;

  p {
    padding: 10px 0 5px 0;
    color: #757575;
    font-size: 14px;
  }
`;

const ModalTopTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
`;

const ModalOverlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
`;

const ModalShareContainer = styled.div`
  position: relative;
  max-width: 500px;
  margin: 200px auto;
  border-radius: 4px;
  background-color: white;
  box-shadow: 1px 2px 8px 0.8;
  z-index: 999;

  hr {
    border: none;
    border-bottom: 1px solid #f3f3f3;
  }
`;

const Success = styled.div`
  margin-top: 10px;
  color: #36f;
  font-size: 14px;
`;

const CloseBtn = styled.button`
  position: absolute;
  right: 20px;
`;

const CopyInputBox = styled.input`
  width: calc(100% - 124px);
  height: 50px;
  padding: 0 15px;
  border: 1px solid #dbdbdb;
  border-radius: 2px 0 0 2px;
  font-size: 16px;
  outline-style: none;
`;

const CopyBtn = styled.button`
  width: 90px;
  height: 52px;
  padding: 0;
  border: none;
  border-radius: 0 2px 2px 0;
  background-color: ${({ theme }) => theme.onetedBlue};
  color: #ffffff;
`;

export default ModalShare;
