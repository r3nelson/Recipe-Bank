import { useState } from "react";
import { Recipe, Ingredient } from "../types/recipe";
import ImageUpload from "./ImageUpload";
import Required from "./Required";

type AddRecipeFormProps = {
  onSubmit: (recipe: Recipe) => void;
  onCancel: () => void;
  //   UploadImage: () => void;
};

export default function AddRecipeForm({
  onSubmit,
  onCancel,
}: AddRecipeFormProps) {
  const [name, setName] = useState("");
  const [haveCooked, setHaveCooked] = useState(false);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [newIngredient, setNewIngredient] = useState("");
  const [directions, setDirections] = useState<string[]>([]);
  const [newDirection, setNewDirection] = useState("");
  const [quantityAndType, setQuantityAndType] = useState("");
  const [prepTime, setPrepTime] = useState(0);
  const [cookTime, setCookTime] = useState(0);
  const [rating, setRating] = useState(0);
  const [file, setFile] = useState<File | null>(null);

  function handleAddIngredient() {
    if (newIngredient.trim() !== "") {
      setIngredients([...ingredients, { nameAndQuantity: newIngredient }]);
      setNewIngredient("");
    }
  }

  function handleAddDirection() {
    if (newDirection.trim() !== "") {
      setDirections([...directions, newDirection]);
      setNewDirection("");
    }
  }

  async function handleUploadImage() {
    let uploadedImageUrl = "";

    // Upload image if a file is selected
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch("http://0.0.0.0:8000/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Upload failed!");
        }

        const data = await response.json();
        uploadedImageUrl = `images/${data.filename}`;
        return uploadedImageUrl;
      } catch (error) {
        console.error("Upload error:", error);
        return uploadedImageUrl;
      }
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const uploadedImageUrl = await handleUploadImage();

    const newRecipe: Recipe = {
      id: Date.now(), // Temporary unique ID
      name,
      haveCooked,
      ingredients,
      directions,
      quantityAndType,
      prepTime,
      cookTime,
      rating,
      imgURL: uploadedImageUrl,
    };

    if (!newRecipe.ingredients || !newRecipe.directions) return;

    onSubmit(newRecipe);
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
            <li key={index}>{ing.nameAndQuantity}</li>
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
          onChange={(e) => setRating(parseFloat(e.target.value))}
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
      <ImageUpload setFile={setFile} file={file} />
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
