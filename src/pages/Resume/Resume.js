import React from 'react';
import styled from 'styled-components';

function Resume() {
  return (
    <main>
      <ResumeContainer>
        <ResumeHeader>
          <h4>최근 문서</h4>
          <span>원티드 이력서 소개</span>
        </ResumeHeader>
        <ContentWrapper>
          <ResumeBox>
            <button>
              <Wrapper>
                <WriteBackground>
                  <i className="far fa-copy" />
                </WriteBackground>
                <p>새 이력서 작성</p>
              </Wrapper>
            </button>
          </ResumeBox>
          <ResumeBox>
            <button>
              <Wrapper>
                <UploadBackground>
                  <i className="fas fa-file-upload"></i>
                </UploadBackground>
                <p>파일 업로드</p>
              </Wrapper>
            </button>
          </ResumeBox>
        </ContentWrapper>
      </ResumeContainer>
    </main>
  );
}
export default Resume;

const ResumeContainer = styled.section`
  margin: 50px 126px 0 126px;
`;

const ResumeHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px 0 15px 0;
  font-size: 16px;
`;

const ContentWrapper = styled.div`
  display: flex;
`;

const ResumeBox = styled.div`
  margin: 0 0 20px 20px;
  width: 250px;
  height: 190px;
  border: 1px solid #dbdbdb;

  button {
    width: 100%;
    height: 100%;
    border: none;
    padding: 6px 12px 6px 12px;
    background-color: #fff;
  }
`;

const Wrapper = styled.div`
  ${({ theme }) => theme.setFlex};
  flex-direction: column;

  p {
    margin-top: 20px;
    font-size: 16px;
    font-weight: 600;
  }
`;

const WriteBackground = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 74px;
  height: 74px;
  border-radius: 50%;
  background-color: blue;
  cursor: pointer;

  i {
    font-size: 26px;
    color: #fff;
  }
`;

const UploadBackground = styled.div`
  ${({ theme }) => theme.setFlex('center')}
  width: 74px;
  height: 74px;
  border-radius: 50%;
  background-color: rgb(225, 226, 227);
  cursor: pointer;

  i {
    font-size: 26px;
    color: white;
  }
`;
