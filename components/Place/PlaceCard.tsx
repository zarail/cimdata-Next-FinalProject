import Link from "next/link";
import classes from "./PlaceCard.module.css";

type Props = {
  place: string;
};

export default function PlaceCard({ place }: Props) {
  const placeURLClean = place.toLowerCase().replace(/\s+/g, "-");
  return (
    <div className={classes.categoryCard}>
      <Link className={classes.cardLink} href={`/place/${placeURLClean}`}>
        <h3 className={classes.cardTitle}>{place}</h3>
      </Link>
    </div>
  );
}
