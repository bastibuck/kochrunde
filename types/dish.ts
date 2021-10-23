export type Dish = {
  course: "starter" | "main" | "dessert";
  name: string;
  image: string | null; // URL
  recipe: string | null;
};
