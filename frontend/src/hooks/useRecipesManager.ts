import { useEffect, useState } from "react";
import { getIds } from "../api/recipeAPI";
import { Recipe } from "../types/recipe";
import useGetRecipes from "./useGetRecipes";

export default function useRecipesManger() {
  const { recipes: fetchedRecipes, isLoading, error } = useGetRecipes();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [validIds, setValidIds] = useState<number[]>([]);

  //   add fetched recipes to state
  useEffect(() => {
    if (fetchedRecipes) setRecipes(fetchedRecipes);
  }, [fetchedRecipes]);

  // update validIds
  useEffect(() => {
    async function fetchIds() {
      const ids = await getIds();
      setValidIds(ids);
    }
    fetchIds();
  }, [recipes]);

  const deleteRecipeById = (deletedId: number) => {
    setRecipes((prev) => prev.filter((r) => r.id !== deletedId));
  };
  return {
    recipes,
    validIds,
    isLoading,
    error,
    deleteRecipeById,
    setRecipes,
  };
}
