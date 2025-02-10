import useGetRecipes from "../hooks/useGetRecipes";

export default function Navbar() {
  const { recipes } = useGetRecipes();

  return (
    <div className="flex justify-between items-center border border-black w-screen min-h-20 p-10">
      <h1 className="text-2xl">User's Recipe Bank</h1>
      <p className="text-xl">Total Recipes: {recipes.length}</p>
      <p className="text-xl">
        Cooked: {recipes.filter((r) => r.haveCooked == true).length}
      </p>
    </div>
  );
}
