import useGetRecipes from "../hooks/useGetRecipes";

export default function RecipesList() {
  const { recipes, isLoading, error } = useGetRecipes();

  if (isLoading) {
    return <div>Loading...</div>; // Display loading message
  }

  if (error) {
    return <div>{error}</div>; // Display error message
  }

  return (
    <div>
      <h2>Recipes</h2>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.id}>
            <strong>{recipe.name}</strong> - Rating: {recipe.rating ?? "N/A"}
          </li>
        ))}
      </ul>
    </div>
  );
}
