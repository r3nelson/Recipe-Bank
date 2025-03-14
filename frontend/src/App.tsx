import { useEffect, useState } from "react";
import RecipeCard from "./components/RecipeCard";
import Navbar from "./components/Navbar";
import useRecipeNavigation from "./hooks/useRecipeNavigation";
import { deleteRecipe } from "./api/recipeAPI";
import useGetRecipes from "./hooks/useGetRecipes";
import AddButton from "./components/AddButton";
import EditButton from "./components/EditButton";
import AllRecipes from "./components/AllRecipes";

import DeleteButton from "./components/DeleteButton";
import { Recipe } from "./types/recipe";

function App() {
  const [isEditing, setIsEditing] = useState(false);
  const [showRecipeCard, setShowRecipeCard] = useState(false);
  const [showRecipeOptions, setShowRecipeOptions] = useState(true);
  const { recipes: fetchedRecipes, isLoading, error } = useGetRecipes();
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  // add fetched recipes to state
  useEffect(() => {
    if (fetchedRecipes) setRecipes(fetchedRecipes);
  }, [fetchedRecipes]);

  const { recipe_id, handlePrev, handleNext, goTo } = useRecipeNavigation(
    recipes.length
  );

  function handleEdit() {
    setIsEditing(!isEditing);
  }

  async function handleDelete(recipe_id: number) {
    const confirmation = window.confirm(
      `Do you want to delete recipe ${recipe_id}`
    );

    if (confirmation) {
      await deleteRecipe(recipe_id);
      setRecipes(() => recipes.filter((recipe) => recipe.id !== recipe_id));
      window.location.reload();
    }
  }

  function toggleShowRecipes() {
    if (!showRecipeOptions) {
      setShowRecipeCard(false);
      setShowRecipeOptions(true);
    } else {
      setShowRecipeCard(true);
      setShowRecipeOptions(false);
    }
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <Navbar recipes={recipes}></Navbar>

      <div
        className={
          showRecipeOptions
            ? "flex justify-evenly items-center"
            : "flex flex-col-reverse justify-evenly items-center"
        }
      >
        <AllRecipes
          recipes={recipes}
          showRecipeOptions={showRecipeOptions}
          onSetShowRecipeOptions={toggleShowRecipes}
          updateRecipeId={goTo}
        ></AllRecipes>
      </div>

      {!showRecipeOptions && showRecipeCard && (
        <div className="flex justify-center items-center">
          <RecipeCard recipe_id={recipe_id}></RecipeCard>
        </div>
      )}
      <div className="flex justify-evenly">
        <button className="w-m p-5 border" onClick={handlePrev}>
          &lt;&lt; Previous
        </button>

        <button className="w-m p-5 border" onClick={handleNext}>
          Next &gt;&gt;
        </button>
      </div>
      <div className="flex justify-evenly mt-5">
        <AddButton></AddButton>
        <EditButton onToggleEdit={handleEdit}></EditButton>
        <DeleteButton
          recipe_id={recipe_id}
          onDelete={() => handleDelete(recipe_id)}
        ></DeleteButton>
      </div>
    </>
  );
}

export default App;
