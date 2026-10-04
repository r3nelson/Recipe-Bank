import { useState, useEffect } from "react";
import { fetchRecipe } from "../api/recipeAPI";
import { Recipe } from "../types/recipe";

<<<<<<< HEAD
export default function useGetRecipeByID(recipe_id: number | null) {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(recipe_id !== null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (recipe_id === null) {
      setRecipe(null);
      setIsLoading(false);
      return;
    }

    const id = recipe_id;
    setIsLoading(true);
    setError(null);

    async function loadRecipe() {
      try {
        const data = await fetchRecipe(id);
=======
export default function useGetRecipeByID(recipe_id: number) {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadRecipe() {
      try {
        const data = await fetchRecipe(recipe_id);
>>>>>>> origin/main
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
