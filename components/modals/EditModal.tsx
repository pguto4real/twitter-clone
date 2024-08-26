import useLoginModal from "@/hooks/useLoginModal";
import React, { useCallback, useEffect, useState } from "react";
import Input from "../Input";
import { Modal } from "../Modal";
import useRegisterModal from "@/hooks/useRegisterModal";
import axios from "axios";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import useCurrentUser from "@/hooks/useCurrentUser";
import useUser from "@/hooks/useUser";
import useEditModal from "@/hooks/useEditModal";

const EditModal = () => {
  const { data: currentUser } = useCurrentUser();

  const { mutate: mutateFetchedUser } = useUser(currentUser?.id);
  const editModal = useEditModal();
 
  const [profileImage, setProfileImage] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");

  useEffect(() => {
    setProfileImage(currentUser?.profileImage);
    setCoverImage(currentUser?.coverImage);
    setName(currentUser?.name);
    setUsername(currentUser?.username);
    setBio(currentUser?.bio);

    
  }, [currentUser]);
  const [isLoading, setIsLoading] = useState(false);
    const onSubmit = useCallback(async () => {
      try {
        setIsLoading(true);
       
            await axios.patch("/api/edit", {
                userId :currentUser?.id,
                name,
                username,
                bio,
                profileImage,
                coverImage,
              });
              mutateFetchedUser();
        toast.success("Updated");
        editModal.onClose();
        
        
        
      } catch (error) {
        console.log('error',error)
        toast.error("Something went wrong");
      } finally {
        setIsLoading(false);
      }
    }, [
      editModal,
      name,
      username,
      bio,
      profileImage,
      coverImage,
      mutateFetchedUser,
    ]);
    const bodyContent = (
      <div className="flex flex-col gap-4">
        
        <Input
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
          value={name}
          disabled={isLoading}
          
        />
        <Input
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          disabled={isLoading}
        />
        <Input
          placeholder="Bio"
          onChange={(e) => setBio(e.target.value)}
          value={bio}
          disabled={isLoading}
        />
        {/* <Input
          placeholder="Bio"
          onChange={(e) => setBio(e.target.value)}
          value={bio}
          disabled={isLoading}
          type="file"
        /> */}
        {/* <Input
          placeholder="Password"
          onChange={(e) => setpassword(e.target.value)}
          value={password}
          disabled={isLoading}
          type="password"
        /> */}
      </div>
    );

  //   const footerContent = (
  //     <div className="text-neutral-400 text-center mt-4">
  //       <p>
  //         Already have an account?
  //         <span
  //           onClick={}
  //           className="text-white cursor-pointer hover:underline"
  //         >
  //           {" "}
  //           Sign in
  //         </span>
  //       </p>
  //     </div>
  //   );
  return (
  
    <Modal
      disabled={isLoading}
      isOpen={editModal.isOpen}
      title="Edit your profile"
      actionLabel="Save"
      onClose={editModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
    //   footer={footerContent}
    />
  );
};

export default EditModal;
