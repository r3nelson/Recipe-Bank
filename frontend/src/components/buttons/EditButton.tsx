import { useState } from "react";
import EditRecipeForm from "../forms/EditRecipeForm";
import { Recipe } from "../../types/recipe";
import { updateRecipe } from "../../api/recipeAPI";
import useGetRecipeByID from "../../hooks/useGetRecipeByID";

type EditButtonProps = {
  recipe_id: number | null;
};

export default function EditButton({ recipe_id }: EditButtonProps) {
  const [showForm, setShowForm] = useState(false);
  const { recipe } = useGetRecipeByID(recipe_id);

  function toggleForm() {
    setShowForm(!showForm);
  }

  async function handleUpdate(recipe: Recipe, file: File | null) {
    if (recipe_id === null) return;
    await updateRecipe(recipe_id, recipe, file);
    setShowForm(false);
    window.location.reload();
  }

  return (
    <div>
      <button
        onClick={toggleForm}
        className="h-10 bg-yellow-500 text-white px-4 py-2 rounded-md cursor-pointer  hover:bg-yellow-700 transition"
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
