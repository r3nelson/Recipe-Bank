export type Recipe = {
  id: number;
  name: string;
  haveCooked: boolean;
  ingredients: Ingredient[];
  directions: string[];
  quantity?: number;
  prepTime?: number;
  cookTime?: number;
  rating?: number | null;
};

export type Ingredient = {
  name: string;
  measurement_type:
    | ""
    | "cup"
    | "tbsp"
    | "tsp"
    | "g"
    | "kg"
    | "oz"
    | "lb"
    | "ml"
    | "l"
    | "pt"
    | "qt"
    | "gal"
    | "fl oz"
    | "mg";
  quantity: number;
};
