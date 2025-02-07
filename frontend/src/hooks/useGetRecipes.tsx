import { fetchRecipes } from "../api/recipeAPI";
import { Recipe } from "../types/recipe";
import { useEffect, useState } from "react";

export default function useGetRecipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadRecipes() {
      try {
        const data = await fetchRecipes();
        setRecipes(data);
      } catch (error) {
        setError("Failed to load recipes");
      } finally {
        setIsLoading(false);
      }
    }
    loadRecipes();
  }, []);

  return { recipes, isLoading, error };
}
