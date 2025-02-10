import RecipeCard from "./components/RecipeCard";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar></Navbar>
      <RecipeCard recipe_id={1}></RecipeCard>
    </>
  );
}

export default App;
