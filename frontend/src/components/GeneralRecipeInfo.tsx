type GeneralRecipeInfoProps = {
  name: string;
  quantityAndType?: number;
  prepTime?: number;
  cookTime?: number;
};

export default function GeneralRecipeInfo({
  name,
  quantityAndType,
  prepTime,
  cookTime,
}: GeneralRecipeInfoProps) {
  //   let totalTime: number | null;
  //   if (prepTime && cookTime) {
  //     totalTime = prepTime + cookTime;
  //   } else {
  //     totalTime = null;
  //   }
  //   {totalTime ? `| Total Time ${totalTime} min` : ""}

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
