// this will be the card that shows an entire recipe
// Title, ingredients, directions, image
import { fetchRecipes } from "../api/recipeAPI";
import { Recipe } from "../types/recipe";
import { useEffect, useState } from "react";

export default function RecipeCard() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    async function loadRecipes() {
      const data = await fetchRecipes();
      setRecipes(data);
      console.log(recipes);
    }
    loadRecipes();
  }, []);

  return (
    <div>
      <h2>Recipes</h2>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.id}>
            <strong>{recipe.name}</strong> - Rating: {recipe.rating ?? "N/A"}
          </li>
        ))}
      </ul>
    </div>
  );
}
