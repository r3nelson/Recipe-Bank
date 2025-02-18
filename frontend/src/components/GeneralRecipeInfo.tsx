type GeneralRecipeInfoProps = {
  name: string;
  quantityAndType?: string;
  prepTime?: number;
  cookTime?: number;
};

export default function GeneralRecipeInfo({
  name,
  quantityAndType,
  prepTime,
  cookTime,
}: GeneralRecipeInfoProps) {
  return (
    <>
      <h2 className="text-2xl font-bold">{name}</h2>
      <p>
        {quantityAndType} | prep time: {prepTime} min | cook time: {cookTime}{" "}
        min
      </p>
    </>
  );
}
