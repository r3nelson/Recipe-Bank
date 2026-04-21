import { useState, useEffect } from "react";
import { Recipe } from "../../types/recipe";
// import ImageUpload from "../ImageUpload";
import Required from "../Required";
// import { uploadImage } from "../../api/recipeAPI";

type EditRecipeFormProps = {
  recipe: Recipe;
  onCancel: () => void;
  onUpdate: (updatedRecipe: Recipe) => void;
};

export default function EditRecipeForm({
  recipe,
  onCancel,
  onUpdate,
}: EditRecipeFormProps) {
  const [name, setName] = useState(recipe.name);
  const [haveCooked, setHaveCooked] = useState(recipe.haveCooked);
  const [ingredients, setIngredients] = useState<string[]>(recipe.ingredients);
  const [directions, setDirections] = useState<string[]>(recipe.directions);
  const [quantityAndType, setQuantityAndType] = useState(
    recipe.quantityAndType
  );
  const [prepTime, setPrepTime] = useState(recipe.prepTime);
  const [cookTime, setCookTime] = useState(recipe.cookTime);
  const [rating, setRating] = useState(recipe.rating);
  const [imgURL, setImgURL] = useState(recipe.imgURL);
  //   const [file, setFile] = useState<File | null>(null);

  const [editingIngredientIndex, setEditingIngredientIndex] = useState<
    number | null
  >(null);
  const [editingDirectionIndex, setEditingDirectionIndex] = useState<
    number | null
  >(null);
  const [updatedIngredient, setUpdatedIngredient] = useState("");
  const [updatedDirection, setUpdatedDirection] = useState("");

  useEffect(() => {
    setName(recipe.name);
    setHaveCooked(recipe.haveCooked);
    setIngredients(recipe.ingredients);
    setDirections(recipe.directions);
    setQuantityAndType(recipe.quantityAndType);
    setPrepTime(recipe.prepTime);
    setCookTime(recipe.cookTime);
    setRating(recipe.rating);
  }, [recipe]);

  const handleUpdateIngredient = (index: number) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index] = updatedIngredient;
    setIngredients(updatedIngredients);
    setEditingIngredientIndex(null);
  };

  const handleUpdateDirection = (index: number) => {
    const updatedDirections = [...directions];
    updatedDirections[index] = updatedDirection;
    setDirections(updatedDirections);
    setEditingDirectionIndex(null);
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // const uploadedImageUrl = await uploadImage(file);

    const updatedRecipe: Recipe = {
      ...recipe,
      name,
      haveCooked,
      ingredients,
      directions,
      quantityAndType,
      prepTime,
      cookTime,
      rating,
      imgURL: recipe.imgURL,
    };

    try {
      onUpdate(updatedRecipe);
    } catch (error) {
      console.error("Update error:", error);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-5 shadow-md rounded-md w-96 border"
    >
      <h2 className="text-lg font-semibold mb-3">Edit Recipe</h2>
      <label className="block">
        Name:
        <Required />
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border w-full p-1"
          required
        />
      </label>

      <div className="mt-4">
        <h3 className="font-semibold mb-2">Ingredients</h3>
        {ingredients.map((ing, index) => (
          <div key={index} className="flex items-center mb-2">
            {editingIngredientIndex === index ? (
              <input
                value={updatedIngredient}
                onChange={(e) => setUpdatedIngredient(e.target.value)}
                className="border w-full p-1"
              />
            ) : (
              <span>{ing}</span>
            )}
            <button
              type="button"
              onClick={() => {
                setEditingIngredientIndex(index);
                setUpdatedIngredient(ing);
              }}
              className="ml-2 text-blue-500"
            >
              Edit
            </button>
            {editingIngredientIndex === index && (
              <>
                <button
                  type="button"
                  onClick={() => handleUpdateIngredient(index)}
                  className="ml-2 text-green-500"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const newIngredients = ingredients.filter(
                      (_, i) => i !== index
                    );
                    setIngredients(newIngredients);
                    setEditingIngredientIndex(null);
                  }}
                  className="ml-2 text-red-500"
                >
                  Delete
                </button>
              </>
            )}
          </div>
        ))}
      </div>

      <div className="mt-4">
        <h3 className="font-semibold mb-2">Directions</h3>
        {directions.map((dir, index) => (
          <div key={index} className="flex items-center mb-2">
            {editingDirectionIndex === index ? (
              <input
                value={updatedDirection}
                onChange={(e) => setUpdatedDirection(e.target.value)}
                className="border w-full p-1"
              />
            ) : (
              <span>{dir}</span>
            )}
            <button
              type="button"
              onClick={() => {
                setEditingDirectionIndex(index);
                setUpdatedDirection(dir);
              }}
              className="ml-2 text-blue-500"
            >
              Edit
            </button>
            {editingDirectionIndex === index && (
              <>
                <button
                  type="button"
                  onClick={() => handleUpdateDirection(index)}
                  className="ml-2 text-green-500"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const newDirections = directions.filter(
                      (_, i) => i !== index
                    );
                    setDirections(newDirections);
                    setEditingDirectionIndex(null);
                  }}
                  className="ml-2 text-red-500"
                >
                  Delete
                </button>
              </>
            )}
          </div>
        ))}
      </div>

      {/* <label className="block mt-2">
        Directions:
        <Required />
        <div className="flex">
          <input
            value={newDirection}
            onChange={(e) => setNewDirection(e.target.value)}
            className="border w-full p-1"
          />
          <button
            type="button"
            onClick={handleAddDirection}
            className="bg-blue-500 text-white px-2 ml-2"
          >
            Add
          </button>
        </div>
        <ul>
          {directions.map((dir, index) => (
            <li key={index}>{dir}</li>
          ))}
        </ul>
      </label> */}
      <label className="block mt-2">
        Quantity & Type:
        <input
          value={quantityAndType}
          onChange={(e) => setQuantityAndType(e.target.value)}
          placeholder="10 pancakes"
          className="border w-full p-1"
        />
      </label>
      <div className="flex mt-2">
        <label>
          Prep Time (min):
          <input
            type="number"
            value={prepTime}
            onChange={(e) => setPrepTime(parseInt(e.target.value))}
            className="border w-3/4 mr-1"
          />
        </label>
        <label>
          Cook Time (min):
          <input
            type="number"
            value={cookTime}
            onChange={(e) => setCookTime(parseInt(e.target.value))}
            className="border w-3/4 ml-1"
          />
        </label>
      </div>
      <label className="block mt-2">
        Rating (0-5):
        <input
          type="number"
          step="0.5"
          min="0"
          max="5"
          value={rating}
          onChange={(e) =>
            setRating((Math.round(parseFloat(e.target.value)) * 2) / 2)
          }
          className="border w-full p-1"
        />
      </label>
      <label className="block mt-2 flex items-center p-1">
        Have Cooked:
        <input
          type="checkbox"
          checked={haveCooked}
          onChange={() => setHaveCooked(!haveCooked)}
          className="ml-2"
        />
      </label>
      {/* <ImageUpload setFile={setFile} file={file} /> */}
      <label className="block mt-2">
        Image URL:
        <input
          value={imgURL}
          onChange={(e) => setImgURL(e.target.value)}
          className="border w-full p-1"
          placeholder="https://example.com/image.jpg"
        />
      </label>
      <div className="mt-4 flex justify-between">
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-400 text-white px-3 py-1 rounded-md"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-green-500 text-white px-3 py-1 rounded-md"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
}
