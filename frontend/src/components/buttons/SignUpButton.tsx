import { useNavigate } from "react-router-dom";
type SignUpButtonProps = {
  styling: string;
};
export default function SignUpButton({ styling }: SignUpButtonProps) {
  const Navigate = useNavigate();
  return (
    <div>
      <button onClick={() => Navigate("/register")} className={styling}>
        Sign Up
      </button>
    </div>
  );
}
