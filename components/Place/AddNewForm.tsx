"use client";

import type { Category, Image } from "@prisma/client";
import classes from "./AddNewForm.module.css";
import { useFormState } from "react-dom";
import { addNewPlace } from "@/components/Place/PlaceServerActions";
import Link from "next/link";
import SubmitButton from "./SubmitButton";
import { useEffect, useRef, useState } from "react";

type Props = {
  categories: Category[];
  images: Image[];
};
export default function AddNewForm({ categories, images }: Props) {
  const [formState, formAction] = useFormState(addNewPlace, {
    message: "",
    status: "",
    slug: "",
  });

  const [text, setText] = useState("");
  const maxChars = 500;

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (formState.status === "success" && formRef.current) {
      formRef.current.reset();
    }
  }, [formState.status]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  return (
    <form
      className={classes.form}
      action={formAction}
      ref={formRef}
      encType="multipart/form-data"
    >
      <fieldset>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            minLength={2}
            maxLength={100}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            value={text}
            onChange={handleTextChange}
            minLength={2}
            maxLength={maxChars}
          />
          <div>
            {maxChars - text.length}/{maxChars} characters left
          </div>
        </div>
      </fieldset>
      <fieldset>
        <legend>Category</legend>
        {categories.map((category) => (
          <div key={category.id}>
            <input
              type="radio"
              id={`category-${category.id}`}
              name="categoryId"
              value={category.id}
              required
            />
            <label htmlFor={`category-${category.id}`}>{category.name}</label>
          </div>
        ))}
      </fieldset>
      <fieldset>
        <legend>Address</legend>
        <label htmlFor="street">Street</label>
        <input
          type="text"
          name="street"
          id="street"
          minLength={1}
          maxLength={100}
        />
        <label htmlFor="number">Number</label>
        <input
          type="text"
          name="number"
          id="number"
          minLength={0}
          maxLength={10}
        />
        <label htmlFor="zipcode">Zipcode</label>
        <input type="text" name="zip" id="zip" minLength={5} maxLength={5} />
        <label htmlFor="city">City</label>
        <input
          type="text"
          name="city"
          id="city"
          minLength={2}
          maxLength={100}
        />
      </fieldset>
      <fieldset>
        <legend>Upload Images</legend>
        <input
          type="file"
          name="images"
          id="images"
          accept="image/*"
          multiple
        />
      </fieldset>

      <SubmitButton />
      <strong>{formState.message}</strong>

      {formState.status === "success" && (
        <Link href={`/place/${formState.slug}`}>
          <strong>View newly added place</strong>
        </Link>
      )}
    </form>
  );
}
