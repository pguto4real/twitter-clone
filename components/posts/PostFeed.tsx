import usePosts from "@/hooks/usePosts";
import React from "react";
import { PostItem } from "./PostItem";
import { ClipLoader } from "react-spinners";


interface PostFeedProps {
  userId?: string;
}

export const PostFeed: React.FC<PostFeedProps> = ({ userId }) => {
  const { data: posts = [],isLoading } = usePosts(userId);
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <ClipLoader color="lightblue" size={80} />
      </div>
    );
  }
  return (
    <div>
      {posts.map((post: Record<string, any>) => (
        <PostItem userId={post.userId} key={post.id} data={post} />
      ))}
    </div>
  );
};
