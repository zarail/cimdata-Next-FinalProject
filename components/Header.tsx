import Link from "next/link";
import { TiHome } from "react-icons/ti";

export default function Header() {
  return (
    <header className="site-header">
      <nav>
        <Link legacyBehavior href="/">
          <a href="/">
            <TiHome />
          </a>
        </Link>
      </nav>
    </header>
  );
}
