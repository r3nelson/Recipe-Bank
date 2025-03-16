import { Recipe } from "../types/recipe";

// const baseURL = "http://0.0.0.0:8000/api/recipes";
const baseURL = "http://localhost:8000/api/recipes";

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

export async function getIds(): Promise<number[]> {
  const response = await fetch(`${baseURL}-ids`);
  try {
    if (!response.ok) {
      throw new Error(`Failed to fetch ids: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching ids:", error);
    return [];
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

export async function updateRecipe(recipe_id: number, recipe: Recipe) {
  try {
    const response = await fetch(`${baseURL}/${recipe_id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recipe),
    });
    console.log(JSON.stringify(recipe));

    if (!response.ok) {
      throw new Error("Failed to add recipe");
    }

    console.log(`Recipe ${recipe.name} updated successfully!`);
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function deleteRecipe(recipe_id: number) {
  try {
    const response = await fetch(`${baseURL}/${recipe_id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Failed to delete recipe with ID ${recipe_id}`);
    }

    console.log(`Recipe with ID ${recipe_id} deleted successfully`);
  } catch (error) {
    console.error(error);
  }
}
