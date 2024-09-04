"use client";

import type { Category, Image } from "@prisma/client";

type Props = {
  categories: Category[];
  images: Image[];
};

export default function AddNewForm({ categories, images }: Props) {
  return (
    <form>
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
          minLength={2}
          maxLength={1000}
        />
      </div>
      <div>
        <label htmlFor="categoryId">Category</label>
        <select name="categoryId" id="categoryId" required>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <p>Address</p>
        <label htmlFor="street">Street</label>
        <input
          type="text"
          name="street"
          id="street"
          minLength={2}
          maxLength={100}
          required
        />
        <label htmlFor="number">Number</label>
        <input
          type="text"
          name="number"
          id="number"
          minLength={2}
          maxLength={10}
          required
        />
        <label htmlFor="zipcode">Zipcode</label>
        <input
          type="text"
          name="zipcode"
          id="zip"
          minLength={2}
          maxLength={100}
        />
        <label htmlFor="city">City</label>
        <input
          type="text"
          name="city"
          id="city"
          minLength={2}
          maxLength={100}
          required
        />
        <label htmlFor="state">State</label>
        <input
          type="text"
          name="state"
          id="state"
          minLength={2}
          maxLength={100}
        />
      </div>
      {/* <div>
        <label htmlFor="images">Images</label>
        <select name="images" id="images" multiple>
          {images.map((image) => (
            <option key={image.id} value={image.id}>
              {image.url}
            </option>
          ))}
        </select>
      </div> */}
      <button type="submit">Add Place</button>
    </form>
  );
}
