import { CommentItem } from "./CommentItem";

interface CommentFeedProps {
  comments?:Record<string,any>[]
}
export const CommentFeed: React.FC<CommentFeedProps> = ({
  comments=[]
}) => {
 
  return (
    <>
    {
comments.map((comment)=>(
  <div key={comment.id}>
    <CommentItem key={ comment.id} data={comment}/>
  </div>
))
}</>
  );
};
