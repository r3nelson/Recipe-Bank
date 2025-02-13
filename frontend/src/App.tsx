import RecipeCard from "./components/RecipeCard";
import Navbar from "./components/Navbar";
import useRecipeNavigation from "./hooks/useRecipeNavigation";
import useGetRecipes from "./hooks/useGetRecipes";
import AddButton from "./components/AddButton";

function App() {
  const { recipes, isLoading, error } = useGetRecipes();
  const { recipe_id, handlePrev, handleNext } = useRecipeNavigation(
    recipes.length
  );

  return (
    <>
      <Navbar recipes={recipes}></Navbar>
      <div className="flex justify-center items-center">
        <RecipeCard recipe_id={recipe_id}></RecipeCard>
      </div>

      <div className="flex justify-evenly">
        <button className="w-m p-5 border" onClick={handlePrev}>
          &lt;&lt; Previous
        </button>

        <button className="w-m p-5 border" onClick={handleNext}>
          Next &gt;&gt;
        </button>
      </div>
      <AddButton></AddButton>
    </>
  );
}

export default App;
