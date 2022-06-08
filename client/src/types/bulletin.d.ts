declare module "bulletin-type" {
  export interface PostProps {
    id: string;
    author: string;
    content: string;
    title: string;
    views: number;
    time: number;
  }
}