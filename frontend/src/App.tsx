import { useState } from "react";
import RecipeCard from "./components/RecipeCard";
import Navbar from "./components/Navbar";
import useRecipeNavigation from "./hooks/useRecipeNavigation";
import useGetRecipes from "./hooks/useGetRecipes";
import AddButton from "./components/AddButton";
import EditButton from "./components/EditButton";
import AllRecipes from "./components/AllRecipes";
import SearchBar from "./components/SearchBar";

function App() {
  const [isEditing, setIsEditing] = useState(false);
  const [showRecipeCard, setShowRecipeCard] = useState(true);
  const [showRecipeOptions, setShowRecipeOptions] = useState(false);
  const { recipes, isLoading, error } = useGetRecipes();
  const { recipe_id, handlePrev, handleNext, goTo } = useRecipeNavigation(
    recipes.length
  );

  function handleEdit() {
    setIsEditing(!isEditing);
    console.log(isEditing);
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
      <div className="flex justify-between items-center">
        <AllRecipes
          recipes={recipes}
          showRecipeOptions={showRecipeOptions}
          onSetShowRecipeOptions={toggleShowRecipes}
          updateRecipeId={goTo}
        ></AllRecipes>
        <SearchBar recipes={recipes}></SearchBar>
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
      <AddButton></AddButton>
      <EditButton onToggleEdit={handleEdit}></EditButton>
    </>
  );
}

export default App;
