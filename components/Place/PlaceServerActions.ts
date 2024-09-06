"use server";

import { zfd } from "zod-form-data";
import { z } from "zod";
import prisma from "@/prisma/db";
import slugify from "react-slugify";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function uploadImageToCloudinary(file: File) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", process.env.CLOUDINARY_UPLOAD_PRESET!);
  formData.append("api_key", process.env.CLOUDINARY_API_KEY!);
  formData.append("timestamp", String(Math.floor(Date.now() / 1000)));

  const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`;

  const response = await fetch(cloudinaryUrl, {
    method: "POST",
    body: formData,
  });

  const data: any = await response.json();

  if (data.secure_url) {
    return data.secure_url;
  } else {
    throw new Error("Failed to upload image to Cloudinary");
  }
}

export async function addNewPlace(formstate: unknown, formData: FormData) {
  const schema = zfd.formData({
    name: zfd.text(z.string().min(2).max(100)),
    description: zfd.text(z.string().min(2).max(1000).optional()),
    categoryId: zfd.text(z.string().min(1)),
    street: zfd.text(z.string().min(1).max(100).optional()),
    number: zfd.text(z.string().min(1).max(10).optional()),
    zip: zfd.text(z.string().min(5).max(5).optional()),
    city: zfd.text(z.string().min(2).max(100).optional()),
    userName: zfd.text(z.string().min(2).max(100).optional()),
  });

  const { success, data, error } = schema.safeParse(formData);

  console.log(error);
  console.log(formData);

  if (!success) {
    return {
      message: "❌ Please check your input!",
      status: "error",
      newPlaceId: 0,
    };
  }

  const categoryId = Number(data.categoryId);

  if (isNaN(categoryId)) {
    return {
      message: "❌ Invalid category selected!",
      status: "error",
      newPlaceId: 0,
    };
  }

  const slug = slugify(data.name);

  const existingPlace = await prisma.place.findUnique({
    where: {
      slug,
    },
  });

  if (existingPlace) {
    return {
      message: "❌ Place already exists!",
      status: "error",
      newPlaceId: 0,
    };
  }

  const imageFiles = formData.getAll("images") as File[];
  const uploadedImageUrls: string[] = [];

  for (const file of imageFiles) {
    const url = await uploadImageToCloudinary(file);
    uploadedImageUrls.push(url);
  }

  const newPlace = await prisma.place.create({
    data: {
      name: data.name,
      description: data.description,
      slug,
      categories: {
        connect: { id: categoryId },
      },
      street: data.street || "",
      number: data.number || "",
      zip: data.zip || "",
      city: data.city || "",
      images: {
        create: uploadedImageUrls.map((url) => ({ url })),
      },
      userName: data.userName || "Anonymous",
    },
  });

  return {
    message: "✅ The place has been added successfully!",
    status: "success",
    slug: newPlace.slug,
  };
}
