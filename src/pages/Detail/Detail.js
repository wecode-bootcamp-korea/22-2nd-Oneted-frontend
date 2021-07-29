import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import ModalShare from './Modal/ModalShare';

const Options = {
  center: new window.kakao.maps.LatLng(37.5063, 127.05367),
  level: 2,
};

const Detail = () => {
  const [jobData, setJobData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookmarkText, setBookmarkText] = useState('북마크하기');
  const KakaoMapContainer = useRef();

  useEffect(() => {
    fetch('data/data.json')
      .then(res => res.json())
      .then(jobData => {
        setJobData(jobData);
      });
  }, []);

  useEffect(() => {
    const marker = new window.kakao.maps.Marker({
      position: new window.kakao.maps.LatLng(37.5063, 127.05367),
    });

    marker.setMap(
      new window.kakao.maps.Map(KakaoMapContainer.current, Options)
    );
  }, []);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleBookmark = () => {
    fetch('URL', {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    })
      .then(res => res.json())
      .then(res => {
        if (bookmarkText === '북마크하기' && res.token === 'token') {
          setBookmarkText('북마크 완료');
          alert('북마크 완료');
        } else if (bookmarkText === '북마크하기' && res.token !== null) {
          alert('로그인 해주세요');
        }
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
              <h1>CRM 데이터 분석 (2년 이상)</h1>
              <h2>{jobData.job_posting_info?.company}</h2>
              <HashTag>#연봉최고</HashTag>
            </ArticleTop>
            <p>
              「에이블리」는 누적 다운로드 2,200만건, 누적 거래액 7,500억, 패션
              앱 사용자수 1위, 앱스토어 1위를 달성하며 업계에서 가장 빠르게
              성장하고 있는 패션/뷰티 쇼핑앱이에요. 성장성과 IT 기술력을
              인정받아 시리즈 B 투자유치를 완료하였고, 예비유니콘에
              선정되었어요. 국내에서 가장 잘하는 팀인지는 모르겠지만, 가장
              몰입해서 치열하게 일하는 팀 중에 하나일 것이라는 자신감이 있어요.
            </p>
            <Map>
              <MapTitle>마감일</MapTitle>
              <MapText>상시</MapText>
            </Map>
            <Map>
              <MapTitle>근무지역</MapTitle>
              <MapText>서울특별시 강남구 테헤란로 427 위워크 빌딩</MapText>
            </Map>
            <KakaoMap ref={KakaoMapContainer} />
          </ArticleDetail>
        </Article>
      </ArticleBox>
      <Aside>
        <BtnShareContainer>
          <BtnShare
            onClick={() => {
              setIsModalOpen(true);
            }}
            alt="icon_share"
            src={'images/icon_share.svg'}
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
        {/* <ModalBookmark /> */}
        <BookmarkBtn onClick={handleBookmark}>{bookmarkText}</BookmarkBtn>
        <SupportBtn>지원하기</SupportBtn>
      </Aside>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  margin: 70px auto;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.2;
  ${({ theme }) => theme.setFlex('center', 'none')}
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
    padding-bottom: 60px;
    border-bottom: 1px solid #f0f0f0;
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
