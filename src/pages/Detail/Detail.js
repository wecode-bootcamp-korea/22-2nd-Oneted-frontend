import React, { useState, useEffect, useRef, useParams } from 'react';
import styled from 'styled-components';
import ModalShare from './Modal/ModalShare';
import ModalApply from './Modal/ModalApply/ModalApply';
import { BASE_URL } from '../../config';

const Detail = () => {
  const [jobPostingInfo, setJobPostingInfo] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalApplyOpen, setIsModalApplyOpen] = useState(false);
  const [bookmarkText, setBookmarkText] = useState('북마크하기');
  const KakaoMapContainer = useRef();

  const latitude = jobPostingInfo.company_info?.coordinate.latitude;
  const longitude = jobPostingInfo.company_info?.coordinate.longitude;

  const Options = {
    center: new window.kakao.maps.LatLng(latitude, longitude),
    level: 2,
  };

  useEffect(() => {
    fetch(`${BASE_URL}/jobpostings/1`)
      .then(res => res.json())
      .then(data => {
        setJobPostingInfo(data.result);
      });
  }, []);

  useEffect(() => {
    const marker = new window.kakao.maps.Marker({
      position: new window.kakao.maps.LatLng(latitude, longitude),
    });

    marker.setMap(
      new window.kakao.maps.Map(KakaoMapContainer.current, Options)
    );
  }, [latitude, longitude]);

  const closeModal = () => {
    setIsModalOpen(false);
    setIsModalApplyOpen(false);
  };

  const handleBookmark = () => {
    fetch(`${BASE_URL}/jobpostings/1/bookmark`, {
      headers: {
        Authorization: localStorage.getItem('access_token'),
      },
    })
      .then(res => res.json())
      .then(res => {
        if (res['message'] === 'SUCCESS') {
          setBookmarkText('북마크 완료');
          alert('북마크 완료');
        } else {
          alert('로그인 해주세요');
        }
      });
  };

  const handleModalApply = () => {
    setIsModalApplyOpen(true);
  };

  const lineChange = data => {
    return data.split('\n').map(text => {
      return (
        <span>
          {text}
          <br />
        </span>
      );
    });
  };

  return (
    <Container>
      <ArticleBox>
        <Article>
          <img
            alt="company_image"
            src="https://static.wanted.co.kr/images/company/1209/01zajm3t9gwbtwfl__1080_790.jpg"
          />
          <ArticleDetail>
            <ArticleTop>
              <h1>{jobPostingInfo?.job_posting_title}</h1>
              <h2>{jobPostingInfo.company_info?.company_name}</h2>
              <TagContainer>
                {jobPostingInfo.tag_info?.map(tag => {
                  return <HashTag>{tag}</HashTag>;
                })}
              </TagContainer>
            </ArticleTop>
            <CompanyDescription>
              {jobPostingInfo.description &&
                lineChange(jobPostingInfo.description.benefit)}

              {jobPostingInfo.description &&
                lineChange(jobPostingInfo.description.intro)}

              {jobPostingInfo.description &&
                lineChange(jobPostingInfo.description.main_task)}

              {jobPostingInfo.description &&
                lineChange(jobPostingInfo.description.preference_point)}

              {jobPostingInfo.description &&
                lineChange(jobPostingInfo.description.requirements)}
            </CompanyDescription>
            <MapTextContainer>
              <Map>
                <MapTitle>마감일</MapTitle>
                <MapText>상시</MapText>
              </Map>
              <Map>
                <MapTitle>근무지역</MapTitle>
                <MapText>서울특별시 강남구 테헤란로 427 위워크 빌딩</MapText>
              </Map>
            </MapTextContainer>
            <KakaoMap ref={KakaoMapContainer} />
          </ArticleDetail>
        </Article>
      </ArticleBox>
      {isModalApplyOpen && <ModalApply closeModal={closeModal} />}
      <Aside>
        <BtnShareContainer>
          <BtnShare
            onClick={() => {
              setIsModalOpen(true);
            }}
            alt="icon_share"
            src="/images/icon_share.svg"
          />
        </BtnShareContainer>
        {isModalOpen && <ModalShare closeModal={closeModal} />}
        <AsideTitle>채용보상금</AsideTitle>
        <ul>
          <li>
            <h4>추천인</h4>
            <p>500,000원</p>
          </li>
          <li>
            <h4>지원자</h4>
            <p>500,000원</p>
          </li>
        </ul>
        <BookmarkBtn onClick={handleBookmark}>{bookmarkText}</BookmarkBtn>
        <SupportBtn onClick={handleModalApply}>지원하기</SupportBtn>
      </Aside>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  margin: 70px auto;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.2;
  ${({ theme }) => theme.setFlex('center', 'stretch')}
`;

const ArticleBox = styled.section`
  max-width: 698px;
  min-width: 600px;
  margin-left: 60px;
  margin-right: 32%;
`;

const Article = styled.section`
  img {
    width: 100%;
    border: 1px solid #e8e8e8;
    border-radius: 4px;
  }
`;

const ArticleDetail = styled.article`
  width: 100%;
  padding-right: 20px;
  color: ${({ theme }) => theme.onetedBlack};

  p {
    padding-bottom: 30px;
    line-height: 1.8;
  }
`;

const Aside = styled.aside`
  position: fixed;
  right: calc((100% - 1000px) / 2);
  width: 340px;
  height: 300px;
  padding: 24px 20px;
  border: 1px solid #e8e8e8;
  border-radius: 4px;
  color: ${({ theme }) => theme.onetedBlack};

  ul {
    display: flex;
    margin: 24px 0;

    li {
      width: 50%;
    }

    h4 {
      margin-bottom: 8px;
    }
  }
`;

const CompanyDescription = styled.div`
  line-height: 1.6;
`;

const AsideTitle = styled.p`
  font-weight: 600;
`;

const BookmarkBtn = styled.button`
  width: 298px;
  height: 50px;
  padding: 0;
  margin-bottom: 10px;
  border: 1px solid ${({ theme }) => theme.onetedBlue};
  border-radius: 25px;
  background-color: #fff;
  color: ${({ theme }) => theme.onetedBlue};
  font-size: 16px;
  font-weight: 800;

  &:hover {
    cursor: pointer;
  }
`;

const TagContainer = styled.div`
  margin-bottom: 40px;
`;

const SupportBtn = styled(BookmarkBtn)`
  color: #fff;
  background-color: ${({ theme }) => theme.onetedBlue};
`;

const KakaoMap = styled.div`
  height: 300px;
  z-index: 1;
`;

const MapTitle = styled.span`
  display: inline-block;
  width: 80px;
  color: ${({ theme }) => theme.onetedGray};
  font-weight: 800;
`;

const MapText = styled.span`
  width: calc(100% - 80px);
  font-weight: 800;
`;

const ArticleTop = styled.div`
  margin: 40px 0 20px;

  h1 {
    margin: 0 0 10px;
    font-size: 22px;
    font-weight: 700;
  }

  h2 {
    margin-bottom: 20px;
    font-size: 14px;
    font-weight: 600;
  }
`;
const MapTextContainer = styled.div`
  margin-top: 40px;
  border-top: 1px solid #f0f0f0;
`;

const Map = styled.div`
  margin: 24px 0;
`;

const HashTag = styled.span`
  padding: 6px 16px;
  margin: 0 4px;
  border-radius: 25px;
  background-color: #f1f1f1;
  font-size: 14px;
`;

const BtnShareContainer = styled.div`
  position: relative;
`;

const BtnShare = styled.img`
  position: absolute;
  top: -4px;
  right: 0;

  &:hover {
    cursor: pointer;
  }
`;

export default Detail;
