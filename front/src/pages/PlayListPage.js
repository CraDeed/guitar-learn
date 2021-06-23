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
      <PostCardContainer>
        {user.post &&
          user.post
            .filter((c) => {
              return c.title.indexOf(searchText) > -1;
            })
            .map((v) => <PostCard key={v.key} post={v} />)}
      </PostCardContainer>
    </PlayListPageBlock>
  );
};

export default PlayListPage;
