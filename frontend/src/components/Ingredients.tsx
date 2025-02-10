// Will contain bulleted list of ingredients.
// Layout will change based on number of ingredients
import { Ingredient } from "../types/recipe";

type IngredientProps = {
  ingredients: Ingredient[];
};
export default function Ingredients({ ingredients }: IngredientProps) {
  return (
    <ul
      className={
        ingredients.length <= 15 ? "grid grid-cols-3 " : "grid grid-cols-4"
      }
    >
      {ingredients.map((ing, index) => {
        const numCols = ingredients.length <= 15 ? 3 : 4;
        const isLastCol = (index + 1) % numCols === 0;

        return (
          <li
            className={`mr-1 pr-1 pl-1 ${
              isLastCol ? "" : "border-r border-black"
            }`}
            key={index}
          >
            {`${ing.nameAndQuantity}`}
          </li>
        );
      })}
    </ul>
  );
}
