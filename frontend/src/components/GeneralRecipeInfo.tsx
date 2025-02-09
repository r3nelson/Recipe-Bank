type GeneralRecipeInfoProps = {
  name: string;
  quantity?: number;
  prepTime?: number;
  cookTime?: number;
};

export default function GeneralRecipeInfo({
  name,
  quantity,
  prepTime,
  cookTime,
}: GeneralRecipeInfoProps) {
  return (
    <>
      <h2 className="text-xl font-bold">{name}</h2>
      <p>
        Quantity: {quantity} | Prep Time: {prepTime} min | Cook Time: {cookTime}{" "}
        min
      </p>
    </>
  );
}
