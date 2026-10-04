import { useEffect, useState } from "react";
import { getUserInfo } from "../api/authAPI";
import { User } from "../types/user";
import UserStatusForm from "./forms/UserStatusForm";
import { useAuth } from "../hooks/useAuth";

export default function UserProfile() {
  const { isLoggedIn } = useAuth();
  const [username, setUsername] = useState("");
  const [showStatusForm, setShowStatusForm] = useState(false);
  const name = username?.trim().split(" ");
  const firstInitial = name[0]?.[0]?.toUpperCase() || "";
  const lastInitial = name[1]?.[0]?.toUpperCase() || "";
  const initials = name.length > 1 ? `${firstInitial}${lastInitial}` : "";

  useEffect(() => {
    async function getUserStatus() {
      const user: User = await getUserInfo();
      if (user) {
        setUsername(user.name);
      }
    }
    getUserStatus();
  }, [isLoggedIn]);

  function handleClick() {
    setShowStatusForm(true);
  }

  return showStatusForm ? (
    <UserStatusForm onClose={() => setShowStatusForm(false)} />
  ) : (
    <div
      className="w-14 h-14 bg-blue-300 text-white flex items-center justify-center rounded-full text-lg font-bold cursor-pointer"
      onClick={handleClick}
    >
      {isLoggedIn ? initials : "?"}
    </div>
  );
}
