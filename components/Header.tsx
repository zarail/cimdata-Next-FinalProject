import Link from "next/link";
import { TiHome } from "react-icons/ti";
import { MdAddBox } from "react-icons/md";

export default function Header() {
  return (
    <header className="site-header">
      <nav>
        <Link legacyBehavior href="/">
          <a href="/" className="header-link">
            <TiHome />
          </a>
        </Link>
        <Link href="/place/add-new" className="header-link">
          <MdAddBox />
        </Link>
      </nav>
    </header>
  );
}
