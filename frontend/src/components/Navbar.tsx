import { Recipe } from "../types/recipe";
import UserProfile from "./UserProfile";

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
      <div>
        <h1 className="text-2xl">MYCookBook</h1>
        <a href="../../public/images/recipe-book.png" title="recipe book icons">
          {/* Recipe book icons created by BZZRINCANTATION - Flaticon */}
        </a>
      </div>
      <UserProfile />
    </div>
  );
}
