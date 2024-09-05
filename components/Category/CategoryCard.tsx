import Link from "next/link";
import classes from "./CategoryCard.module.css";

type Props = {
  category: string;
};

export default function CategoryCard({ category }: Props) {
  return (
    <div className={classes.categoryCard}>
      <Link
        className={classes.cardLink}
        href={`/category/${category.toLowerCase()}`}
      >
        <h4 className={classes.cardTitle}>{category.toUpperCase()}</h4>
      </Link>
    </div>
  );
}
