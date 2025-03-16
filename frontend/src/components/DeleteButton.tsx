type DeleteButtonProps = {
  recipe_id: number;
  onDelete: (recipe_id: number) => void;
};

export default function DeleteButton({
  recipe_id,
  onDelete,
}: DeleteButtonProps) {
  return (
    <button
      onClick={() => onDelete(recipe_id)}
      className="bg-red-500 text-white px-3 py-1 rounded-md cursor-pointer  hover:bg-red-700 transition"
    >
      Delete Recipe
    </button>
  );
}
