import { auth } from "@/auth";
import { SignIn } from "./Auth/SignIn";
import { SignOut } from "./Auth/SignOut";
import User from "./Auth/User";

export default async function Footer() {
  const session = await auth();
  console.log(session);
  console.log(session?.user);
  console.log(session?.user?.name);

  return (
    <footer className="site-footer">
      <strong>📍 Hey Local - Developed by Zahra Ilkhan - 2024</strong>
      {session && <User {...session.user} />}
      {session ? <SignOut /> : <SignIn />}
    </footer>
  );
}
