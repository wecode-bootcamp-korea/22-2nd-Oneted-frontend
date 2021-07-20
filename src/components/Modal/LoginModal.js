import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

function LoginModal() {
  const { Kakao } = window;

  const handleKakaoLogin = () => {
    Kakao.Auth.login({
      success: function (response) {
        fetch(`주소`, {
          method: 'POST',
          body: JSON.stringify({ access_token: response.access_token }),
        })
          .then(res => res.json())
          .then(res => {
            localStorage.setItem('kakao_token', res.access_token);
            if (res.access_token) {
              alert('카카오 로그인 성공');
            }
          });
      },
      fail: function (err) {
        alert(JSON.stringify(err));
      },
    });
  };

  return (
    <section>
      <Container>
        <Header>
          <h1>wanted</h1>
          <button>
            <i className="far fa-window-close"></i>
          </button>
        </Header>
        <Body>
          <Intro>
            <h1>
              직장인을 위한 <br /> 커리어 플랫폼, 원티드!
            </h1>
            <h2>
              커리어 성장과 행복을 위한 여정 <br /> 지금 원티드에서 시작하세요
            </h2>
          </Intro>
          <Btnbox>
            <button onClick={handleKakaoLogin}>
              <img src="images/kakao_login_large_wide.png" alt="kakaoBtn" />
            </button>
            <button>Google로 시작하기</button>
          </Btnbox>
        </Body>
      </Container>
    </section>
  );
}

const Container = styled.div`
  position: relative;
  height: 755px;
  width: 400px;
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  padding: 16px 20 16px 20;
  width: 360px;
  height: 22px;
  margin-left: 20px;

  h1 {
    font-size: 26px;
  }
  button {
    background: none;
    border: 0;

    i {
      position: absolute;
      font-size: 24px;
      top: 0;
      right: 10px;
    }
  }
`;

const Body = styled.div`
  width: 360px;
  height: 661px;
  padding: 20px;
`;

const Intro = styled.div`
  width: 360px;
  height: 144px;
  margin: 24px 0 40px 0;
  text-align: center;

  h1 {
    line-height: 1.54;
    font-size: 26px;
    font-weight: 600;
  }

  h2 {
    margin-top: 16px;
    line-height: 1.5;
    font-size: 16px;
    font-weight: 400;
    color: #666;
  }
`;

const Btnbox = styled.div`
  button {
    background-color: transparent;
    border: none;
    img {
      margin-bottom: 12px;
      width: 358px;
      height: 52px;
      border: 1px solid #e1e2e3;
      border-radius: 27px;
      background-color: #fff;
      color: #737373;
      font-size: 16px;
      cursor: pointer;
    }
  }
`;

export default LoginModal;
