import type { Recipe } from "../types/recipe";
import { useState } from "react";

type UpdateRecipeFormProps = {
  recipe: Recipe;
  onUpdate: (updatedRecipe: Recipe) => void;
  onCancel: () => void;
};

export default function UpdateRecipeForm({
  recipe,
  onUpdate,
  onCancel,
}: UpdateRecipeFormProps) {
  const [name, setName] = useState(recipe.name);

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-5 shadow-md rounded-md w-96 border"
    >
      <h2 className="text-lg font-semibold mb-3">Add Recipe</h2>
      <label className="block">
        Name:
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border w-full p-1"
          required
        />
      </label>
      {/* <label className="block mt-2">
        Ingredients:
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
      </label>
      <label className="block mt-2">
        Ingredients:
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
      </label>
      <label className="block mt-2">
        Ingredients:
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
      <ImageUpload setFile={setFile} file={file} /> */}
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
