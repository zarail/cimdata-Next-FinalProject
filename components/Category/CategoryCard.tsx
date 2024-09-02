import Link from "next/link";
import classes from "./CategoryCard.module.css";

type Props = {
  category: string;
};

export default function CategoryCard({ category }: Props) {
  return (
    <div className={classes.categoryCard}>
      <Link className={classes.cardLink} href={`/${category}`}>
        <h3 className={classes.cardTitle}>{category.toUpperCase()}</h3>
      </Link>
    </div>
  );
}
