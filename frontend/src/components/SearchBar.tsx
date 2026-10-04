import { useState } from "react";
import { Recipe } from "../types/recipe";
import SectionHeader from "./recipeCard components/SectionHeader";

type SearchBarProps = {
  recipes: Recipe[];
  onHideRecipesChange: (hide: boolean) => void;
  updateRecipeId: (id: number) => void;
};

export default function SearchBar({
  recipes,
  onHideRecipesChange,
  updateRecipeId,
}: SearchBarProps) {
  // Maybe use a tri
  const [searchQuery, setSearchQuery] = useState("");
  const filteredRecipes = recipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const numCols = filteredRecipes.length <= 15 ? 3 : 4;

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setSearchQuery(value);
    const shouldHide = value !== "";
    onHideRecipesChange(shouldHide);
  }

  return (
    // search bar
    <div>
      <input
        type="text"
        placeholder="Search recipes"
        value={searchQuery}
        onChange={handleChange}
        className="border m-2 p-1 rounded w-1/2"
      ></input>
      {searchQuery && <SectionHeader header="All Recipes"></SectionHeader>}
      {searchQuery && filteredRecipes.length > 0 && (
        <div className=" p-10  m-3 w-full">
          <ul className={`text-md grid grid-cols-${numCols} gap-1`}>
            {filteredRecipes.map((recipe, index) => {
              //   const isLastCol = (index + 1) % numCols === 0;
              return (
                <li
                  className={`cursor-pointer hover:bg-gray-200`}
                  //   ${
                  //     isLastCol ? "" : "border-r border-black"
                  //   }`}
                  onClick={() => updateRecipeId(recipe.id)}
                  key={index}
                >
                  {recipe.name}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
