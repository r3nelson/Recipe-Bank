import { Recipe } from "../types/recipe";
import SectionHeader from "./SectionHeader";
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
          ></SearchBar>

          {!hideRecipes && (
            <>
              <SectionHeader header="All Recipes"></SectionHeader>
              <ul className="text-md grid grid-cols-3">
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
            </>
          )}
        </div>
      ) : (
        "All Recipes"
      )}
    </div>
  );
}
