import { useNavigate } from "react-router-dom";
type LoginButtonProps = {
  styling: string;
};

export default function LoginButton({ styling }: LoginButtonProps) {
  const Navigate = useNavigate();
  return (
    <div>
      <button onClick={() => Navigate("/login")} className={styling}>
        Login
      </button>
    </div>
  );
}
