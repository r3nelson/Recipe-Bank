import { useEffect, useState } from "react";
import RecipeCard from "./components/RecipeCard";
import Navbar from "./components/Navbar";
import useRecipeNavigation from "./hooks/useRecipeNavigation";
import { getIds } from "./api/recipeAPI";
import { deleteRecipe } from "./api/recipeAPI";
import useGetRecipes from "./hooks/useGetRecipes";
import AddButton from "./components/AddButton";
import EditButton from "./components/EditButton";
import AllRecipes from "./components/AllRecipes";
import DeleteButton from "./components/DeleteButton";
import { Recipe } from "./types/recipe";

function App() {
  const [showRecipeCard, setShowRecipeCard] = useState(false);
  const { recipes: fetchedRecipes, isLoading, error } = useGetRecipes();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [validIds, setValidIds] = useState<number[]>([]);

  // add fetched recipes to state
  useEffect(() => {
    if (fetchedRecipes) setRecipes(fetchedRecipes);
  }, [fetchedRecipes]);

  // update validIds
  useEffect(() => {
    async function fetchIds() {
      const ids = await getIds();
      setValidIds(ids);
    }
    fetchIds();
  }, [recipes]);

  const { recipe_id, handlePrev, handleNext, goTo } =
    useRecipeNavigation(validIds);

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
    setShowRecipeCard(!showRecipeCard);
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
        <EditButton recipe_id={recipe_id}></EditButton>
        <DeleteButton
          recipe_id={recipe_id}
          onDelete={() => handleDelete(recipe_id)}
        ></DeleteButton>
      </div>
    </>
  );
}

export default App;
