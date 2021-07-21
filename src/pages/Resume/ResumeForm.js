import React, { useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import styled from 'styled-components';

function ResumeForm() {
  const [inputTextData, setInputTextData] = useState({
    intro: '',
    career: '',
    education: '',
    skills: '',
  });

  const sumOfCharacters = Object.values(inputTextData).reduce(
    (sum, cur) => sum + cur.length,
    0
  );

  const handleOnchange = e => {
    setInputTextData({
      ...inputTextData,
      [e.target.name]: e.target.value,
    });
  };

  const generatePDF = () => {
    html2canvas(document.querySelector('#main')).then(canvas => {
      const doc = new jsPDF('p', 'pt', 'a4');
      window.scrollTo(
        0,
        document.body.scrollHeight || document.documentElement.scrollHeight
      );
      const imgData = canvas.toDataURL('image/png');

      doc.addImage(imgData, 'PNG', 30, 30, 700, 700);
      doc.save('sample.pdf');
    });
  };

  return (
    <Container>
      <div>
        <Header>
          <div>
            <button onClick={generatePDF} type="primary">
              <i className="fas fa-file-download"></i>
            </button>
          </div>
        </Header>
      </div>
      <Main id="main">
        <h1>PARK</h1>
        <div>
          <p>이름</p>
          <p>메일</p>
        </div>
        <Section>
          {DESCRIPTION.map(description => {
            return (
              <>
                <header>{description.title}</header>
                <ul>
                  {description.desc.map(descList => (
                    <li>{descList}</li>
                  ))}
                </ul>
                <textarea
                  onChange={handleOnchange}
                  name={description.name}
                  type="text"
                  value={inputTextData.name}
                  placeholder={description.placeholder}
                />
              </>
            );
          })}
        </Section>
      </Main>

      <Footer>
        <div>
          <div>
            <p>글자 수 : {sumOfCharacters} </p>
          </div>

          <Wrapper>
            <div>
              <Progressbar>
                <Graph count={sumOfCharacters} />
              </Progressbar>

              <CheerText count={sumOfCharacters}>
                {sumOfCharacters < 400
                  ? '💪 400자 이상 작성하시면 이력서를 완료할 수 있어요!'
                  : '👍 훌륭한 이력서를 보유하고 계시는군요!'}
              </CheerText>
            </div>
            <BtnWrapper>
              <SaveBtn>
                <span>임시 저장</span>
              </SaveBtn>
              <CompleteBtn>
                <span>작성 완료</span>
              </CompleteBtn>
            </BtnWrapper>
          </Wrapper>
        </div>
      </Footer>
    </Container>
  );
}
export default ResumeForm;

const DESCRIPTION = [
  {
    title: '간단 소개글',
    name: 'intro',
    desc: [
      '- 본인의 업무 경험을 기반으로 핵심역량과 업무 스킬을 간단히 작성해주세요.',
      '- 3~5줄로 요약하여 작성하는 것을 추천합니다!',
    ],
    placeholder:
      '간단한 자기소개를 통해 이력서를 돋보이게 만들어보세요. (3 - 5줄 권장)',
  },
  {
    title: '경력',
    name: 'career',
    desc: [
      '- 담당하신 업무 중 우선순위가 높은 업무를 선별하여 최신순으로 작성해주세요.',
      '- 경력사항이 없는 경우 신입 으로 작성해주세요.',
      '- 업무 성과는 되도록 구체적인 숫자 혹은 %로 표현해주세요!',
    ],
    placeholder: '주요 이력 사항들을 작성해주세요.',
  },
  {
    title: '학력',
    name: 'education',
    desc: ['- 최신순으로 작성해주세요.'],
    placeholder: '최종 학력을 기입해주세요.',
  },
  {
    title: '스킬',
    name: 'skills',
    desc: [
      '- 개발 스택, 디자인 툴, 마케팅 툴 등 가지고 있는 직무와 관련된 스킬을 추가해보세요.',
      '- 데이터 분석 툴이나 협업 툴 등의 사용해본 경험이 있으신 툴들도 추가해보세요.',
    ],
    placeholder: '업무와 관련된 스킬들을 작성해주세요.',
  },
];

const Container = styled.div`
  position: relative;
  margin: 0 54px;
`;

const Header = styled.div`
  position: fixed;
  height: 50px;
  width: 80%;

  div {
    padding-top: 50px;
    text-align: right;

    button {
      width: 40px;
      height: 40px;
      border-color: #999;
      color: #76797e;
      cursor: pointer;
      i {
        font-size: 20px;
      }
    }
  }
`;

const Main = styled.main`
  padding-top: 30px;

  h1 {
    margin: 130px 0 50px 0;
    font-size: 36px;
    font-weight: 500;
  }
  div {
    margin-bottom: 50px;
  }

  p {
    margin-top: 20px;
    font-size: 16px;
  }
`;

const CheerText = styled.p`
  color: ${props => (props.count > 400 ? 'blue' : 'black')};
`;

const Section = styled.section`
  margin-bottom: 40px;
  padding-bottom: 100px;

  header {
    padding: 20px 0 6px 0;
    border-bottom: 1px solid black;
  }

  ul {
    margin-top: 20px;
    background-color: #f3f9fe;

    li {
      margin-top: 10px;
    }
  }

  textarea {
    width: 1450px;
    margin-top: 30px;
    font-size: 16px;
    border: none;
    outline: none;
  }
`;

const Footer = styled.footer`
  position: fixed;
  width: 100%;
  height: 82px;
  bottom: 0;
  padding: 0 50px;
  border-top: 1px solid #e0e0e0;
  background-color: white;
  z-index: 20;

  p {
    line-height: 25px;
  }
`;

const Wrapper = styled.div`
  ${({ theme }) => theme.setFlex('space-between')}

  div {
    display: flex;
    align-items: center;
  }
`;
const Progressbar = styled.div`
  height: 9px;
  width: 150px;
  background-color: #e1e2e3;
  border-radius: 4.5px;
`;
const Graph = styled.div`
  height: 9px;
  width: ${props => `${props.count * 0.3}px`};

  background-color: #333333;
`;

const BtnWrapper = styled.div`
  display: flex;
  margin-right: 40px;

  button {
    width: 163px;
    height: 45px;
    padding: 14px 30px 13px 28px;
    border: 1px solid black;
    border-radius: 25px;
    font-size: 16px;
    cursor: pointer;
  }
`;

const SaveBtn = styled.button`
  border: 1px solid #36f;
  color: #36f;
`;

const CompleteBtn = styled.button`
  margin-left: 10px;
  background-color: #36f;
  color: white;
`;
