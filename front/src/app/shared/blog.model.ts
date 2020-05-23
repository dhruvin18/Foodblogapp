export interface Blog {
  _id: string;
  title: string;
  subtitle: string;
  fullname: string;
  email: string;
  summary: string;
  description: string;
  likedBy: Array<string>;
  likes: Number;
  dislikedBy: Array<string>;
  dislikes: Number;
  timestamp: Date;
  image_url: string;
  comments:Array<any>
}
