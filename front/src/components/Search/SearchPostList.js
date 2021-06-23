import React, { useCallback } from 'react';
import styled from '@emotion/styled';
import useInput from '../../hooks/useInput';
import { useDispatch, useSelector } from 'react-redux';
import { searchInnerPost } from '../../redux/reducers/postSlice';

const SearchPostListBlock = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
  margin: 20px 0;

  @media (max-width: 1024px) {
    margin: 0 20px;
  }

  @media (max-width: 480px) {
    font-size: 15px;
  }

  @media (max-width: 320px) {
    font-size: 11px;
  }
`;

const SearchPostInput = styled.input`
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

  @media (max-width: 480px) {
    width: 120px;
    height: 20px;
    font-size: 10px;
  }

  @media (max-width: 320px) {
    width: 80px;
    height: 20px;
    font-size: 8px;
  }
`;

const Button = styled.button`
  border: none;
  /* border-radius: 4px; */
  width: 80px;
  height: 30px;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.25rem 1rem;
  color: white;
  outline: none;
  cursor: pointer;
  background-color: #1cbdea;
  transition: 0.3s;
  margin-top: 10px;
  border-radius: 9px;

  &:hover {
    background-color: #06d0eb;
  }

  @media (max-width: 480px) {
    width: 60px;
    height: 20px;
    font-size: 12px;
    padding: 0;
  }

  @media (max-width: 320px) {
    width: 50px;
    height: 17px;
    font-size: 10px;
  }
`;

const SearchPostList = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userReducer);
  const [search, onSearch] = useInput('');

  let TodayOrPlaylist = 'Today';

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();

      dispatch(searchInnerPost(search));
    },
    [dispatch, search],
  );

  if (window.location.href.includes('/playlist')) {
    TodayOrPlaylist = `${user.username}`;
  }

  return (
    <SearchPostListBlock>
      <span> {TodayOrPlaylist}'s GuitarLearn!</span>
      <form onSubmit={onSubmit}>
        <SearchPostInput placeholder="Search..." onChange={onSearch} />
        <Button>Search</Button>
      </form>
    </SearchPostListBlock>
  );
};

export default SearchPostList;
