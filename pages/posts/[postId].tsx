import { Form } from "@/components/Form";
import { Header } from "@/components/Header";
import { CommentFeed } from "@/components/posts/CommentFeed";
import { PostFeed } from "@/components/posts/PostFeed";
import { PostItem } from "@/components/posts/PostItem";
import { UserBio } from "@/components/users/UserBio";
import { UserHero } from "@/components/users/UserHero";
import useCurrentUser from "@/hooks/useCurrentUser";
import usePost from "@/hooks/usePost";

import useUser from "@/hooks/useUser";
import { useRouter } from "next/router";
import React from "react";
import { ClipLoader } from "react-spinners";

export const PostView = () => {
  const router = useRouter();
  const { data: currentUser } = useCurrentUser();
  const { postId } = router.query;
 

  const { data: fetchedPost, isLoading } = usePost(postId as string);


  if (isLoading || !fetchedPost) {
    return (
      <div className="flex justify-center items-center h-full">
        <ClipLoader color="lightblue" size={80} />
      </div>
    );
  }

  return (
    <>
      <Header label="Tweet" showBackArror />
      <PostItem data={fetchedPost} userId={fetchedPost.userId} />
      <Form postId={fetchedPost.id} placeholder="Tweet your reply" isComment />
      <CommentFeed comments={fetchedPost?.comments} />
      {/* <UserHero userId={userId as string}/>
      <UserBio userId={userId as string}/>
      <PostFeed userId={userId as string}/> */}
    </>
  );
};

export default PostView;
