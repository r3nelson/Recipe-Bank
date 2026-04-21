type IngredientProps = {
  ingredients: string[];
};

export default function Ingredients({ ingredients }: IngredientProps) {
  const colClass = ingredients.length <= 15 ? "grid-cols-3" : "grid-cols-4";

  return (
    <ul className={`grid ${colClass}  gap-1 list-disc list-inside`}>
      {ingredients.map((ing, index) => (
        <li key={index} className="w-full text-left rounded">
          {ing}
        </li>
      ))}
    </ul>
  );
}
