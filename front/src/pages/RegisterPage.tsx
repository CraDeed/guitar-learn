import React, {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import AuthForm from '../components/auth/AuthForm';
import AuthTemplate from '../components/auth/AuthTemplate';
import useInput from '../hooks/useInput';
import { RootState } from '../redux/reducers';
import { signUpRequest } from '../redux/reducers/userSlice';

const RegisterPage = ({ history }: RouteComponentProps) => {
  const dispatch = useDispatch();
  const { user, userError } = useSelector(
    (state: RootState) => state.userReducer,
  );

  const [username, onChangeUsername] = useInput<string>('');
  const [password, onChangePassword] = useInput<string>('');
  const [passwordConfirm, onChangePasswordConfirm] = useInput<string>('');
  const [term, setTerm] = useState(false);
  const [termError, setTermError] = useState(false);
  const [error, setError] = useState<string | Error | null>(null);

  useEffect(() => {
    if (userError) {
      setError(userError);
      return;
    }

    if (user) {
      history.push('/');
      try {
        localStorage.setItem('user', JSON.stringify(user));
      } catch (error) {
        console.error(error);
      }
    }
  }, [history, user, userError]);

  const onChangeTerm = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setTerm(e.target.checked);
    setTermError(false);
  }, []);

  const onSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
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
