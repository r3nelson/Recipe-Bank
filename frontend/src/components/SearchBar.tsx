import { useState, useEffect } from "react";
import { Recipe } from "../types/recipe";
import SectionHeader from "./SectionHeader";

type SearchBarProps = {
  recipes: Recipe[];
  onHideRecipesChange: (hide: boolean) => void;
};

export default function SearchBar({
  recipes,
  onHideRecipesChange,
}: SearchBarProps) {
  // Maybe use a tri
  const [searchQuery, setSearchQuery] = useState("");
  const [hideRecipes, setHideRecipes] = useState(false);

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setSearchQuery(value);
    setHideRecipes(value !== "");
  }

  useEffect(() => {
    onHideRecipesChange(hideRecipes);
  }, [hideRecipes]);

  return (
    // search bar
    <div className="border">
      <input
        type="text"
        placeholder="Search recipes"
        value={searchQuery}
        onChange={handleChange}
        className="border m-2 p-1 rounded w-1/2"
      ></input>
      {hideRecipes && <SectionHeader header="All Recipes"></SectionHeader>}
      {searchQuery && filteredRecipes.length > 0 && (
        <div className=" p-10  m-3 w-full">
          <ul className="text-md grid grid-cols-3 gap-1">
            {filteredRecipes.map((recipe, index) => (
              <li key={index}>{recipe.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
