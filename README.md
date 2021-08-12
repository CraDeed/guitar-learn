# GUITAR-LEARN

유튜브를 크롤링하여 기타강좌 영상만을 보여주고 담을 수 있는 사이트

## 웹사이트

heroku : **[Go To Guitar-Learn](https://guitar-learn.herokuapp.com/)**

## 만든 이유

- 저는 취미로 기타 연주하는것을 좋아하고 즐깁니다.<br>
  유튜브 영상을 보면서도 연습하는데 기타강좌 영상만을 보여주고 <br>
  언제든지 볼 수 있는 사이트가 있으면 좋겠다는 생각이 들었습니다. <br>
  (🎸 **[크라디드 채널](https://www.youtube.com/channel/UC0pCBsPGS591jiaxSdoEJyg)** 기타 유튜브도 운영중입니다. 좋댓구알은 사랑입니다...!!!)

## Tech Stack

<img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=TypeScript&logoColor=white"/></a>
<img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=white"/></a>
<img src="https://img.shields.io/badge/Redux-764ABC?style=flat-square&logo=Redux&logoColor=white"/></a>
<img src="https://img.shields.io/badge/Redux-Saga-999999?style=flat-square&logo=Redux-Saga&logoColor=white"/></a>
<br>
<img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=Node.js&logoColor=white"/></a>
<img src="https://img.shields.io/badge/Express-000000?style=flat-square&logo=Express&logoColor=white"/></a>
<img src="https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=MongoDB&logoColor=white"/></a>
<br>
<img src="https://img.shields.io/badge/Python-3766AB?style=flat-square&logo=Python&logoColor=white"/></a>

## 주요기능

1. 로그인, 회원가입 <br>
2. 유튜브 영상 크롤링, 재생 <br>
3. 플레이리스트 추가, 삭제 <br>
4. 유저 프로필 업데이트 및 이미지 업로드, 수정 <br>

## 웹 사이트 화면

![기타런 메인 영상](https://user-images.githubusercontent.com/56147655/129140313-38d23b32-fbab-4f51-8c4d-981828c70cab.gif)

![기타런 크롤링 영상](https://user-images.githubusercontent.com/56147655/129140339-687cd3c9-7848-400c-8c9c-bae0f7a9d7a1.gif)

## Think

### Redux와 Redux-Toolkit

글로벌 상태 관리에 있어서 사용 할 수 있는 방법들은 다양한 선택지가 있는데, 리덕스를 택했습니다.

모든 상태 업데이트를 액션으로 정의하고, 액션 정보에 기반하여 리듀서에서 상태를 업데이트하는 이러한 간단명료한 생각 덕분에,

저로서는 리덕스의 개발 스타일이 맞았고 상태를 더욱 쉽게 예측 가능하게 하여 개발하는데 편한 측면이 있었습니다.

비동기 요청으로는 Redux-Saga 미들웨어를 사용하였습니다

리덕스의 단점 중에선 보일러플레이트 코드를 참 많이 준비해야 한다는 것 입니다.

그나마 코드를 더 간단하게 작성하기 위해 전에는 redux-actions 같은걸 사용하긴 했었는데, 조금 편해졌을 뿐 준비해야할 코드는 여전히 많은 편에 속했습니다.

2020년엔 리덕스 개발팀에서 공식적으로 Redux Toolkit 이라는 라이브러리를 릴리즈했습니다. 하나의 함수로 편하게 선언 가능하고 immer도 내장되어 있어 불변성유지도 편하다는 장점이 있어

한번 사용해보고 싶다고 생각만 하다가 이번 프로젝트를 진행하면서 사용했습니다.

### 유튜브 영상 크롤링 - 파이썬?! 셀레니움?!

크롤링할 방법으로는 파이썬을 선택하였습니다. 물론 노드로도 크롤링을 할 수는 있지만

예전에 데이터를 공부할 때 파이썬을 이용하여 분석, 처리하는데 많이 사용했고 크롤링 관련하여서도 공부 하였기에 제가 쓰기에 편해 크롤링 부분은 파이썬을 선택하였습니다.

유튜브는 동적 웹페이지이기 때문에 일반적인 크롤링 방법은 통하지 않았습니다. 그로인해 셀레니움을 선택하였고 제대로 크롤링을 할 수 있었습니다.

다만 셀레니움은 느린 단점이 있고 보완하기 위해 정말 필요한 부분만 셀레니움으로 가져오고 나머지는 BeautifulSoup로 파싱하였습니다. 하지만 그래도 속도는 느린부분이 있고

앞으로 UX를 위해 개선해나아가야할 문제입니다.

또한 웹 사이트 처음 화면으로 오늘의 기타강좌 영상을 보여주는데 매일 다른 가수와 노래들로 보여줘야 하기에 노드 스케줄러를 통해 매일 자정에 크롤링을 하여 다른 영상을 보여줄 수 있도록 하였습니다.
