import PlaceCard from "@/components/Place/PlaceCard";
import prisma from "@/prisma/db";
import type { Metadata } from "next";
import classes from "@/components/Category/CategoryCard.module.css";
import Link from "next/link";

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
        <h3>{category}</h3>
        <p>No entry yet. Add the first place!</p>
      </div>
    );
  }

  return (
    <div className="container">
      <h3>{categoryData.name}</h3>
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
          <h6>No places in this category yet!</h6>
        </div>
      )}
      <Link href="/place/add-new">
        <h6>
          <em>
            <strong>+ Add a new place for "{category}"</strong>
          </em>
        </h6>
      </Link>
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
