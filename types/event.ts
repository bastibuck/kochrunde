import { Cook } from "./cook";
import { Dish } from "./dish";

export type Event = {
  cook: Cook;
  date: string; // DateTime in UTC
  dishes: Dish[];
};
