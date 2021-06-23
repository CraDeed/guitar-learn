import React from 'react';
import styled from '@emotion/styled';

const LoadSearchBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 50vh;
  #wifi-loader {
    --background: #62abff;
    --front-color: #4f29f0;
    --back-color: #c3c8de;
    --text-color: #414856;
    width: 64px;
    height: 64px;
    border-radius: 50px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    svg {
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      circle {
        position: absolute;
        fill: none;
        stroke-width: 6px;
        stroke-linecap: round;
        stroke-linejoin: round;
        transform: rotate(-100deg);
        transform-origin: center;
        &.back {
          stroke: var(--back-color);
        }
        &.front {
          stroke: var(--front-color);
        }
      }
      &.circle-outer {
        height: 86px;
        width: 86px;
        circle {
          stroke-dasharray: 62.75 188.25;
          &.back {
            animation: circle-outer 1.8s ease infinite 0.3s;
          }
          &.front {
            animation: circle-outer 1.8s ease infinite 0.15s;
          }
        }
      }
      &.circle-middle {
        height: 60px;
        width: 60px;
        circle {
          stroke-dasharray: 42.5 127.5;
          &.back {
            animation: circle-middle 1.8s ease infinite 0.25s;
          }
          &.front {
            animation: circle-middle 1.8s ease infinite 0.1s;
          }
        }
      }
      &.circle-inner {
        height: 34px;
        width: 34px;
        circle {
          stroke-dasharray: 22 66;
          &.back {
            animation: circle-inner 1.8s ease infinite 0.2s;
          }
          &.front {
            animation: circle-inner 1.8s ease infinite 0.05s;
          }
        }
      }
    }
    .text {
      position: absolute;
      bottom: -40px;
      display: flex;
      justify-content: center;
      align-items: center;
      text-transform: lowercase;
      font-weight: 500;
      font-size: 14px;
      letter-spacing: 0.2px;
      &::before,
      &::after {
        content: attr(data-text);
      }
      &::before {
        color: var(--text-color);
      }
      &::after {
        color: var(--front-color);
        animation: text-animation 3.6s ease infinite;
        position: absolute;
        left: 0;
      }
    }
  }

  @keyframes circle-outer {
    0% {
      stroke-dashoffset: 25;
    }
    25% {
      stroke-dashoffset: 0;
    }
    65% {
      stroke-dashoffset: 301;
    }
    80% {
      stroke-dashoffset: 276;
    }
    100% {
      stroke-dashoffset: 276;
    }
  }

  @keyframes circle-middle {
    0% {
      stroke-dashoffset: 17;
    }
    25% {
      stroke-dashoffset: 0;
    }
    65% {
      stroke-dashoffset: 204;
    }
    80% {
      stroke-dashoffset: 187;
    }
    100% {
      stroke-dashoffset: 187;
    }
  }

  @keyframes circle-inner {
    0% {
      stroke-dashoffset: 9;
    }
    25% {
      stroke-dashoffset: 0;
    }
    65% {
      stroke-dashoffset: 106;
    }
    80% {
      stroke-dashoffset: 97;
    }
    100% {
      stroke-dashoffset: 97;
    }
  }

  @keyframes text-animation {
    0% {
      clip-path: inset(0 100% 0 0);
    }
    50% {
      clip-path: inset(0);
    }
    100% {
      clip-path: inset(0 0 0 100%);
    }
  }
`;

const LoadSearch = () => {
  return (
    <LoadSearchBlock>
      <div id="wifi-loader">
        <svg className="circle-outer" viewBox="0 0 86 86">
          <circle className="back" cx="43" cy="43" r="40"></circle>
          <circle className="front" cx="43" cy="43" r="40"></circle>
          <circle className="new" cx="43" cy="43" r="40"></circle>
        </svg>
        <svg className="circle-middle" viewBox="0 0 60 60">
          <circle className="back" cx="30" cy="30" r="27"></circle>
          <circle className="front" cx="30" cy="30" r="27"></circle>
        </svg>
        <svg className="circle-inner" viewBox="0 0 34 34">
          <circle className="back" cx="17" cy="17" r="14"></circle>
          <circle className="front" cx="17" cy="17" r="14"></circle>
        </svg>
        <div className="text" data-text="Searching"></div>
      </div>
    </LoadSearchBlock>
  );
};

export default LoadSearch;
