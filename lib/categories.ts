const categories = ["culture", "sport", "food", "sightseeing"];

const catCaseCorrected = categories.map((category) => {
  return category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
});

export const sortedCategories = catCaseCorrected.sort();
