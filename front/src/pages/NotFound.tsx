import React from 'react';
import Icon from '@ant-design/icons';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

const NotFoundContentBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 50vh;
`;

const NotFoundText = styled.div`
  color: #48b2fa;
  font-size: 25px;
  padding: 40px;
`;

const NotFoundTextDes = styled.div`
  font-size: 15px;
  text-align: center;
  margin-bottom: 30px;
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
`;

const NotFound = () => {
  const sadSvg = () => (
    <svg
      enable-background="new 0 0 497 497"
      height="128"
      viewBox="0 0 497 497"
      width="128"
    >
      <path
        d="m251.2.02v496.96c136-1.44 245.8-112.14 245.8-248.48s-109.8-247.04-245.8-248.48z"
        fill="#ffbb54"
      />
      <path
        d="m251.2.02c-.9-.01-1.8-.02-2.7-.02-137.24 0-248.5 111.26-248.5 248.5s111.26 248.5 248.5 248.5c.9 0 1.8-.01 2.7-.02 113.9-1.72 205.8-112.31 205.8-248.48s-91.9-246.76-205.8-248.48z"
        fill="#ffd45a"
      />
      <path
        d="m283.496 252.465c-1.518 0-3.048-.459-4.374-1.413-8.957-6.443-19.546-9.849-30.622-9.849-10.522 0-20.671 3.099-29.349 8.962-3.433 2.318-8.095 1.416-10.413-2.017-2.318-3.432-1.416-8.094 2.017-10.413 11.167-7.544 24.219-11.532 37.745-11.532 14.239 0 27.857 4.382 39.382 12.673 3.362 2.418 4.127 7.105 1.708 10.468-1.465 2.037-3.763 3.121-6.094 3.121z"
        fill="#fa71a3"
      />
      <path
        d="m256 282.464h-15c-4.143 0-7.5-3.357-7.5-7.5s3.357-7.5 7.5-7.5h15c4.143 0 7.5 3.357 7.5 7.5s-3.357 7.5-7.5 7.5z"
        fill="#ffbb54"
      />
      <path
        d="m332 113.7c-8.25 0-15 6.75-15 15v45c0 8.25 6.75 15 15 15s15-6.75 15-15v-45c0-8.25-6.75-15-15-15z"
        fill="#474867"
      />
      <path
        d="m165 113.703c-8.25 0-15 6.75-15 15v45c0 8.25 6.75 15 15 15s15-6.75 15-15v-45c0-8.25-6.75-15-15-15z"
        fill="#474867"
      />
      <path
        d="m365.12 280.109-33.12-61.4v116.49c20.71 0 37.5-16.79 37.5-37.5 0-6.36-1.59-12.34-4.38-17.59z"
        fill="#3a9dd9"
      />
      <path
        d="m343.04 280.109c.93 5.25 1.46 11.23 1.46 17.59 0 20.71-5.6 37.5-12.5 37.5-20.71 0-37.5-16.79-37.5-37.5 0-6.36 1.59-12.34 4.38-17.59l33.12-61.4z"
        fill="#35b9ff"
      />
    </svg>
  );

  const SadIcon = (props: any) => <Icon component={sadSvg} {...props} />;

  return (
    <NotFoundContentBlock>
      <SadIcon />
      <NotFoundText>
        죄송합니다. 현재 찾을 수 없는 페이지를 요청 하였습니다.
      </NotFoundText>
      <NotFoundTextDes>
        존재하지 않는 주소를 입력하셨거나, <br />
        요청하신 페이지의 주소가 변경, 삭제되어 찾을 수 없습니다.
        <br />
      </NotFoundTextDes>
      <ButtonBlock to="/">메인으로</ButtonBlock>
    </NotFoundContentBlock>
  );
};

export default NotFound;
