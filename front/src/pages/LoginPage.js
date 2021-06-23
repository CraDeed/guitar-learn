import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AuthForm from '../components/auth/AuthForm';
import AuthTemplate from '../components/auth/AuthTemplate';
import useInput from '../hooks/useInput';
import { loginRequest } from '../redux/reducers/userSlice';

const LoginPage = ({ history }) => {
  const dispatch = useDispatch();
  const { user, userError } = useSelector((state) => state.userReducer);

  const [username, onChangeUsername] = useInput('');
  const [password, onChangePassword] = useInput('');

  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      history.push('/');

      try {
        localStorage.setItem('user', JSON.stringify(user));
      } catch (error) {
        console.error(error);
      }
    }

    if (userError) {
      setError(userError);
      return;
    }
  }, [history, user, userError]);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();

      // 하나라도 비어 있다면
      if ([username, password].includes('')) {
        setError('빈 칸을 모두 입력하세요!');
        return;
      }

      dispatch(loginRequest({ username, password }));
    },
    [username, password, dispatch],
  );

  return (
    <AuthTemplate>
      <AuthForm
        type="login"
        onSubmit={onSubmit}
        onChangeUsername={onChangeUsername}
        onChangePassword={onChangePassword}
        error={error}
      />
    </AuthTemplate>
  );
};

export default LoginPage;
