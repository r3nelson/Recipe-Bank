import { Recipe } from "../types/recipe";

const baseURL = "http://0.0.0.0:8000/api/recipes";

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
  const response = await fetch(`${baseURL}/${recipe_id}`);
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

export async function createRecipe(recipe: Recipe) {
  try {
    const response = await fetch(baseURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recipe),
    });
    console.log(JSON.stringify(recipe));

    if (!response.ok) {
      throw new Error("Failed to add recipe");
    }

    console.log("Recipe added successfully!");
  } catch (error) {
    console.error("Error:", error);
  }
}
