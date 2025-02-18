import { Recipe } from "../types/recipe";

type AllRecipesProps = {
  recipes: Recipe[];
  showRecipeOptions: boolean;
  updateRecipeId: (id: number) => void;
  onSetShowRecipeOptions: () => void;
};

export default function AllRecipes({
  recipes,
  showRecipeOptions,
  updateRecipeId,
  onSetShowRecipeOptions,
}: AllRecipesProps) {
  const recipeNamesAndIds: [string, number][] = [];
  recipes.map((recipe) =>
    recipeNamesAndIds.push([recipe.name.toLowerCase(), recipe.id])
  );

  recipeNamesAndIds.sort();

  return (
    <div
      className="flex flex-col justify-center items-center text-xl"
      onClick={onSetShowRecipeOptions}
    >
      All Recipes
      {showRecipeOptions && (
        <ul className="text-base border">
          {recipeNamesAndIds.map((recipe, index) => (
            <li key={index} onClick={() => updateRecipeId(recipe[1])}>
              {recipe[0]}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
