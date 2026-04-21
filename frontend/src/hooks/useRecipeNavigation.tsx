import { useState } from "react";

export default function useRecipeNavigation(validIds: number[]) {
  const [recipe_id, setRecipeId] = useState(1);

  // validIds are sorted by default on backend.

  function handlePrev() {
    if (!validIds.includes(recipe_id)) {
      setRecipeId(validIds[0]);
    } else {
      const index = validIds.indexOf(recipe_id);
      const length = validIds.length;
      if (index - 1 >= 0 && index - 1 < length) {
        setRecipeId(validIds[index - 1]);
      }
    }
  }
  function handleNext() {
    if (!validIds.includes(recipe_id)) {
      setRecipeId(validIds[0]);
    } else {
      const index = validIds.indexOf(recipe_id);
      const length = validIds.length;
      if (index + 1 < length) {
        setRecipeId(validIds[index + 1]);
      }
    }
  }

  function goTo(id: number) {
    if (validIds.includes(id)) setRecipeId(id);
  }

  return { recipe_id, handlePrev, handleNext, goTo };
}
