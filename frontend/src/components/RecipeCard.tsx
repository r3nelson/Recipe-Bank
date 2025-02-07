import { Recipe } from "../types/recipe";
import { fetchRecipe } from "../api/recipeAPI";
import { useEffect, useState } from "react";

type RecipeCardProps = {
  recipe_id: number;
};

export default function RecipeCard({ recipe_id }: RecipeCardProps) {
  const [recipe, setRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    async function loadRecipe() {
      const data = await fetchRecipe(recipe_id);
      setRecipe(data);
    }
    loadRecipe();
  }, [recipe_id]);

  return (
    <div>
      {recipe ? (
        <div>
          <h2>{recipe.name}</h2>
          <p>
            quantity: {recipe.quantity} | prep time: {recipe.prepTime}mins |
            cook time: {recipe.cookTime}mins
          </p>
          <p>Cooked: {recipe.haveCooked ? "Yes" : "No"}</p>
          <div>
            <h3>Ingredients</h3>
            <ul>
              {recipe.ingredients.map((ing, index) => (
                <li key={index}>
                  {`${ing.quantity} ${ing.measurement_type} ${ing.name}`}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Directions</h3>
            <ol>
              {recipe.directions.map((direction, index) => (
                <li key={index}>{direction}</li>
              ))}
            </ol>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
