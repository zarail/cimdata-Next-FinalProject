import Link from "next/link";

type CategoriesDropdownProps = {
  categories: string[];
  onItemClick: () => void;
};

export default function CategoriesDropdown({
  categories,
  onItemClick,
}: CategoriesDropdownProps) {
  return (
    <div className="categories-dropdown">
      <ul>
        {categories.map((category, index) => (
          <li key={index}>
            <Link
              href={`/category/${category.toLowerCase()}`}
              onClick={onItemClick}
            >
              {category}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
