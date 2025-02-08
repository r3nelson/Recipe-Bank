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
    <div className="relative p-10 border text-center  m-3 w-3xl">
      {recipe ? (
        // haveCooked container
        <div>
          <div className="absolute top-3 right-3 flex items-center space-x-2">
            <label htmlFor="cooked" className="text-sm font-semibold">
              Cooked?
            </label>
            <input
              type="checkbox"
              id="cooked"
              checked={recipe.haveCooked}
              readOnly
              className="w-4 h-4 accent-green-600 cursor-pointer"
            />
          </div>
          {/* General Info */}
          <div className="m-5">
            <h2 className="text-xl font-bold">{recipe.name}</h2>
            <p>
              Quantity: {recipe.quantity} | Prep Time: {recipe.prepTime} min |
              Cook Time: {recipe.cookTime} min
            </p>
          </div>

          <div>
            {/* Ingredients */}
            <div className="m-5">
              <div className="flex items-center my-4">
                <div className="flex-grow border-t border-black"></div>
                <span className="px-4 text-black font-semibold">
                  Ingredients
                </span>
                <div className="flex-grow border-t border-black"></div>
              </div>

              <ul
                className={
                  recipe.ingredients.length <= 15
                    ? "grid grid-cols-3 "
                    : "grid grid-cols-4"
                }
              >
                {recipe.ingredients.map((ing, index) => (
                  <li
                    className={
                      recipe.ingredients.length < 3
                        ? ""
                        : recipe.ingredients.length > 15 &&
                          (index + 1) % 4 !== 0
                        ? " border-r border-black mr-1 pr-1 pl-1"
                        : (index + 1) % 3 !== 0
                        ? " border-r border-black mr-1 pr-1 pl-1"
                        : ""
                    }
                    key={index}
                  >
                    {`${ing.quantity} ${ing.measurement_type} ${ing.name}`}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Directions */}
          <div className="m-5">
            {/* <h3>Directions</h3> */}
            <div className="flex items-center my-4">
              <div className=" flex-grow border-t border-black"></div>
              <span className="px-4 text-black font-semibold">Directions</span>
              <div className="flex-grow border-t border-black"></div>
            </div>
            <ol className="list-decimal text-left">
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
