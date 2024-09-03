import Link from "next/link";
import classes from "./PlaceCard.module.css";
import type { Place } from "@prisma/client";

type Props = Place;

export default function PlaceCard({ name, slug }: Props) {
  return (
    <div className={classes.categoryCard}>
      <Link className={classes.cardLink} href={`/place/${slug}`}>
        <h3 className={classes.cardTitle}>{name}</h3>
      </Link>
    </div>
  );
}
