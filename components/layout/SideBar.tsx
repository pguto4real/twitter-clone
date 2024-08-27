import React from "react";
import { BsHouseFill, BsBellFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import SideBarLogo from "./SideBarLogo";
import { SideBarItem } from "./SideBarItem";
import { BiLogOut } from "react-icons/bi";
import SidebarTweetButton from "./SidebarTweetButton";
import useCurrentUser from "@/hooks/useCurrentUser";
import { signOut } from "next-auth/react";

export default function SideBar() {
  const { data: currentUser } = useCurrentUser();
 
  const items = [
    {
      label: "Home",
      href: "/",
      icon: BsHouseFill,
    },
    {
      label: "Notifications",
      href: "/notifications",
      icon: BsBellFill,
      auth:true,
      alert:currentUser?.hasNotification
    },
    {
      label: "Profile",
      href: `/users/${currentUser?.id}`,
      icon: FaUser,
      auth:true
    },
  ];
  return (
    <div
      className="
    text-white
    col-span-1 h-full pr-4 md:pr-6
    "
    >
      <div
        className="
                    flex flex-col items-end
    "
      >
        <div className="space-y-2 lg:w-[230px]">
          <SideBarLogo />
          {items.map((item) => (
            <SideBarItem
              key={item.href}
              href={item.href}
              label={item.label}
              icon={item.icon}
              auth={item.auth}
              alert={item.alert}
            />
          ))}
          {
            currentUser && (<SideBarItem onClick={()=>signOut()} label="Logout" icon={BiLogOut} />)
          }
          <SidebarTweetButton />
        </div>
      </div>
    </div>
  );
}
