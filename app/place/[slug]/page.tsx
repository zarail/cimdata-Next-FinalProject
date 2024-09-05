import prisma from "@/prisma/db";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PlaceImage from "@/components/Place/PlaceImage";
// import classes from "@/components/Place/PlaceImage.module.css";

type Props = {
  params: {
    slug: string;
  };
};

export default async function PlacePage({ params: { slug } }: Props) {
  const placeData = await getPlaceData(slug);

  if (!placeData) {
    notFound();
  }

  const { name, description, street, number, zip, city, categories, images } =
    placeData;

  return (
    <div>
      <h1>{name}</h1>
      <p>{description}</p>
      <p>
        Address:{" "}
        {number && street && zip && city ? (
          `${street} ${number}, ${zip} ${city}`
        ) : street && !number && zip && city ? (
          `${street}, ${zip} ${city}`
        ) : street && number && !zip && !city ? (
          `${street} ${number}`
        ) : (
          <em>No address available</em>
        )}
      </p>
      <p>Category: {categories.map((category) => category.name).join(", ")}</p>
      {images.length > 0 && (
        <div>
          {images.map((image) => (
            <PlaceImage key={image.id} name={name} {...image} />
          ))}
        </div>
      )}
    </div>
  );
}

async function getPlaceData(slug: string) {
  const place = await prisma.place.findUnique({
    where: {
      slug,
    },
    include: {
      categories: true,
      images: true,
    },
  });

  if (!place) {
    notFound();
  }

  return place;
}

export async function generateMetadata({
  params: { slug },
}: Props): Promise<Metadata> {
  const placeData = await getPlaceData(slug);

  const name = placeData.name;

  return {
    title: `📍 ${name}`,
  };
}
