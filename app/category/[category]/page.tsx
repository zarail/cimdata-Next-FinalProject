import PlaceCard from "@/components/Place/PlaceCard";
import prisma from "@/prisma/db";
import type { Metadata } from "next";
import classes from "@/components/Category/CategoryCard.module.css";
import Link from "next/link";
import { MdAddBox } from "react-icons/md";

type Props = {
  params: {
    category: string;
  };
};

export default async function CategoryPage({ params: { category } }: Props) {
  const categoryData = await getCategoryData(category);

  if (!categoryData) {
    return (
      <div>
        <h1>
          {category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()}
        </h1>
        <p>No entry yet. Add the first place!</p>
      </div>
    );
  }

  return (
    <div>
      <h1>{categoryData.name}</h1>
      {categoryData.places.length > 0 ? (
        <Link href="/place/add-new">
          <h3>
            <MdAddBox />
          </h3>
        </Link>
      ) : (
        ""
      )}
      {categoryData.places.length > 0 ? (
        <div className={classes.categoryGrid}>
          {categoryData.places.map((place) => (
            <li key={place.id}>
              <PlaceCard {...place} />
            </li>
          ))}
        </div>
      ) : (
        <div>
          <p>No entry yet!</p>
          <Link href="/place/add-new">
            <h3>
              <MdAddBox />
            </h3>
          </Link>
        </div>
      )}
    </div>
  );
}

async function getCategoryData(categoryName: string) {
  const category = await prisma.category.findFirst({
    where: {
      name: {
        equals: categoryName,
        mode: "insensitive",
      },
    },
    include: { places: true },
  });

  if (!category) {
    return null;
  }

  return category;
}

export async function generateMetadata({
  params: { category },
}: Props): Promise<Metadata> {
  return {
    title: `📍 ${
      category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()
    }`,
  };
}
