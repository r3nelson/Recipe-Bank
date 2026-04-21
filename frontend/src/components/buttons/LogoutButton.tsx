import { useNavigate } from "react-router-dom";
import { logout } from "../../api/authAPI";

export default function LogOutButton() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const confirmed = window.confirm("Are you sure you want to log out?");
    if (!confirmed) return;
    await logout();
    navigate("/login"); // Redirect after logout
  };

  return (
    <div>
      <button
        onClick={handleLogout}
        className="w-1/2 bg-red-500 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-red-700 transition "
      >
        Log Out
      </button>
    </div>
  );
}
