import LoginButton from "../buttons/LoginButton";
import LogOutButton from "../buttons/LogoutButton";
import SignUpButton from "../buttons/SignUpButton";
import { useAuth } from "../../hooks/useAuth";

type UserStatusFormProps = {
  onClose: () => void;
};

const UserStatusForm = ({ onClose }: UserStatusFormProps) => {
  const { isLoggedIn } = useAuth();
  return (
    <div className="relative border flex flex-col justify-center gap-2 w-48 p-2">
      <button
        onClick={onClose}
        className="absolute top-1 right-1 text-red-500 hover:text-black text-md"
        aria-label="Close"
      >
        ×
      </button>
      {isLoggedIn ? (
        <LogOutButton />
      ) : (
        <LoginButton styling="w-1/2 bg-green-500 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-green-700 transition" />
      )}
      <SignUpButton styling="w-1/2 bg-yellow-500 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-yellow-700 transition" />
    </div>
  );
};

export default UserStatusForm;
