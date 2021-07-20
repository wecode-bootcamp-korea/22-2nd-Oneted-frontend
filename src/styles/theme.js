const theme = {
  onetedBlue: '#3366ff',
  onetedBlack: '#333333',
  onetedGray: '#999999',
  setFlex: (justifyContent = 'center', alignItem = 'center') => `
  display: flex;
  justify-content: ${justifyContent};
  align-items: ${alignItem};`,
  setFlexColumn: `
  display: flex;
  flex-direction:column;
`,
};

export { theme };
