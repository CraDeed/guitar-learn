// API 데이터 타입

export interface PostType {
  _id?: string;
  title: string;
  link: string;
  youtuber: string;
  thumbnail: string;
  key: string;
  youtuberImage: string;
}

export type PostArray = PostType[];

export interface UserType {
  _id: string;
  username: string;
  image?: string;
  guitarSkill?: string;
  introduction?: string;
  post?: PostType[];
}

// API 전달 타입

export interface UserLoginSignType {
  username: string;
  password: string;
}

export interface UserProfileType {
  username: string;
  data: FormData;
}

export interface UpdateProfileType {
  username: string;
  profileData: {
    guitarSkill: string;
    introduction: string;
  };
}

export interface AddPlaylistType {
  userId: string;
  post: PostType;
}

export interface RemovePlaylistType {
  userId: string;
  postKey: string;
}

export interface SearchPostlistType {
  artist: string;
  music: string;
}
