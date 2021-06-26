import React, { useCallback } from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { logoutRequest } from '../../redux/reducers/userSlice';

const HeaderBlock = styled.div`
  display: flex;
  justify-content: space-between;
  text-align: center;
  margin-top: 10px;

  .right {
    display: flex;
    align-items: center;
    margin-right: 10px;
  }
`;

const LogoImg = styled(Link)`
  img {
    width: 80%;

    @media (max-width: 480px) {
      width: 60%;
    }

    @media (max-width: 320px) {
      width: 50%;
    }
  }

  @media (max-width: 320px) {
    justify-content: center;
  }
`;

const ButtonBlock = styled(Link)`
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.25rem 1rem;
  color: white;
  outline: none;
  cursor: pointer;
  background-color: #343a40;
  transition: 0.3s;
  margin-right: 10px;

  &:hover {
    background-color: #868e96;
  }

  @media (max-width: 320px) {
    font-size: 10px;
  }
`;

const UserInfo = styled.div`
  font-weight: 400;
  font-size: 20px;
  margin-right: 10px;

  @media (max-width: 480px) {
    font-size: 16px;
  }

  @media (max-width: 320px) {
    font-size: 12px;
  }
`;

const UserProfileImage = styled.img`
  border-radius: 50%;
  width: 40px;
  height: 40px;
  margin-right: 10px;

  @media (max-width: 480px) {
    width: 32px;
    height: 32px;
  }

  @media (max-width: 320px) {
    width: 25px;
    height: 25px;
  }
`;

const Menu = styled.div`
  position: relative;
  cursor: pointer;

  ol {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .sub-menu {
    position: absolute;
    top: 100%;
    left: -62px;
    width: 160px;
    font-size: 20px;
    transform-origin: top;
    transform: rotateX(-90deg);
    transition: transform 0.3s linear;
    background-color: white;
    z-index: 9999;

    @media (max-width: 1024px) {
      left: -52px;
      width: 100px;
    }
  }

  .menu-item {
    &:hover {
      background: rgba(0, 0, 0, 0.1);
    }
  }

  button {
    border: none;
    background-color: inherit;
    font-family: inherit;
  }

  a,
  button {
    font-size: 0.8rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: black;
    text-decoration: none;
    text-transform: uppercase;
    height: 100%;
    width: 100%;
    padding: 1.2em 0.8em;

    @media (max-width: 1024px) {
      font-size: 16px;
    }

    @media (max-width: 768px) {
      font-size: 14px;
    }

    @media (max-width: 480px) {
      font-size: 11px;
    }

    @media (max-width: 320px) {
      font-size: 9px;
    }
  }

  &:hover .sub-menu {
    transform: rotateX(0deg);
  }
`;

const Header = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userReducer);

  const onLogout = useCallback(() => {
    dispatch(logoutRequest());
  }, [dispatch]);

  return (
    <HeaderBlock>
      <LogoImg to="/">
        <img src={process.env.PUBLIC_URL + '/logo.png'} alt="logo" />
      </LogoImg>
      <div className="right">
        {user ? (
          <>
            <UserInfo>{user.username}</UserInfo>
            <Menu>
              {user.image ? (
                <UserProfileImage src={`${user.image}`} alt="user" />
              ) : (
                <UserOutlined style={{ fontSize: '20px' }} />
              )}

              <ol className="sub-menu">
                <li className="menu-item">
                  <Link to={`/${user.username}/playlist`}>PlayList</Link>
                </li>
                <li className="menu-item">
                  <Link to={`/${user.username}/profile`}>Profile</Link>
                </li>
                <li className="menu-item">
                  <button onClick={onLogout}>Logout</button>
                </li>
              </ol>
            </Menu>
          </>
        ) : (
          <>
            <ButtonBlock to="/login">SignIn</ButtonBlock>
            <ButtonBlock to="/register">SignUp</ButtonBlock>
          </>
        )}
      </div>
    </HeaderBlock>
  );
};

export default Header;
