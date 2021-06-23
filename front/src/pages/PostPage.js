import React, { useCallback, useRef, useState } from 'react';
import styled from '@emotion/styled';
import ReactPlayer from 'react-player';
import { useDispatch, useSelector } from 'react-redux';
import { HeartTwoTone } from '@ant-design/icons';
import { Popover, ArrowContainer } from 'react-tiny-popover';
import {
  AddPlayListRequset,
  RemovePlayListRequset,
} from '../redux/reducers/userSlice';

const PostPageBlock = styled.div``;

const PlayerWrapper = styled.div`
  margin-top: 30px;
  position: relative;
  padding-top: 56.25%; /* 720 / 1280 = 0.5625 */

  .react-player {
    position: absolute;
    top: 0;
    left: 0;
  }
`;

const InfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 2px solid #f0f0f0;
`;

const HeartPlaylist = styled.div`
  display: flex;
  align-items: center;

  p {
    margin-left: 10px;
  }
`;

const UserInfo = styled.div`
  display: flex;
  margin: 8px;
  text-align: center;
  line-height: 0;

  img {
    border-radius: 50%;
    width: 40px;
    height: 40px;
    margin-right: 8px;
  }
`;

const PopoverText = styled.div`
  color: white;
  background-color: black;
  padding: 8px;
`;

const PostPage = ({ location }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userReducer);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const post = location.state;

  const onPlaylist = useCallback(() => {
    if (!user) {
      alert('로그인 하세요');
      window.location.replace('/login');
      return;
    }
    dispatch(AddPlayListRequset({ userId: user._id, post: post }));
    setIsPopoverOpen(!isPopoverOpen);
  }, [dispatch, isPopoverOpen, post, user]);

  const onUnPlaylist = useCallback(() => {
    dispatch(RemovePlayListRequset({ userId: user._id, postKey: post.key }));
    setIsPopoverOpen(!isPopoverOpen);
  }, [dispatch, isPopoverOpen, post.key, user._id]);

  const playlistKey = user.post.find((v) => v.key === post.key);

  const clickMeButtonRef = useRef();

  return (
    <PostPageBlock>
      <PlayerWrapper>
        <ReactPlayer
          url={`https://www.youtube.com/embed/${post.key}?showinfo=0&enablejsapi=1&origin=http://localhost:3000`}
          className="react-player"
          playing
          width="100%"
          height="100%"
          controls
        />
      </PlayerWrapper>
      <InfoWrapper>
        <h4>{post.title}</h4>
        <HeartPlaylist>
          <Popover
            isOpen={isPopoverOpen}
            positions={['top']} // preferred positions by priority
            padding={-10}
            onClickOutside={() => setIsPopoverOpen(false)}
            ref={clickMeButtonRef}
            content={({ position, childRect, popoverRect }) => (
              <ArrowContainer // if you'd like an arrow, you can import the ArrowContainer!
                position={position}
                childRect={childRect}
                popoverRect={popoverRect}
                arrowColor={'black'}
                arrowSize={5}
                arrowStyle={{ opacity: '0.7', left: '50%' }}
                // className="popover-arrow-container"
                // arrowClassName="popover-arrow"
              >
                <PopoverText onClick={() => setIsPopoverOpen(!isPopoverOpen)}>
                  {!playlistKey
                    ? '플레이리스트에서 삭제하였습니다'
                    : '플레이리스트에 추가하였습니다'}
                </PopoverText>
              </ArrowContainer>
            )}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {playlistKey ? (
                <HeartTwoTone twoToneColor="#eb2f96" onClick={onUnPlaylist} />
              ) : (
                <HeartTwoTone twoToneColor="#B0AAAA" onClick={onPlaylist} />
              )}
              <p>플레이 리스트</p>
            </div>
          </Popover>
        </HeartPlaylist>
      </InfoWrapper>
      <UserInfo>
        <img src={post.youtuberImage} alt="youtuberImage" />
        <h5>{post.youtuber}</h5>
      </UserInfo>
    </PostPageBlock>
  );
};

export default PostPage;
