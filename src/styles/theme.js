import { css } from 'styled-components';

const theme = {
  onetedBlue: '#3366ff',
  onetedBlack: '#333333',
  onetedGray: '#999999',
};

const setFlex = (justifyContent = 'center', alignItem = 'center') => css`
  display: flex;
  align-item: $(justifyContent);
  justify-content: $(alignItem);
`;

export { theme, setFlex };
