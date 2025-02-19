export type Recipe = {
  id: number;
  name: string;
  haveCooked: boolean;
  ingredients: Ingredient[];
  directions: string[];
  quantityAndType?: string;
  prepTime?: number;
  cookTime?: number;
  rating?: number;
  imgURL?: string;
};

export type Ingredient = {
  nameAndQuantity: string;
};
