import { useEffect, useState } from "react";
import useGetRecipeByID from "../hooks/useGetRecipeByID";
import Directions from "./recipeCard components/Directions";
import Ingredients from "./recipeCard components/Ingredients";
import SectionHeader from "./recipeCard components/SectionHeader";
import HaveCookedBox from "./recipeCard components/HaveCookedBox";
import StarRating from "./recipeCard components/StarRating";
import GeneralRecipeInfo from "./recipeCard components/GeneralRecipeInfo";
import RecipeImage from "./recipeCard components/RecipeImage";
import NextButton from "../components/buttons/NextButton";
import PreviousButton from "../components/buttons/PreviousButton";

type RecipeCardProps = {
  recipe_id: number;
  handlePrev: () => void;
  handleNext: () => void;
};

export default function RecipeCard({
  recipe_id,
  handlePrev,
  handleNext,
}: RecipeCardProps) {
  const { recipe, isLoading, error } = useGetRecipeByID(recipe_id);
  const [showImage, setShowImage] = useState(false);

  console.log("Recipe Image URL:", recipe?.imgURL);

  useEffect(() => {
    if (recipe?.imgURL) {
      setShowImage(true);
    }
  }, [recipe]);

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
            <div className="flex justify-between items-center">
              <div className={showImage ? "w-1/2" : "w-full"}>
                <Directions directions={recipe.directions} />
              </div>
              {showImage && (
                <div className="w-1/2">
                  <RecipeImage
                    filename={recipe.imgURL}
                    onError={() => setShowImage(false)}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <PreviousButton handlePrevious={handlePrev}></PreviousButton>
          <div className="ml-1">|</div>
          <NextButton handleNext={handleNext}></NextButton>
        </div>
      </div>
    );
  }
}
