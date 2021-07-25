import React from 'react';

import styled from 'styled-components';

const Text = props => {
  return <Span color={props.color}>{props.children}</Span>;
};

export default Text;

const Span = styled.span`
  font-size: ${props => props.size};
  color: ${props =>
    props.oneted ? props.theme['oneted' + props.color] : props.color};
  font-weight: ${props => props.bold};
`;
