import { useState } from "react";
import { Recipe } from "../types/recipe";

type SearchBarProps = {
  recipes: Recipe[];
};

export default function SearchBar({ recipes }: SearchBarProps) {
  // this is where I'll return a tri
  console.log(recipes);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  console.log(
    `filteredRecipes: ${filteredRecipes.map((recipe) => recipe.name)}`
  );

  return (
    // search bar
    <div>
      <input
        type="text"
        placeholder="Search recipes"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="border m-2 p-1 rounded w-1/4"
      ></input>
      {filteredRecipes.length > 0 && (
        <ul>
          {filteredRecipes.map((recipe, index) => (
            <li key={index}>{recipe.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
