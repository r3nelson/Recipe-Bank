import { useState } from "react";
import { getImageUrl } from "../../api/recipeAPI";

type RecipeImageProps = {
  filename?: string; // changed from imgURL to filename
  onError: () => void;
};

export default function RecipeImage({ filename, onError }: RecipeImageProps) {
  const [hasError, setHasError] = useState(false);

  // If a filename is provided, generate the full URL
  const imgURL = filename ? getImageUrl(filename) : undefined;

  function handleError() {
    setHasError(true);
    onError();
  }

  if (!imgURL || hasError) {
    console.log("no image url");
    return null;
  }

  return (
    <img
      src={imgURL}
      alt="Recipe"
      className="rounded-md w-full h-auto"
      onError={handleError}
    />
  );
}
