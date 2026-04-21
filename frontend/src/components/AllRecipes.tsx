import { Recipe } from "../types/recipe";
import SectionHeader from "./recipeCard components/SectionHeader";
import SearchBar from "./SearchBar";
import { useState } from "react";

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
  const [hideRecipes, setHideRecipes] = useState(false);
  const recipeNamesAndIds: [string, number][] = [];

  recipes.map((recipe) =>
    recipeNamesAndIds.push([recipe.name.toLowerCase(), recipe.id])
  );
  recipeNamesAndIds.sort();
  const numCols = recipeNamesAndIds.length <= 15 ? 3 : 4;

  return (
    <div
      className="flex flex-col justify-center items-center text-lg"
      onClick={onSetShowRecipeOptions}
    >
      {showRecipeOptions ? (
        <div className="relative p-10 border text-center m-3 w-xl">
          <SearchBar
            recipes={recipes}
            onHideRecipesChange={setHideRecipes}
            updateRecipeId={updateRecipeId}
          ></SearchBar>

          {!hideRecipes && (
            <>
              <SectionHeader header="All Recipes"></SectionHeader>
              {recipeNamesAndIds.length === 0 ? (
                <p className="text-gray-600 mt-4">
                  No recipes yet — start adding recipes below!
                </p>
              ) : (
                <ul className={`text-md grid grid-cols-${numCols}`}>
                  {recipeNamesAndIds.map((recipe, index) => (
                    <li
                      className="cursor-pointer hover:bg-gray-200"
                      key={index}
                      onClick={() => updateRecipeId(recipe[1])}
                    >
                      {recipe[0]}
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}
        </div>
      ) : (
        <button className="p-2 m-5 cursor-pointer hover:bg-stone-50">
          All Recipes
        </button>
      )}
    </div>
  );
}
