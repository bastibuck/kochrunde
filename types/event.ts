import { Cook } from "./cook";
import { Dish } from "./dish";

export type Event = {
  _id: string;
  cook: Cook;
  date: string; // DateTime in UTC
  dishes: Dish[];
};
