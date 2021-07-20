import React from 'react';

import styled from 'styled-components';
import { theme } from '../../../../styles/theme';

function PostCard({ list }) {
  const { company, img, title, location, reward } = list;

  return (
    <>
      <div>
        <PostImage alt="company" src={img} />
      </div>
      <CompanySummery>
        <h2>{title}</h2>
        <p>{company}</p>
        <Text color={theme.onetedGray}>{location}</Text>
        <Text color={theme.onetedGray}>{reward}</Text>
      </CompanySummery>
    </>
  );
}

export default PostCard;

const PostImage = styled.img`
  width: 250px;
  height: 187.5px;
  border-radius: 2.5%;
`;

const CompanySummery = styled.summary`
  ${({ theme }) => theme.setFlex('space-around', 'flex-start')}
  flex-direction: column;
  width: 90%;
  height: 90px;
  margin-top: 15px;
  margin-left: 20px;

  & h2 {
    font-size: 18px;
    font-weight: bold;
  }
`;

const Text = styled.p`
  color: ${props => props.color};
`;
