import { useState } from "react";

export default function useRecipeNavigation(totalRecipes: number) {
  const [recipe_id, setRecipeId] = useState(1);

  function handlePrev() {
    if (recipe_id <= 1) return;
    else setRecipeId((id) => id - 1);
  }
  function handleNext() {
    if (recipe_id >= totalRecipes) return;
    else setRecipeId((id) => id + 1);
  }

  return { recipe_id, handlePrev, handleNext };
}
