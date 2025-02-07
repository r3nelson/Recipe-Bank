// import RecipesList from "./components/RecipesList";
import RecipeCard from "./components/RecipeCard";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div>
      <Navbar></Navbar>
      <RecipeCard recipe_id={3}></RecipeCard>
      {/* <RecipesList></RecipesList>; */}
    </div>
  );
}

export default App;
