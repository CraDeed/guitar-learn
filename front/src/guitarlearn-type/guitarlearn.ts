export interface PostType {
  title: string;
  link: string;
  youtuber: string;
  thumbnail: string;
  key: string;
  youtuberImage: string;
}

export type PostArray = PostType[];

export interface UserType {
  username: string;
  image?: string;
  guitarSkill?: string;
  introduction?: string;
  post?: PostType[];
}
