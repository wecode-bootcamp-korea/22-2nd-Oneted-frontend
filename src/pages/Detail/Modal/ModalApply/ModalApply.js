import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import { API } from '../../../../config';

import UploadFileList from './UploadFileList/UploadFileList';

const ModalApply = props => {
  const [addFile, setAddFile] = useState([]);
  const [disabled, setDisabled] = useState(true);

  const history = useHistory();

  useEffect(() => {
    const result = addFile.filter(el => el.checked === true);
    result.length > 0 ? setDisabled(false) : setDisabled(true);
  }, [addFile]);
  const onInputChange = e => {
    const newFile = [...addFile];
    for (let i = 0; i < e.target.files.length; i++) {
      newFile.push({ file: e.target.files[i], checked: false });
    }
    setAddFile(newFile);
  };
  const checkHandle = (e, idx) => {
    const arr = [...addFile];
    const checkedPoint = { file: arr[idx].file, checked: !arr[idx].checked };
    arr[idx] = checkedPoint;
    setAddFile(arr);
  };
  const onSubmit = e => {
    const formData = new FormData();
    e.preventDefault();
    for (let i = 0; i < addFile.length; i++) {
      if (addFile[i].checked) {
        formData.append('file', addFile[i].file);
      }
    }
    fetch(`${API.RESUME}/file`, {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: localStorage.getItem('kakao_token'),
      },
    })
      .then(res => res.json())
      .then(res => {
        if (res['message'] === 'SUCCESS') {
          alert('제출완료');
        }
      })
      .then(() => {
        history.push('/mapage');
      });
  };
  return (
    <div>
      <div onClick={props.closeModal} />
      <ModalApplyContainer>
        <ModalApplyTop>
          <CloseBtn onClick={props.closeModal}>뒤로</CloseBtn>
          <h2>지원하기</h2>
        </ModalApplyTop>
        <ApplyContainer>
          <SubmitText>지원 정보</SubmitText>
          <BodyTextContainer>
            <SubmitText>이름</SubmitText>
            <SubmitInput type="text" value="최민재" />
          </BodyTextContainer>
          <BodyTextContainer>
            <SubmitText>이메일</SubmitText>
            <SubmitInput type="text" value="rious275@naver.com" />
          </BodyTextContainer>
          <div>
            <SubmitTextBottom>첨부파일</SubmitTextBottom>
          </div>
          <form onSubmit={onSubmit} encType="multipart/form-data">
            <div>
              {addFile &&
                addFile.map((file, idx) => {
                  return (
                    <div>
                      <UploadFileList
                        idx={idx}
                        checkHandle={checkHandle}
                        addFile={addFile}
                        file={file}
                      />
                    </div>
                  );
                })}

              <UploadBtn>
                파일업로드
                <input type="file" multiple onChange={onInputChange} />
              </UploadBtn>
            </div>
            <NewResumeBtn
              onClick={() => {
                history.push({ pathname: '/resume-form' });
              }}
            >
              새 이력서 작성
            </NewResumeBtn>
            <Footer>
              <SubmitBtn disabled={disabled}>제출하기</SubmitBtn>
            </Footer>
          </form>
        </ApplyContainer>
      </ModalApplyContainer>
    </div>
  );
};
export default ModalApply;
const ModalApplyContainer = styled.div`
  position: fixed;
  top: 70px;
  right: 117px;
  width: 340px;
  border: 1px solid #e8e8e8;
  border-radius: 4px;
  color: ${({ theme }) => theme.onetedBlack};
  background-color: #ffffff;
  z-index: 1;
`;
const ModalApplyTop = styled.div`
  padding: 15px 20px;
  border-bottom: 1px solid #e8e8e8;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
`;
const CloseBtn = styled.button`
  position: absolute;
  top: 12px;
  right: 20px;
  border-style: none;
  color: #999999;
  background-color: #ffffff;
  font-size: 16px;
  font-weight: 600;
`;
const UploadBtn = styled.label`
  display: block;
  width: 300px;
  height: 50px;
  padding: 16px 0;
  margin: 24px auto 10px;
  border: 1px solid #e1e2e3;
  border-radius: 25px;
  background-color: #fff;
  color: #666666;
  text-align: center;
  font-size: 16px;
  font-weight: 800;
  input {
    display: none;
  }
`;
const NewResumeBtn = styled.button`
  width: 300px;
  height: 50px;
  padding: 0;
  margin-bottom: 10px;
  border: 1px solid #e1e2e3;
  border-radius: 25px;
  background-color: #fff;
  color: #666666;
  font-size: 16px;
  font-weight: 800;
  &:hover {
    cursor: pointer;
  }
`;
const Footer = styled.div`
  padding-top: 10px;
  border-top: 1px solid #ececec;
`;
const SubmitBtn = styled.button`
  width: 300px;
  height: 50px;
  padding: 0;
  border: none;
  border-radius: 25px;
  background-color: #fff;
  color: #ffffff;
  background-color: ${({ theme }) => theme.onetedBlue};
  font-size: 16px;
  font-weight: 800;
  &:hover {
    cursor: pointer;
  }
  &:disabled {
    color: #cccccc;
    background-color: #f2f4f7;
    &:hover {
      cursor: auto;
    }
  }
`;
const SubmitText = styled.p`
  display: inline-block;
  width: 80px;
  font-size: 16px;
  font-weight: 600;
`;
const SubmitTextBottom = styled(SubmitText)`
  margin: 30px 0 20px 0;
`;
const SubmitInput = styled.input`
  width: calc(100% - 84px);
  padding: 0;
  border-style: none;
  font-size: 16px;
  font-weight: 600;
  outline-style: none;
`;
const BodyTextContainer = styled.div`
  height: 50px;
  margin-bottom: 5px;
  padding-top: 18px;
  border-bottom: 1px solid #e1e2e3;
`;
const ApplyContainer = styled.div`
  padding: 20px;
`;
