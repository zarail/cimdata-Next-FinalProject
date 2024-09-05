import { signIn } from "@/auth";
import { FaGithubSquare } from "react-icons/fa";

export function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn();
      }}
    >
      <button type="submit" className="github-button header-link">
        <FaGithubSquare size={30} />
        Sign in with GitHub
      </button>
    </form>
  );
}
