export type EventsResult = {
  _id: string;
  date: string;
  cook: {
    name: string;
  };
}[];
export const eventsQuery =
  '*[_type == "event" && !(_id in path("drafts.**"))]{_id,"cook":cook->{name},date} | order(date desc)';

export type EventResult = {
  _id: string;
  date: string;
  cook: {
    name: string;
  };
  dishes: {
    _id: string;
    course: "starter" | "main" | "dessert";
    name: string;
    image: string | null; // URL
    imageBlurred: string | null; // base64 dataUrl
    recipes: string[];
    rating: number[];
  }[];
};
export const eventQuery = `
  *[
    _type == "event" && _id==$id
  ] {
    _id,
    "cook": cook->{name},
    date,
    "dishes": coalesce(dishes[]->{
      _id,
      name,
      course,      
      "image": image.asset->url,
      "imageBlurred": image.asset->metadata.lqip,
      "recipes": coalesce(recipes, []),
      "tags": coalesce(tags[]->name, []),
      "rating": coalesce(rating, []),
    },
    []),
  }[0]
`;
