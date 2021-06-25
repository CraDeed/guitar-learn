import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

const PostCardContainer = styled.div`
  margin: 2px;
`;

const PostCardWrapper = styled.div`
  position: relative;
  margin: 10px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  width: 230px;
  height: 300px;
  transition: 0.3s box-shadow;

  .card-header img {
    width: 100%;
    /* height: 160px; */
    object-fit: cover;
  }
  .card-body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    margin-left: 5px;
    font-size: 1rem;
  }

  .user {
    position: absolute;
    left: 10px;
    bottom: 0px;
    display: flex;
    align-items: center;
  }

  .user img {
    border-radius: 50%;
    width: 40px;
    height: 40px;
    margin-right: 10px;
  }

  &:hover {
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.2), -5px -5px 5px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    width: 210px;
  }
`;

const PostCard = ({ post }) => {
  return (
    <PostCardContainer>
      <Link
        to={{
          pathname: '/watch',
          search: `?v=${post.key}`,
          state: post,
        }}
      >
        <PostCardWrapper>
          <div className="card-header">
            <img src={post.thumbnail} alt="thumbnail" />
          </div>
          <div className="card-body">
            <h4>
              {post.title.length < 80
                ? post.title
                : `${post.title.slice(0, 80)}...`}
            </h4>
          </div>
          <div className="user">
            <img src={post.youtuberImage} alt="youtuberImage" />
            <h5>{post.youtuber}</h5>
          </div>
        </PostCardWrapper>
      </Link>
    </PostCardContainer>
  );
};

export default PostCard;
