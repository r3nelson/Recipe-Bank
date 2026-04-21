import { useState, useEffect } from "react";
import { fetchRecipe } from "../api/recipeAPI";
import { Recipe } from "../types/recipe";

export default function useGetRecipeByID(recipe_id: number) {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadRecipe() {
      try {
        const data = await fetchRecipe(recipe_id);
        setRecipe(data);
      } catch (error) {
        setError("Could not fetch Recipe");
      } finally {
        setIsLoading(false);
      }
    }
    loadRecipe();
  }, [recipe_id]);

  return { recipe, isLoading, error };
}
