import useGetRecipeByID from "../hooks/useGetRecipeByID";
import Directions from "./Directions";
import Ingredients from "./Ingredients";
import SectionHeader from "./SectionHeader";
import HaveCookedBox from "./HaveCookedBox";
import StarRating from "./StarRating";
import GeneralRecipeInfo from "./GeneralRecipeInfo";
import RecipeImage from "./RecipeImage";

type RecipeCardProps = {
  recipe_id: number;
};

export default function RecipeCard({ recipe_id }: RecipeCardProps) {
  const { recipe, isLoading, error } = useGetRecipeByID(recipe_id);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (recipe) {
    return (
      <div className="relative p-10 border text-center  m-3 w-3xl">
        <div>
          <StarRating rating={recipe.rating}></StarRating>
          <HaveCookedBox haveCooked={recipe.haveCooked}></HaveCookedBox>

          <div className="m-5">
            <GeneralRecipeInfo
              name={recipe.name}
              quantityAndType={recipe.quantityAndType}
              prepTime={recipe.prepTime}
              cookTime={recipe.cookTime}
            ></GeneralRecipeInfo>
          </div>

          <div>
            <div className="m-5">
              <SectionHeader header="Ingredients"></SectionHeader>
              <Ingredients ingredients={recipe.ingredients}></Ingredients>
            </div>
          </div>

          <div className="m-5">
            <SectionHeader header="Directions"></SectionHeader>
            <div className="flex items-center">
              <div>
                <Directions directions={recipe.directions}></Directions>
              </div>
              <div className="w-1/2">
                <RecipeImage imgURL={recipe.imgURL}></RecipeImage>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
