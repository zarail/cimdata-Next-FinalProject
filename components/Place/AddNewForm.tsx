"use client";

import type { Category, Image } from "@prisma/client";
import classes from "./AddNewForm.module.css";
import { useFormState } from "react-dom";
import { addNewPlace } from "@/components/Place/PlaceServerActions";
import Link from "next/link";
import SubmitButton from "./SubmitButton";
import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";

type Props = {
  categories: Category[];
  images: Image[];
};

export default function AddNewForm({ categories, images }: Props) {
  const { data: session, status } = useSession();

  const [formState, formAction] = useFormState(addNewPlace, {
    message: "",
    status: "",
    slug: "",
  });

  const [text, setText] = useState("");

  const [useSessionName, setUseSessionName] = useState(false);

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

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUseSessionName(e.target.checked);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (useSessionName && session?.user?.name) {
      const hiddenUserNameInput = document.createElement("input");
      hiddenUserNameInput.type = "hidden";
      hiddenUserNameInput.name = "userName";
      hiddenUserNameInput.value = session.user.name;
      formRef.current?.appendChild(hiddenUserNameInput);
    }
  };

  return (
    <form
      className={classes.form}
      action={formAction}
      ref={formRef}
      encType="multipart/form-data"
      onSubmit={handleFormSubmit}
    >
      <fieldset>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            className={classes.name}
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
            className={classes.description}
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
      <fieldset className={classes.category}>
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
            <div>
              <label htmlFor={`category-${category.id}`}>{category.name}</label>
            </div>
          </div>
        ))}
      </fieldset>
      <fieldset className={classes.addressGrid}>
        <legend>Address</legend>
        <div>
          <label htmlFor="street">Street</label>
          <input
            type="text"
            name="street"
            id="street"
            minLength={1}
            maxLength={100}
          />
        </div>
        <div>
          <label htmlFor="number">Number</label>
          <input
            type="text"
            name="number"
            id="number"
            minLength={0}
            maxLength={10}
          />
        </div>
        <div>
          <label htmlFor="zipcode">Zipcode</label>
          <input type="text" name="zip" id="zip" minLength={5} maxLength={5} />
        </div>
        <div>
          <label htmlFor="city">City</label>
          <input
            type="text"
            name="city"
            id="city"
            minLength={2}
            maxLength={100}
          />
        </div>
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
      <fieldset className={classes.category}>
        <legend>User Info</legend>
        <div>
          <input
            type="checkbox"
            name="useSessionName"
            id="useSessionName"
            onChange={handleCheckboxChange}
          />
          <div>
            <label htmlFor="useSessionName">
              Post as {session?.user?.name}
            </label>
          </div>
        </div>
      </fieldset>

      <div className={classes.submitButtonContainer}>
        <SubmitButton className="button" />
      </div>
      <strong>{formState.message}</strong>

      {formState.status === "success" && (
        <Link href={`/place/${formState.slug}`}>
          <strong>View newly added place</strong>
        </Link>
      )}
    </form>
  );
}
