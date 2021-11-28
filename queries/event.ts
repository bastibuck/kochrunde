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
    course: "starter" | "main" | "dessert";
    name: string;
    image: string | null; // URL
    recipes: string[];
  }[];
};
export const eventQuery =
  '*[_type == "event" && _id==$id]{_id,"cook":cook->{name},"dishes":coalesce(dishes[]->{name,course,"image":image.asset->url,"recipes":coalesce(recipes,[]),  "tags": coalesce(tags[]->name,[])}, []),date}[0]';
