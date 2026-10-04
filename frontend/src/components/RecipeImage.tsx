type RecipeImageProps = {
  imgURL?: string;
};

export default function RecipeImage({ imgURL }: RecipeImageProps) {
  return <img src={imgURL} alt="" />;
}
