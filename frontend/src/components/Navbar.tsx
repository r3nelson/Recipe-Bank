import { Recipe } from "../types/recipe";
type NavbarProps = {
  recipes: Recipe[];
};

export default function Navbar({ recipes }: NavbarProps) {
  return (
    <div className="flex justify-between items-center border border-black w-screen min-h-20 p-10">
      <div>
        <p className="text-sm">Recipes: {recipes.length}</p>
        <p className="text-sm">
          Cooked: {recipes.filter((r) => r.haveCooked == true).length}
        </p>
      </div>
      <h1 className="text-2xl">MYCookBook</h1>
      <div className="w-14 h-14 bg-blue-300 text-white flex items-center justify-center rounded-full text-lg font-bold">
        MV
      </div>
    </div>
  );
}
