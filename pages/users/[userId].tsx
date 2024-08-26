import { Header } from "@/components/Header";
import { UserBio } from "@/components/UserBio";
import { UserHero } from "@/components/UserHero";
import useUser from "@/hooks/useUser";
import { useRouter } from "next/router";
import React from "react";
import { ClipLoader } from "react-spinners";

export const UserView = () => {
  const router = useRouter();
  const { userId } = router.query;

  const { data:fetchedUser,isLoading } = useUser(userId as string)


  if(isLoading || !fetchedUser){
    return (
        <div className="flex justify-center items-center h-full">
<ClipLoader color="lightblue" size={80}/>
        </div>
    )
  }

  return (
    <>
      <Header label={fetchedUser?.name} showBackArror />
      <UserHero userId={userId as string}/>
      <UserBio userId={userId as string}/>

    </>
  );
};

export default UserView;
