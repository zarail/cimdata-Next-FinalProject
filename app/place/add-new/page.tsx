import AddNewForm from "@/components/Place/AddNewForm";
import prisma from "@/prisma/db";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "📍 Add New Place",
};

export default async function AddNewPage({}) {
  const categories = await prisma.category.findMany({
    select: {
      id: true,
      name: true,
    },
    orderBy: {
      name: "asc",
    },
  });

  const images = await prisma.image.findMany({
    select: {
      id: true,
      url: true,
      placeId: true,
    },
  });

  return (
    <div className="container">
      <h3>Add a new place</h3>
      <AddNewForm categories={categories} images={images} />
    </div>
  );
}
