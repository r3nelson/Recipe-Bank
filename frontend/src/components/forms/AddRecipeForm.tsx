import { useState } from "react";
import { Recipe } from "../../types/recipe";
import Required from "../Required";

type AddRecipeFormProps = {
  onSubmit: (recipe: Recipe, file: File | null) => Promise<void>;
  onCancel: () => void;
};

export default function AddRecipeForm({
  onSubmit,
  onCancel,
}: AddRecipeFormProps) {
  const [name, setName] = useState("");
  const [haveCooked, setHaveCooked] = useState(false);
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [newIngredient, setNewIngredient] = useState("");
  const [directions, setDirections] = useState<string[]>([]);
  const [newDirection, setNewDirection] = useState("");
  const [quantityAndType, setQuantityAndType] = useState("");
  const [prepTime, setPrepTime] = useState(0);
  const [cookTime, setCookTime] = useState(0);
  const [rating, setRating] = useState(0);
  //   const [imgURL, setImgURL] = useState(""); // <-- just a URL now
  const [file, setFile] = useState<File | null>(null);

  function handleAddIngredient() {
    if (newIngredient.trim() !== "") {
      setIngredients([...ingredients, newIngredient]);
      setNewIngredient("");
    }
  }

  function handleAddDirection() {
    if (newDirection.trim() !== "") {
      setDirections([...directions, newDirection]);
      setNewDirection("");
    }
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const newRecipe: Recipe = {
      id: Date.now(), // This will be overwritten by server; placeholder for type
      name,
      haveCooked,
      ingredients,
      directions,
      quantityAndType,
      prepTime,
      cookTime,
      rating,
      imgURL: "", // backend will set based on file
    };

    if (!newRecipe.ingredients || !newRecipe.directions) return;

    // wait for sumission to complete before reload
    try {
      await onSubmit(newRecipe, file);
      window.location.reload();
    } catch (error) {
      console.error("Error submitting recipe:", error);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-5 shadow-md rounded-md w-96 border"
    >
      <h2 className="text-lg font-semibold mb-3">Add Recipe</h2>
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
      <label className="block mt-2">
        Ingredients:
        <Required />
        <div className="flex">
          <input
            value={newIngredient}
            placeholder="1/2 cup milk"
            onChange={(e) => setNewIngredient(e.target.value)}
            className="border w-full p-1"
          />
          <button
            type="button"
            onClick={handleAddIngredient}
            className="bg-blue-500 text-white px-2 ml-2"
          >
            Add
          </button>
        </div>
        <ul>
          {ingredients.map((ing, index) => (
            <li key={index}>{ing}</li>
          ))}
        </ul>
      </label>
      <label className="block mt-2">
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
      </label>
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
      <label className="block mt-2">
        Upload Image:
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="border w-full p-1"
        />
        {file && <p className="text-sm mt-1">Selected: {file.name}</p>}
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
          Submit
        </button>
      </div>
    </form>
  );
}
