import { useState } from "react";
import AddRecipeForm from "./AddRecipeForm";
import { Recipe } from "../types/recipe";
import { createRecipe } from "../api/recipeAPI";

export default function AddButton() {
  const [showForm, setShowForm] = useState(false);

  async function handleSubmit(recipe: Recipe) {
    await createRecipe(recipe);
    setShowForm(false);
  }

  return (
    <div>
      <button
        onClick={() => setShowForm(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
      >
        Add Recipe
      </button>

      {showForm && (
        <AddRecipeForm
          onSubmit={handleSubmit}
          onCancel={() => setShowForm(false)}
        />
      )}
    </div>
  );
}
