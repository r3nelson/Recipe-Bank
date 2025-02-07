import useGetRecipes from "../hooks/useGetRecipes";

export default function Navbar() {
  const { recipes } = useGetRecipes();

  return (
    <div className=" flex items-center">
      <h1 className="text-2xl">Recipe Bank</h1>
      <p>Recipes: {recipes.length}</p>
      <p>Cooked: {recipes.filter((r) => r.haveCooked == true).length}</p>
    </div>
  );
}
