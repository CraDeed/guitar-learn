import React, { FormEvent, useState } from 'react';
import styled from '@emotion/styled';
import { SearchOutlined } from '@ant-design/icons';
import useInput from '../../hooks/useInput';
import { useDispatch } from 'react-redux';
import { searchPostsRequest } from '../../redux/reducers/postSlice';
import { History } from 'history';

const SearchMusicBlock = styled.div`
  text-align: center;
`;

const TextWrapper = styled.div`
  font-size: 18px;
  font-weight: lighter;
  margin-bottom: 8px;

  @media (max-width: 480px) {
    font-size: 14px;
  }

  @media (max-width: 320px) {
    font-size: 11px;
  }
`;

const StyledInput = styled.input`
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
    width: 90px;
    font-size: 8px;
  }
`;

const SearchButton = styled.button`
  font-size: 20px;
  font-weight: bold;
  width: 30px;
  height: 30px;
  border-radius: 3px;
  border: none;
  outline: none;
  background: #ffffff;
  cursor: pointer;
  color: #1cbdea;
`;

// TODO: 공통 스타일 모듈화
const ErrorMessage = styled.div`
  color: red;
  text-align: center;
  font-size: 0.875rem;
  margin-top: 1rem;
`;

interface SearchMusicProps {
  history: History;
}

const SearchMusic = ({ history }: SearchMusicProps) => {
  const dispatch = useDispatch();

  const [artist, onChangeArtist] = useInput('');
  const [music, onChangeMusic] = useInput('');
  const [empty, setEmpty] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (artist.length === 0 && music.length === 0) {
      setEmpty(true);
      return;
    }

    dispatch(searchPostsRequest({ artist, music }));
    history.push(`/search?artist=${artist}&music=${music}`);
  };

  return (
    <SearchMusicBlock>
      <TextWrapper>배우고 싶은 노래를 검색하시랑께요!</TextWrapper>
      <form onSubmit={onSubmit}>
        <StyledInput type="text" placeholder="가수" onChange={onChangeArtist} />
        <StyledInput
          type="text"
          placeholder="노래제목"
          onChange={onChangeMusic}
        />
        <SearchButton>
          <SearchOutlined />
        </SearchButton>
      </form>
      {empty && (
        <ErrorMessage>가수와 노래 중 하나를 입력해주세요.</ErrorMessage>
      )}
    </SearchMusicBlock>
  );
};

export default SearchMusic;
