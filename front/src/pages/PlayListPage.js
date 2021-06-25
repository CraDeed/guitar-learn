import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { useSelector } from 'react-redux';
import SearchPostList from '../components/Search/SearchPostList';
import PostCard from '../components/post/PostCard';

const PlayListPageBlock = styled.div``;

const PostCardContainer = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
`;

const NoContentBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 50vh;
`;

const PlayListPage = ({ history }) => {
  const { user } = useSelector((state) => state.userReducer);
  const { searchText } = useSelector((state) => state.postReducer);

  useEffect(() => {
    if (!user) {
      history.replace('/login');
    }
  }, [history, user]);

  if (!user) {
    return null;
  }

  return (
    <PlayListPageBlock>
      <SearchPostList />
      {user.post.length > 0 ? (
        <PostCardContainer>
          {user.post
            .filter((c) => {
              return c.title.indexOf(searchText) > -1;
            })
            .map((v) => (
              <PostCard key={v.key} post={v} />
            ))}
        </PostCardContainer>
      ) : (
        <NoContentBlock>
          <h3>플레이리스트가 없습니다!</h3>
          <h2>배우고 싶은 노래로 채워보세요!</h2>
        </NoContentBlock>
      )}
    </PlayListPageBlock>
  );
};

export default PlayListPage;
