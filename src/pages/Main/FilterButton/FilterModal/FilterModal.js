import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

function Modal({ title, handleModal, tagFetchHandler }) {
  const [filterCategories, setFilterCategories] = useState([]);
  const [selectCategory, setselectCategory] = useState(1);
  const [multipleAlert, setMultipleAlert] = useState(false);

  useEffect(() => {
    fetch('http://54.180.99.36:8000/jobpostings/tags')
      .then(res => res.json())
      .then(data => {
        setFilterCategories(
          data.result.map(({ ...rest }) => ({
            ...rest,
            selected: [],
          }))
        );
      });
  }, []);

  useEffect(() => setMultipleAlert(false), [selectCategory]);

  const tagListHandler = id => setselectCategory(id);

  const prevSelected = id => {
    return filterCategories.filter(filterList => filterList.id === id)[0]
      .selected;
  };

  const changeTag = (id, tag) => {
    return filterCategories.map(mapList =>
      mapList.id === id ? { ...mapList, selected: [tag] } : mapList
    );
  };

  const addTagList = (id, tagName, multiple) => {
    if (multiple) {
      setFilterCategories(
        filterCategories.map(mapList =>
          mapList.id === id
            ? { ...mapList, selected: [...prevSelected(id), tagName] }
            : mapList
        )
      );
    } else if (!multiple && prevSelected(id).length === 0) {
      setFilterCategories(changeTag(id, tagName));
    } else {
      setMultipleAlert(true);
      setFilterCategories(changeTag(id, tagName));
    }
  };

  const removeSelected = (id, tagName) => {
    const removeTag = prevSelected(id).filter(prevTag => tagName !== prevTag);
    setFilterCategories(
      filterCategories.map(mapList =>
        mapList.id === id
          ? {
              ...mapList,
              selected: [...removeTag],
            }
          : mapList
      )
    );
  };

  const tagListCount = () => {
    return filterCategories.selected
      ? filterCategories
          .map(setList => setList.selected.length)
          .reduce((a, b) => a + b, null)
      : '';
  };

  const pickTagHandler = (id, tagName, multiple) => {
    if (prevSelected(id).includes(tagName)) removeSelected(id, tagName);
    else if (tagListCount() === 3 && multiple)
      alert('태그 선택은 3개만 가능 합니다.');
    else addTagList(id, tagName, multiple);
  };

  const reset = () => {
    setFilterCategories(
      filterCategories.map(({ id, name, is_multiple_choice, tags }) => ({
        id,
        name,
        is_multiple_choice,
        tags,
        selected: [],
      }))
    );
    setselectCategory(1);
    setMultipleAlert(false);
  };

  const makeTagQuery = () => {
    const tags = filterCategories.map(setList => setList.selected);
    const tagQuery = tags.flat();
    return tagQuery;
  };

  const confirm = () => {
    tagFetchHandler(makeTagQuery());
    handleModal();
  };

  return (
    filterCategories.length > 1 && (
      <ModalBackgournd>
        <ModalOverlay onClick={handleModal} />
        <ModalBox>
          <ModalHeader>
            <ResetButton onClick={reset}>
              <i className="fas fa-undo" /> <span>초기화</span>
            </ResetButton>
            <h1>{title}</h1>
            <CountCircle>{tagListCount()}</CountCircle>
            <CloseButton name="close" onClick={handleModal}>
              <i className="fal fa-times"></i>
            </CloseButton>
          </ModalHeader>
          <p>기업의 특별한 복지, 혜택 등 태그를 선택하여 나에게 꼭 맞는</p>
          <p>포지션을 찾아보세요!</p>
          <SubTitle>1. 카테고리 선택</SubTitle>
          <CategoryContainer>
            {filterCategories.map(({ name, id, selected }) => (
              <CategoryList
                key={id}
                onClick={() => tagListHandler(id)}
                id={id}
                border={selectCategory}
                text={selected}
                bacgourndColor={
                  BACKGROUND_COLOR[
                    Math.floor(Math.random() * (BACKGROUND_COLOR.length - 1))
                  ]
                }
              >
                {name}
              </CategoryList>
            ))}
          </CategoryContainer>
          <Container>
            <SubTitle>2. 태그 선택</SubTitle>
            {multipleAlert && (
              <Text color="red">1개의 태그만 선택할 수 있습니다.</Text>
            )}
          </Container>
          <SelectContainer>
            {filterCategories.map(
              ({ id, is_multiple_choice, tags, selected }) =>
                id === selectCategory
                  ? tags.map(mapTags => (
                      <SelectCategoryList
                        bacgourndColor={
                          BACKGROUND_COLOR[
                            Math.floor(
                              Math.random() * (BACKGROUND_COLOR.length - 1)
                            )
                          ]
                        }
                        onClick={() =>
                          pickTagHandler(id, mapTags.name, is_multiple_choice)
                        }
                        key={mapTags.id}
                        textStyle={selected}
                        text={mapTags.name}
                      >
                        {mapTags.name}
                      </SelectCategoryList>
                    ))
                  : ''
            )}
          </SelectContainer>
          <PickContainer>
            {filterCategories.map(setList =>
              [...setList.selected].map((selectTag, index) => (
                <PickTagList key={index}>
                  {selectTag}
                  <i
                    className="fal fa-times"
                    onClick={() => removeSelected(setList.id, selectTag)}
                  />
                </PickTagList>
              ))
            )}
          </PickContainer>
          <CenterContainer>
            <ConfirmButton onClick={confirm}>확인</ConfirmButton>
          </CenterContainer>
        </ModalBox>
      </ModalBackgournd>
    )
  );
}

export default Modal;

const ModalBackgournd = styled.form`
  ${({ theme }) => theme.setFlex()};
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const ModalOverlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
`;

const ModalBox = styled.div`
  position: relative;
  background-color: white;
  text-align: center;
  width: 500px;
  height: 650px;
  & p {
    text-align: left;
    font-size: 14px;
    margin-left: 20px;
  }
`;

const ModalHeader = styled.header`
  ${({ theme }) => theme.setFlex('space-between', 'center')}
  font-size: 16px;
  width: 100%;
  height: 54px;
  margin-bottom: 30px;
`;

const ResetButton = styled.div`
  ${({ theme }) => theme.setFlex()};
  width: 83px;
  height: 54px;
  background: none;
  border: none;
  color: ${({ theme }) => theme.onetedGray};
  cursor: pointer;
  & .fas {
    margin-right: 5px;
  }
`;

const CountCircle = styled.span`
  width: 22px;
  height: 22px;
  line-height: 22px;
  color: white;
  font-size: 12px;
  border-radius: 11px;
  background-color: ${({ theme }) => theme.onetedBlue};
  position: absolute;
  left: 57%;
`;

const CloseButton = styled.div`
  ${({ theme }) => theme.setFlex()};
  width: 54px;
  height: 54px;
  color: ${({ theme }) => theme.onetedGray};
  cursor: pointer;
`;

const Container = styled.div`
  ${({ theme }) => theme.setFlex('none', 'none')};
`;

const CenterContainer = styled.div`
  ${({ theme }) => theme.setFlex()};
`;

const SubTitle = styled.h2`
  margin: 30px 0 0 20px;
  text-align: left;
`;

const Text = styled.span`
  color: ${props => props.color};
  margin: 30px 0 0 20px;
`;

const CategoryContainer = styled.div`
  ${({ theme }) => theme.setFlex('none', 'none')};
  height: 100px;
  flex-wrap: wrap;
  align-content: flex-start;
`;

const CategoryList = styled.span`
  border: 1px solid
    ${props => (props.id === props.border ? props.theme.onetedBlue : 'none')};
  color: ${props =>
    props.text.length === 0 ? 'black' : props.theme.onetedBlue};
  padding: 10px 15px;
  margin: 10px 8px;
  border-radius: 17px;
  white-space: nowrap;
  height: fit-content;
  background-color: ${props => props.bacgourndColor};
`;

const SelectContainer = styled.div`
  ${({ theme }) => theme.setFlex('none', 'none')};
  margin: 10px;
  height: 150px;
  /* overflow: scroll; */
  flex-wrap: wrap;
  align-content: flex-start;
  border: 1px solid ${({ theme }) => theme.onetedGray};
`;

const SelectCategoryList = styled.span`
  color: ${props =>
    props.textStyle.includes(props.text) ? props.theme.onetedBlue : 'black'};
  margin-top: 15px;
  padding: 10px 15px;
  margin: 10px 8px;
  border-radius: 17px;
  white-space: nowrap;
  height: fit-content;
  background-color: ${props => props.bacgourndColor};
`;

const PickContainer = styled.div`
  ${({ theme }) => theme.setFlex('none', 'none')};
  height: 90px;
  /* overflow: scroll; */
  flex-wrap: wrap;
  align-content: flex-start;
  background-color: rgb(246, 246, 246);
`;

const PickTagList = styled.span`
  margin-top: 15px;
  padding: 10px 15px;
  margin: 10px 8px;
  border-radius: 17px;
  white-space: nowrap;
  height: fit-content;
  background-color: white;
  color: ${({ theme }) => theme.onetedBlue};
  border: 1px solid ${({ theme }) => theme.onetedBlue};

  & .fal {
    margin-left: 12px;
  }
`;

const ConfirmButton = styled.div`
  ${({ theme }) => theme.setFlex()};
  font-size: 16;
  font-weight: bold;
  color: white;
  text-align: center;
  height: 50px;
  width: 90%;
  border-radius: 25px;
  background-color: ${({ theme }) => theme.onetedBlue};
  margin-top: 20px;
  border: none;
`;

const BACKGROUND_COLOR = ['#F6F6F6', '#EFF8F8', '#EDF6F8'];
