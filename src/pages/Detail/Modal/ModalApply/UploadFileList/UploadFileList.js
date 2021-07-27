import React from 'react';
import styled from 'styled-components';

const ModalApply = ({ file, checkHandle, idx }) => {
  return (
    <div>
      <UploadList>
        <InputCheckBox
          type="checkbox"
          onChange={e => checkHandle(e, idx)}
          id={idx}
        />
        <UploadFileName>{file.file.name}</UploadFileName>
      </UploadList>
    </div>
  );
};

export default ModalApply;

const UploadList = styled.div`
  margin-bottom: 10px;
  border: 1px solid #ececec;
  border-radius: 4px;
`;

const InputCheckBox = styled.input`
  width: 20px;
  height: 20px;
  margin: 15px;
`;

const UploadFileName = styled.p`
  display: inline-block;
  position: relative;
  top: -4px;
  font-weight: 600;
`;
