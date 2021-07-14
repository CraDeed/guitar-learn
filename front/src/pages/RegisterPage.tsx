import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AuthForm from '../components/auth/AuthForm';
import AuthTemplate from '../components/auth/AuthTemplate';
import useInput from '../hooks/useInput';
import { signUpRequest } from '../redux/reducers/userSlice';

const RegisterPage = ({ history }) => {
  const dispatch = useDispatch();
  const { user, userError } = useSelector((state) => state.userReducer);

  const [username, onChangeUsername] = useInput('');
  const [password, onChangePassword] = useInput('');
  const [passwordConfirm, onChangePasswordConfirm] = useInput('');
  const [term, setTerm] = useState('');
  const [termError, setTermError] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (userError) {
      setError(userError);
      return;
    }

    if (user) {
      history.push('/');
    }
  }, [history, user, userError]);

  const onChangeTerm = useCallback((e) => {
    setTerm(e.target.checked);
    setTermError(false);
  }, []);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();

      // 하나라도 비어 있다면
      if ([username, password, passwordConfirm].includes('')) {
        setError('빈 칸을 모두 입력하세요!');
        return;
      }

      // 비밀번호가 일치하지 않는다면
      if (password !== passwordConfirm) {
        setError('비밀번호가 일치하지 않습니다.');
        return;
      }

      if (!term) {
        return setTermError(true);
      }

      dispatch(signUpRequest({ username, password }));
    },
    [dispatch, password, passwordConfirm, term, username],
  );

  return (
    <AuthTemplate>
      <AuthForm
        type="register"
        onSubmit={onSubmit}
        onChangeUsername={onChangeUsername}
        onChangePassword={onChangePassword}
        onChangePasswordConfirm={onChangePasswordConfirm}
        onChangeTerm={onChangeTerm}
        termError={termError}
        error={error}
      />
    </AuthTemplate>
  );
};

export default RegisterPage;
