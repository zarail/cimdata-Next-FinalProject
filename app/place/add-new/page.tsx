import AddNewForm from "@/components/Place/AddNewForm";
import prisma from "@/prisma/db";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add New Place",
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
    <div>
      <h1>Add a new place</h1>
      <AddNewForm categories={categories} images={images} />
    </div>
  );
}
