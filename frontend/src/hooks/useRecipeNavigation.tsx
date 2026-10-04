import { useEffect, useState } from "react";

export default function useRecipeNavigation(validIds: number[]) {
  const [recipe_id, setRecipeId] = useState<number | null>(null);

  // validIds are sorted by default on backend.
  useEffect(() => {
    if (validIds.length === 0) {
      setRecipeId(null);
      return;
    }

    setRecipeId((current) =>
      current !== null && validIds.includes(current) ? current : validIds[0],
    );
  }, [validIds]);

  function handlePrev() {
    if (recipe_id === null || !validIds.includes(recipe_id)) {
      if (validIds.length > 0) setRecipeId(validIds[0]);
    } else {
      const index = validIds.indexOf(recipe_id);
      const length = validIds.length;
      if (index - 1 >= 0 && index - 1 < length) {
        setRecipeId(validIds[index - 1]);
      }
    }
  }
  function handleNext() {
    if (recipe_id === null || !validIds.includes(recipe_id)) {
      if (validIds.length > 0) setRecipeId(validIds[0]);
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
