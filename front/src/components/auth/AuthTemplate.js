import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

/*
    회원가입/로그인 페이지의 레이아웃을 담당하는 컴포넌트입니다.
*/

/* 화면 전체를 채움 */
const AuthTemplateBlock = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background: #e9ecef;
  /* flex로 내부 내용 중앙 정렬 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .logo-area {
    display: block;
    font-size: 35px;
    padding-bottom: 2rem;
    text-align: center;
    font-weight: 900;
    letter-spacing: 2px;

    @media (max-width: 480px) {
      font-size: 28px;
    }

    @media (max-width: 480px) {
      font-size: 20px;
    }
  }
`;

const AuthTemplate = ({ children }) => {
  return (
    <AuthTemplateBlock>
      <div className="logo-area">
        <Link to="/">GUITAR LEARN</Link>
      </div>
      {children}
    </AuthTemplateBlock>
  );
};

export default AuthTemplate;
