import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import UploadFileList from './UploadFileList/UploadFileList';

const ModalApply = props => {
  const [addFile, setAddFile] = useState([]);
  const [disabled, setDisabled] = useState(true);

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

    fetch('http://10.58.3.209:8000/resumes/file', {
      method: 'POST',
      body: formData,
    })
      .then(res => res.json())
      .then(res => console.log('제출완료', res));
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
          <form encType="multipart/form-data" onSubmit={onSubmit}>
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
                <input
                  type="file"
                  multiple
                  onChange={onInputChange}
                  style={{ display: 'none' }}
                />
              </UploadBtn>
            </div>
            <NewResumeBtn>새 이력서 작성</NewResumeBtn>
            <ApplyBottomContainer>
              <ApplyBottomText>
                원티드 이력서로 지원하면 최종 합격률이 40% 높아집니다.
              </ApplyBottomText>
            </ApplyBottomContainer>
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
  right: calc((100% - 1000px) / 2);
  width: 340px;
  border: 1px solid #e8e8e8;
  border-radius: 4px;
  color: ${({ theme }) => theme.onetedBlack};
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
  padding-top: 20px;
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

const ApplyBottomContainer = styled.div`
  padding: 30px 0;
`;

const ApplyBottomText = styled.p`
  font-size: 13px;
  line-height: 1.4;
  color: #666666;
`;
