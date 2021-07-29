import React from 'react';
import styled from 'styled-components';

function ModalBookmark() {
  return (
    <BookmarkContainer>
      <BookmarkText>북마크에 저장되었습니다.</BookmarkText>
    </BookmarkContainer>
  );
}

const BookmarkContainer = styled.div`
  padding: 20px;
  text-align: center;
`;

const BookmarkText = styled.p`
  font-size: 16px;
  font-weight: 600;
`;

export default ModalBookmark;
