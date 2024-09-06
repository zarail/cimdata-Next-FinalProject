"use client";

import Link from "next/link";
import { MdHome } from "react-icons/md";
import { MdAddBox } from "react-icons/md";
import { TbCategoryFilled } from "react-icons/tb";
import { useToggle } from "@/lib/hooks/useToggle";
import CategoriesDropdown from "./CategoriesDropdown";

type HeaderProps = {
  categories: string[];
};

export default function Header({ categories }: HeaderProps) {
  const [isDropdownOpen, toggleDropdown, , , setDropdownClose] =
    useToggle(false);

  return (
    <header className="site-header">
      <div className="logo-container">
        <Link href="/" className="header-link">
          <MdHome size={30} />
          <strong>Hey Local</strong>
        </Link>
        <div className="categories-container">
          <a
            className="header-link"
            onClick={toggleDropdown}
            style={{ cursor: "pointer" }}
          >
            <TbCategoryFilled size={30} />
            <strong>Categories</strong>
          </a>
          {isDropdownOpen && (
            <CategoriesDropdown
              categories={categories}
              onItemClick={setDropdownClose}
            />
          )}
        </div>
        <Link href="/place/add-new" className="header-link">
          <MdAddBox size={30} />
          <strong>Add a new place</strong>
        </Link>
      </div>
    </header>
  );
}
