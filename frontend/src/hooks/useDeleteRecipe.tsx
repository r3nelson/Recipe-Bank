import { deleteRecipe } from "../api/recipeAPI";
import { useEffect } from "react";

export default function useDeleteRecipe(recipe_id: number) {
  useEffect(() => {
    async function deleteRecipeByID() {
      await deleteRecipe(recipe_id);
    }
    deleteRecipeByID();
  }, [recipe_id]);
}
