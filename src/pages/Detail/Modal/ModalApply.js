import React, { useState } from 'react';
import styled from 'styled-components';

const ModalApply = props => {
  const [addFile, setAddFile] = useState('');
  const [uploadValue, setValue] = useState('');

  const onInputChange = e => {
    setAddFile([...addFile, ...e.target.files]);
    setValue(e.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();
    const formData = new FormData();

    for (let i = 0; i < addFile.length; i++) {
      formData.append('file', addFile[i]);
    }

    fetch('http://10.58.6.154:8000/resumes/file', {
      method: 'POST',
      body: formData,
    })
      .then(res => res.json())
      .then(res => console.log('업로드 성공', res));
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
              {uploadValue &&
                addFile.map(file => {
                  return (
                    <UploadList>
                      <span>V</span>
                      <div>{file.name}</div>
                      <p>date</p>
                      <p>첨부파일</p>
                    </UploadList>
                  );
                })}
              <UploadBtn>
                이력서 업로드
                <input
                  type="file"
                  multiple
                  onChange={onInputChange}
                  style={{ display: 'none' }}
                />
              </UploadBtn>
            </div>
            <NewResumeBtn>새 이력서 작성</NewResumeBtn>
            <div>
              <SubmitBtn>제출하기</SubmitBtn>
            </div>
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
  width: 280px;
  height: 50px;
  padding: 16px 0;
  margin-bottom: 10px;
  border: 1px solid #e1e2e3;
  border-radius: 25px;
  background-color: #fff;
  color: #666666;
  text-align: center;
  font-size: 16px;
  font-weight: 800;
`;

const NewResumeBtn = styled.button`
  width: 280px;
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

const SubmitBtn = styled.button`
  width: 298px;
  height: 50px;
  padding: 0;
  margin-bottom: 10px;
  border: 1px solid #e1e2e3;
  border-radius: 25px;
  background-color: #fff;
  color: #ffffff;
  background-color: ${({ theme }) => theme.onetedBlue};
  font-size: 16px;
  font-weight: 800;

  &:hover {
    cursor: pointer;
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

const UploadList = styled.div`
  margin-bottom: 10px;
  border: 1px solid #999999;
  border-radius: 4px;
`;
