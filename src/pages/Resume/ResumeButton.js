import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';

function ResumeButton({ resume, setResumeData, resumeData }) {
  const [isOption, setIsOption] = useState(false);
  const history = useHistory();

  const handleOnClick = e => {
    e.preventDefault();

    setIsOption(!isOption);
  };

  const updateResume = () => {
    history.push(`/resume-form/${resume.id}`);
  };

  const deleteResume = () => {
    fetch(`http://54.180.99.36:8000/resumes/${resume.id}`, {
      method: 'DELETE',
    })
      .then(res => res.json())
      .then(result => {
        if (result.message === 'SUCCESS') {
          const resultResume = resumeData.filter(item => {
            return resume.id !== item.id;
          });

          setResumeData(resultResume);
        }
      });
  };

  return (
    <ResumeBox>
      <Link to={`/resume-form/${resume.id}`}>
        <ResumeCard>
          <h3>{resume.title}</h3>
          <p>2021-07-23</p>
        </ResumeCard>
        <Status>
          <p>{resume.isDone ? '작성완료' : '작성중'}</p>
          <Option onClick={handleOnClick}>
            <i className="fas fa-ellipsis-h" />
            {isOption && (
              <OptionList>
                <li onClick={updateResume}>수정</li>
                <li onClick={deleteResume}>삭제</li>
              </OptionList>
            )}
          </Option>
        </Status>
      </Link>
    </ResumeBox>
  );
}
export default ResumeButton;

const ResumeBox = styled.div`
  margin: 0 0 20px 20px;
  width: 250px;
  height: 190px;
  border: 1px solid #dbdbdb;

  a {
    text-decoration: none;
  }
`;

const ResumeCard = styled.div`
  border: none;
  height: 80%;
  padding: 20px;
  background-color: #fff;
  cursor: pointer;

  h3 {
    font-size: 18px;
    font-weight: 600;
    color: #999;
  }

  p {
    margin-top: 5px;
    font-size: 16px;
    font-weight: 500;
    color: #999999;
  }
`;

const Status = styled.div`
  ${({ theme }) => theme.setFlex('space-between')}
  height: 20%;
  border-top: 1px solid #dbdbdb;
  background-color: #fff;

  p {
    margin-left: 10px;
  }
`;

const Option = styled.div`
  position: relative;

  i {
    margin-right: 10px;
  }
`;

const OptionList = styled.ul`
  position: absolute;
  top: 65%;
  left: 0;
  min-width: 160px;
  height: 78px;
  background-color: #fff;
  box-shadow: 0 2px 8px rgb(0 0 0 / 15%);

  li {
    margin-top: 10px;
    padding: 5px;

    &:hover {
      cursor: pointer;
      background-color: #ffef;
    }
  }
`;
