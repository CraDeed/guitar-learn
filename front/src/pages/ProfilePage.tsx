import React, { useCallback, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import { UpdateProfileRequest } from '../redux/reducers/userSlice';
import useInput from '../hooks/useInput';
import ProfileImage from '../components/image/ProfileImage';
import { RootState } from '../redux/reducers';
import { RouteComponentProps } from 'react-router-dom';

const ProfilePageBlock = styled.div`
  display: flex;
  align-items: center;
  margin: 90px 0;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const ProfileInfo = styled.div`
  span {
    font-size: 20px;
  }

  .username::after {
    content: '';
    display: block;
    /* width: 1024px; */
    margin: 15px 0;
    border-bottom: 2px solid #cecdcd;
  }

  @media (max-width: 480px) {
    margin-top: 25px;
  }
`;

const ButtonBlock = styled.button`
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
  margin-left: 10px;

  &:hover {
    background-color: #868e96;
  }
`;

const StyledIunput = styled.input`
  font-size: 12px;
  border: 1px solid #dadada;
  padding: 10px 10px;
  width: 180px;
  height: 30px;
  outline: none;
  margin-right: 1rem;
  border-radius: 9px;
  line-height: 0.5;

  &:focus {
    border: 1px solid #1cbdea;
    box-shadow: 0 2px 6px 0 rgb(61 80 81 / 8%);
  }
`;

const StyledIextArea = styled.textarea`
  font-size: 12px;
  border: 1px solid #dadada;
  padding: 10px 10px;
  width: 360px;
  height: 180px;
  outline: none;
  margin-right: 1rem;
  border-radius: 9px;
  resize: none;
  /* line-height: 0.5; */

  &:focus {
    border: 1px solid #1cbdea;
    box-shadow: 0 2px 6px 0 rgb(61 80 81 / 8%);
  }
`;

const ProfilePage = ({ history }: RouteComponentProps) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.userReducer);
  // Edit Mode 수정 부분

  const [edit, setEdit] = useState(false);
  const [introText, onIntroTextChange, setIntoText] =
    useInput<string>('자기소개서를 입력해주세요!');
  const [guitarSkill, onGuitarSkillChange, setGuitarSkill] =
    useInput<string>('???');

  useEffect(() => {
    if (!user) {
      history.replace('/login');
    }
  }, [history, user]);

  useEffect(() => {
    if (user && user.introduction && user.guitarSkill) {
      setIntoText(user.introduction);
      setGuitarSkill(user.guitarSkill);
    }
  }, [setGuitarSkill, setIntoText, user]);

  const onEditMode = useCallback(() => {
    setEdit(true);
  }, []);

  const onCancelEditMode = useCallback(() => {
    setEdit(false);
    if (user && user.introduction && user.guitarSkill) {
      setIntoText(user.introduction);
      setGuitarSkill(user.guitarSkill);
    }
    setIntoText('자기소개서를 입력해주세요!');
    setGuitarSkill('???');
  }, [setGuitarSkill, setIntoText, user]);

  const onEditProfile = useCallback(() => {
    if (!user) {
      return;
    }
    setEdit(false);
    dispatch(
      UpdateProfileRequest({
        username: user.username,
        profileData: {
          guitarSkill: guitarSkill,
          introduction: introText,
        },
      }),
    );
  }, [dispatch, guitarSkill, introText, user]);

  if (!user) {
    return null;
  }

  return (
    <ProfilePageBlock>
      <ProfileImage edit={edit} />
      <ProfileInfo>
        <div className="username">
          <span>{user.username}</span>
          {edit ? null : <ButtonBlock onClick={onEditMode}>Edit</ButtonBlock>}
        </div>
        {edit ? (
          <>
            <div style={{ marginBottom: '10px' }}>
              기타실력 :
              <StyledIunput
                maxLength={20}
                value={guitarSkill}
                onChange={onGuitarSkillChange}
                style={{ marginLeft: '10px' }}
              />
            </div>
            <div>
              <p>자기소개 : </p>
              <div style={{ display: 'inline-block' }}>
                <StyledIextArea
                  value={introText}
                  onChange={onIntroTextChange}
                />
              </div>
            </div>
            <div
              style={{ float: 'right', marginTop: '10px', marginRight: '15px' }}
            >
              <ButtonBlock onClick={onEditProfile}>등록</ButtonBlock>
              <ButtonBlock
                style={{ backgroundColor: 'red' }}
                onClick={onCancelEditMode}
              >
                취소
              </ButtonBlock>
            </div>
          </>
        ) : (
          <>
            <div style={{ marginBottom: '10px' }}>기타실력 : {guitarSkill}</div>
            <span>자기소개 : {introText}</span>
          </>
        )}
      </ProfileInfo>
    </ProfilePageBlock>
  );
};

export default ProfilePage;
