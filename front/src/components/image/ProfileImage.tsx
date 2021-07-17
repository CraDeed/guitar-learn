import React, { useCallback, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import { PImageUploadRequest } from '../../redux/reducers/userSlice';

import { UserOutlined } from '@ant-design/icons';
import { RootState } from '../../redux/reducers';

interface ProfileImageProps {
  edit: boolean;
}

const ProfileImageWrapper = styled.img`
  width: 210px;
  height: 210px;
  border-radius: 70%;

  &.imageHave {
    margin: 0 90px 0 60px;
  }

  @media (max-width: 480px) {
    width: 150px;
    height: 150px;
  }
`;

const NoProfileImage = styled.div`
  margin: 0 90px 0 60px;
  text-align: center;

  p {
    text-align: center;
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

const ImageLoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 360px;
  height: 210px;
  font-size: 20px;
`;

const ProfileImage = ({ edit }: ProfileImageProps) => {
  const dispatch = useDispatch();
  const { user, userLoading } = useSelector(
    (state: RootState) => state.userReducer,
  );

  // TODO: 프로필 이미지 부분 분리하기

  const [previewURL, setPreviewURL] = useState<string>('');
  const [profileImage, setProfileImage] = useState<File | null>(null);

  const imageInput = useRef<HTMLInputElement>(null);
  const onClickImageUpload = useCallback(() => {
    if (!imageInput.current) {
      return;
    }
    imageInput.current.click();
  }, []);

  const onChangeImages = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files) {
        return;
      }
      let reader = new FileReader();
      let file = e.target.files[0];
      reader.onloadend = () => {
        setProfileImage(file);
        setPreviewURL(reader.result as string);
      };
      reader.readAsDataURL(file);
    },
    [],
  );

  const onCancelProfileImage = useCallback(() => {
    setProfileImage(null);
    setPreviewURL('');
  }, []);

  const onUpdateProfileImage = useCallback(() => {
    if (!user) {
      return;
    }

    const imageFormData = new FormData();
    imageFormData.append('image', profileImage as Blob);
    // back end req.body로 username 받기
    imageFormData.append('username', user.username);

    dispatch(
      PImageUploadRequest({
        data: imageFormData,
      }),
    );

    if (!userLoading) {
      setProfileImage(null);
      setPreviewURL('');
    }
  }, [dispatch, profileImage, user, userLoading]);

  return (
    <>
      {user && user.image ? (
        <div>
          {userLoading ? (
            <ImageLoadingWrapper>Loading...</ImageLoadingWrapper>
          ) : (
            <ProfileImageWrapper
              className="imageHave"
              src={profileImage ? previewURL : `${user.image}`}
            />
          )}

          {edit &&
            (profileImage ? (
              userLoading ? null : (
                <>
                  <div style={{ marginTop: '10px', textAlign: 'center' }}>
                    <ButtonBlock type="button" onClick={onUpdateProfileImage}>
                      등록
                    </ButtonBlock>
                    <ButtonBlock type="button" onClick={onCancelProfileImage}>
                      취소
                    </ButtonBlock>
                  </div>
                </>
              )
            ) : (
              <>
                <div style={{ textAlign: 'center', marginTop: '10px' }}>
                  <input
                    type="file"
                    name="image"
                    multiple
                    hidden
                    ref={imageInput}
                    onChange={onChangeImages}
                  />
                  <ButtonBlock type="button" onClick={onClickImageUpload}>
                    사진 수정
                  </ButtonBlock>
                </div>
              </>
            ))}
        </div>
      ) : (
        <NoProfileImage>
          {profileImage ? (
            <>
              <ProfileImageWrapper src={previewURL} />
              <div style={{ marginTop: '10px' }}>
                <ButtonBlock type="button" onClick={onUpdateProfileImage}>
                  등록
                </ButtonBlock>
                <ButtonBlock type="button" onClick={onCancelProfileImage}>
                  취소
                </ButtonBlock>
              </div>
            </>
          ) : (
            <>
              <UserOutlined style={{ fontSize: '210px' }} />
              <p>프로필 사진을 등록해주세요!</p>
              <input
                type="file"
                name="image"
                multiple
                hidden
                ref={imageInput}
                onChange={onChangeImages}
              />
              <ButtonBlock type="button" onClick={onClickImageUpload}>
                프로필 등록
              </ButtonBlock>
            </>
          )}
        </NoProfileImage>
      )}
    </>
  );
};

export default ProfileImage;
