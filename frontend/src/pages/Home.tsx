import { useState } from "react";
import RecipeCard from "../components/RecipeCard";
import Navbar from "../components/Navbar";
import AddButton from "../components/buttons/AddButton";
import EditButton from "../components/buttons/EditButton";
import AllRecipes from "../components/AllRecipes";
import DeleteButton from "../components/buttons/DeleteButton";
import useRecipeNavigation from "../hooks/useRecipeNavigation";
import useRecipesManger from "../hooks/useRecipesManager";

export default function Home() {
  const [showRecipeCard, setShowRecipeCard] = useState(false);
  const { recipes, validIds, isLoading, error, deleteRecipeById } =
    useRecipesManger();

  const { recipe_id, handlePrev, handleNext, goTo } =
    useRecipeNavigation(validIds);

  const toggleShowRecipes = () => setShowRecipeCard((prev) => !prev);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <Navbar recipes={recipes}></Navbar>

      <div
        className={
          !showRecipeCard
            ? "flex justify-evenly items-center"
            : "flex flex-col-reverse justify-evenly items-center"
        }
      >
        <AllRecipes
          recipes={recipes}
          showRecipeOptions={!showRecipeCard}
          onSetShowRecipeOptions={toggleShowRecipes}
          updateRecipeId={goTo}
        ></AllRecipes>
      </div>

      {showRecipeCard && (
        <div className="flex justify-center items-center">
          <RecipeCard
            recipe_id={recipe_id}
            handlePrev={handlePrev}
            handleNext={handleNext}
          ></RecipeCard>
        </div>
      )}

      <div className="flex justify-evenly mt-5 mb-10">
        <AddButton></AddButton>
        <EditButton recipe_id={recipe_id}></EditButton>
        <DeleteButton
          recipe_id={recipe_id}
          onDeleted={deleteRecipeById}
        ></DeleteButton>
      </div>
    </div>
  );
}
