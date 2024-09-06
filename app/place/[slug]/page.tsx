import prisma from "@/prisma/db";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PlaceImage from "@/components/Place/PlaceImage";

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

  const {
    name,
    description,
    street,
    number,
    zip,
    city,
    categories,
    images,
    userName,
  } = placeData;

  return (
    <div className="container">
      <h3>{name}</h3>
      <p>{description ?? "No description"}</p>
      <p>
        <strong>Address:</strong>{" "}
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
      <p>
        <strong>Category:</strong>{" "}
        {categories.map((category) => category.name).join(", ")}
      </p>
      <p>
        <strong>Posted by:</strong> {userName ?? "Anonymous User"}
      </p>
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
