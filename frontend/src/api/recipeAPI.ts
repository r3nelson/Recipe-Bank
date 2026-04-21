import { Recipe } from "../types/recipe";
import { getCSRFToken, fetchWithAuthRetry } from "./authAPI";

// If you have issue with CORS try swapping localhost to 127.0.0.1 or vice versa
const baseURL = "http://localhost:8000/api/recipes";
// const baseURL = "http://127.0.0.1:8000/api/recipes";

export async function fetchRecipes(): Promise<Recipe[]> {
  try {
    const response = await fetchWithAuthRetry(`${baseURL}`, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch recipes: ${response.statusText}`);
    }

    const data: Recipe[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return [];
  }
}

export async function fetchRecipe(recipe_id: number): Promise<Recipe | null> {
  try {
    const response = await fetchWithAuthRetry(`${baseURL}/${recipe_id}`, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch recipes: ${response.statusText}`);
    }
    const data: Recipe = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return null;
  }
}

export async function getIds(): Promise<number[]> {
  try {
    const response = await fetchWithAuthRetry(`${baseURL}-ids`, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch ids: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching ids:", error);
    return [];
  }
}

export async function createRecipe(recipe: Recipe, file: File | null) {
  try {
    const csrfToken = getCSRFToken();
    const formData = new FormData();

    // Add recipe fields
    Object.entries(recipe).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        // Convert arrays to JSON strings
        if (Array.isArray(value)) {
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, String(value));
        }
      }
    });

    // Add image file if provided
    if (file) {
      formData.append("file", file);
    }

    const response = await fetchWithAuthRetry(baseURL, {
      method: "POST",
      credentials: "include",
      headers: {
        "X-CSRF-Token": csrfToken,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to add recipe");
    }

    console.log("Recipe added successfully!");
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function updateRecipe(
  recipe_id: number,
  recipe: Recipe,
  file: File | null,
) {
  try {
    const csrfToken = getCSRFToken();
    const formData = new FormData();

    // Add recipe fields
    Object.entries(recipe).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        // Convert arrays to JSON strings
        if (Array.isArray(value)) {
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, String(value));
        }
      }
    });

    // Add image file if provided
    if (file) {
      formData.append("file", file);
    }

    const response = await fetchWithAuthRetry(`${baseURL}/${recipe_id}`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "X-CSRF-Token": csrfToken,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to update recipe");
    }

    console.log(`Recipe ${recipe.name} updated successfully!`);
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function deleteRecipe(recipe_id: number) {
  try {
    const csrfToken = getCSRFToken();
    const response = await fetchWithAuthRetry(`${baseURL}/${recipe_id}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "X-CSRF-Token": csrfToken,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to delete recipe with ID ${recipe_id}`);
    }

    console.log(`Recipe deleted successfully`);
  } catch (error) {
    console.error(error);
  }
}

// export async function uploadImage(file: File | null) {
//   if (!file) return "";

//   const formData = new FormData();
//   formData.append("file", file);

//   try {
//     const csrfToken = getCSRFToken();
//     const response = await fetchWithAuthRetry(
//       `http://127.0.0.1:8000/api/upload`,
//       {
//         method: "POST",
//         credentials: "include",
//         headers: {
//           "X-CSRF-Token": csrfToken,
//         },
//         body: formData,
//       }
//     );

//     if (!response.ok) {
//       throw new Error("Image upload failed!");
//     }

//     const data = await response.json();

//     // Use the URL returned by the backend
//     return data.url; // /images/unique-filename.jpg
//   } catch (error) {
//     console.error("Upload error:", error);
//     return "";
//   }
// }

export function getImageUrl(filename: string) {
  if (!filename) return "";
  //   return `http://127.0.0.1:8000/api/image/${filename}`;
  return `http://localhost:8000/api/image/${filename}`;
}
