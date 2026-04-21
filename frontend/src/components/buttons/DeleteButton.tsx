import { deleteRecipe } from "../../api/recipeAPI";

type DeleteButtonProps = {
  recipe_id: number;
  onDeleted: (deleted_id: number) => void;
};

export default function DeleteButton({
  recipe_id,
  onDeleted,
}: DeleteButtonProps) {
  async function handleDelete() {
    const confirmed = window.confirm(`Do you want to delete recipe?`);
    if (!confirmed) return;

    try {
      await deleteRecipe(recipe_id);
      onDeleted(recipe_id);
      window.location.reload();
    } catch (err) {
      console.error("Failed to delete recipe", err);
    }
  }

  return (
    <button
      onClick={handleDelete}
      className="h-10 bg-red-500 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-red-700 transition"
    >
      Delete Recipe
    </button>
  );
}
