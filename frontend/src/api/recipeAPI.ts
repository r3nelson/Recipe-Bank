import { Recipe } from "../types/recipe";

const baseURL = "http://0.0.0.0:8000/api/recipes/";

export async function fetchRecipes(): Promise<Recipe[]> {
  const response = await fetch(baseURL);
  try {
    if (!response.ok) {
      throw new Error(`Failed to fetch recipes: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return [];
  }
}

export async function fetchRecipe(recipe_id: number): Promise<Recipe | null> {
  const response = await fetch(`${baseURL}${recipe_id}`);
  try {
    if (!response.ok) {
      throw new Error(`Failed to fetch recipes: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return null;
  }
}
