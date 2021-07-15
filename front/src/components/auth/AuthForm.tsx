import React, { ChangeEventHandler, FormEventHandler } from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

/*
    회원가입 또는 로그인 폼을 보여 줍니다.
*/

interface AuthFormProps {
  type: string;
  onSubmit: FormEventHandler<HTMLFormElement>;
  error: string | Error | null;
  onChangeUsername: ChangeEventHandler<HTMLInputElement>;
  onChangePassword: ChangeEventHandler<HTMLInputElement>;
  onChangePasswordConfirm?: ChangeEventHandler<HTMLInputElement>;
  onChangeTerm?: ChangeEventHandler<HTMLInputElement>;
  termError?: boolean;
}

const AuthFormBlock = styled.div`
  width: 360px;

  @media (max-width: 480px) {
    width: 320px;
  }

  @media (max-width: 320px) {
    width: 260px;
  }
`;

const StyledInput = styled.input`
  font-size: 1rem;
  border: 1px solid #dadada;
  padding: 7px 35px 10px 11px;
  width: 100%;
  height: 40px;
  outline: none;

  &:focus {
    border: 1px solid #1cbdea;
    box-shadow: 0 2px 6px 0 rgb(61 80 81 / 8%);
  }

  & + & {
    margin-top: 1rem;
  }

  @media (max-width: 480px) {
    font-size: 13px;
  }
`;

const ButtonBlock = styled.button`
  border: none;
  /* border-radius: 4px; */
  width: 100%;
  height: 40px;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.25rem 1rem;
  color: white;
  outline: none;
  cursor: pointer;
  background-color: #1cbdea;
  transition: 0.3s;
  margin-top: 10px;

  &:hover {
    background-color: #06d0eb;
  }
`;

/*
    에러를 보여줍니다
*/

const ErrorMessage = styled.div`
  color: red;
  text-align: center;
  font-size: 0.875rem;
  margin-top: 1rem;
`;

const AuthFooter = styled.div`
  margin-top: 2rem;
  text-align: right;

  a {
    color: #868e96;

    &:hover {
      color: #343a40;
    }
  }
`;

const CheckBoxWrapper = styled.div`
  text-align: center;
  margin: 10px;
`;

const textMap: { [key: string]: string } = {
  login: '로그인',
  register: '회원가입',
};

const AuthForm = ({
  type,
  onSubmit,
  error,
  onChangeUsername,
  onChangePassword,
  onChangePasswordConfirm,
  onChangeTerm,
  termError,
}: AuthFormProps) => {
  const text = textMap[type];
  return (
    <AuthFormBlock>
      <h3>{text}</h3>
      <form onSubmit={onSubmit}>
        <StyledInput
          autoComplete="username"
          name="username"
          placeholder="아이디"
          onChange={onChangeUsername}
        />
        <StyledInput
          name="new-password"
          placeholder="비밀번호"
          type="password"
          onChange={onChangePassword}
        />
        {type === 'register' && (
          <StyledInput
            name="passwordConfirm"
            placeholder="비밀번호 확인"
            type="password"
            onChange={onChangePasswordConfirm}
          />
        )}
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {type === 'register' && (
          <CheckBoxWrapper>
            <input type="checkbox" id="term" onChange={onChangeTerm} />
            <label htmlFor="term">크라디드의 말을 잘 들을껍니까?</label>
            {termError && (
              <ErrorMessage>약관에 동의하셔야 합니다.</ErrorMessage>
            )}
          </CheckBoxWrapper>
        )}
        <ButtonBlock>{text}</ButtonBlock>
      </form>
      <AuthFooter>
        {type === 'login' ? (
          <Link to="/register">회원가입</Link>
        ) : (
          <Link to="/login">로그인</Link>
        )}
      </AuthFooter>
    </AuthFormBlock>
  );
};

export default AuthForm;
