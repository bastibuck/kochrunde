export type DishesResult = {
  _id: string;
  name: string;
  course: "starter" | "main" | "dessert";
  image: string | null;
  imageBlurred: string | null;
  recipes: string[];
  tags: string[];
  veggie: boolean;
}[];
export const dishesQuery = `
*[
    _type == "dish"&& !(_id in path("drafts.**")) &&
    (
        name                                match "*"+$search+"*" ||
        tags[]->name                        match "*"+$search+"*" ||
        (tags[]->synonym[])[defined(@)]     match "*"+$search+"*"
    )
] {
  _id,
  name,
  course,
  "image": image.asset->url,
  "imageBlurred": image.asset->metadata.lqip,
  "recipes": coalesce(recipes,[]),
  "tags": coalesce(tags[]->name,[]),
  veggie,
}
`;
