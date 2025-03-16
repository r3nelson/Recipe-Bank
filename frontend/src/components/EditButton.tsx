import { useState } from "react";
import EditRecipeForm from "./EditRecipeForm";
import { Recipe } from "../types/recipe";
import { updateRecipe } from "../api/recipeAPI";
import useGetRecipeByID from "../hooks/useGetRecipeByID";

type EditButtonProps = {
  recipe_id: number;
};

export default function EditButton({ recipe_id }: EditButtonProps) {
  const [showForm, setShowForm] = useState(false);
  const { recipe } = useGetRecipeByID(recipe_id);

  function toggleForm() {
    setShowForm(!showForm);
  }

  async function handleUpdate(recipe: Recipe) {
    await updateRecipe(recipe_id, recipe);
    setShowForm(false);
    window.location.reload();
  }

  return (
    <div>
      <button
        onClick={toggleForm}
        className="bg-yellow-500 text-white px-4 py-2 rounded-md cursor-pointer  hover:bg-yellow-700 transition"
      >
        Edit Recipe
      </button>
      {showForm && recipe && (
        <EditRecipeForm
          recipe={recipe}
          onUpdate={handleUpdate}
          onCancel={() => setShowForm(false)}
        ></EditRecipeForm>
      )}
    </div>
  );
}
