import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { API } from '../../config';
import { LoginState } from '../Nav/Nav';

function LoginModal(props) {
  const { Kakao } = window;
  const history = useHistory();
  const loginState = useContext(LoginState);

  const handleKakaoLogin = () => {
    Kakao.Auth.login({
      success: function (response) {
        fetch(`${API.LOGIN}`, {
          headers: {
            Authorization: response.access_token,
          },
          method: 'POST',
          body: JSON.stringify({
            access_token: response.access_token,
          }),
        })
          .then(res => res.json())
          .then(res => {
            localStorage.setItem('kakao_token', res.token);
            if (res.token) {
              history.push('/');
              loginState.setIsLoginOn(true);
              alert('로그인 성공');
            }
          });
      },
      fail: function (err) {
        alert(JSON.stringify(err));
      },
    });
  };

  return (
    <Dimmer onClick={props.clickModal}>
      <Container>
        <Header>
          <h1>wanted</h1>
          <button>
            <i className="far fa-window-close" />
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
              <img alt="kakaoBtn" src="images/kakao_login_large_wide.png" />
            </button>
            <button></button>
          </Btnbox>
        </Body>
      </Container>
    </Dimmer>
  );
}

const Dimmer = styled.section`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: #00000080;
  z-index: 200;
`;

const Container = styled.div`
  position: relative;
  max-width: 400px;
  position: absolute;
  left: 40%;
  top: 20%;
  background-color: white;
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  padding: 16px 20 16px 20;
  margin: 20px 0 0 20px;

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
    div {
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
