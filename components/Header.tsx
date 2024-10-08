"use client";

import Link from "next/link";
import { MdHome } from "react-icons/md";
import { MdAddBox } from "react-icons/md";
import { TbCategoryFilled } from "react-icons/tb";
import { useToggle } from "@/lib/hooks/useToggle";
import CategoriesDropdown from "./CategoriesDropdown";
import { useRef, useEffect } from "react";

type HeaderProps = {
  categories: string[];
};

export default function Header({ categories }: HeaderProps) {
  const [isDropdownOpen, toggleDropdown, , , setDropdownClose] =
    useToggle(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setDropdownClose]);

  return (
    <header className="site-header">
      <div className="logo-container">
        <Link href="/" className="header-link">
          <MdHome size={30} />
          <strong>Hey Local</strong>
        </Link>
        <div className="categories-container">
          <button
            className="header-link github-button"
            onClick={toggleDropdown}
            style={{ cursor: "pointer" }}
          >
            <TbCategoryFilled size={30} />
            <strong>Categories</strong>
          </button>
          {isDropdownOpen && (
            <div ref={dropdownRef}>
              <CategoriesDropdown
                categories={categories}
                onItemClick={setDropdownClose}
              />
            </div>
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
