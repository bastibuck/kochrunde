import type { NextApiRequest, NextApiResponse } from "next";
import sanityClient from "@sanity/client";

import type { Cook } from "../../types/cook";
import type { Dish } from "../../types/dish";

export type EventResult = {
  _id: string;
  date: string;
  cook: Cook;
  dishes: Dish[];
} | null;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<EventResult>
) {
  const client = sanityClient({
    projectId: process.env.SANITY_PROJECT_ID,
    dataset: process.env.SANITY_DATASET,
    apiVersion: "2021-10-23",
    token: process.env.SANITY_TOKEN,
    useCdn: false, // can not be true with private data
  });

  const query =
    '*[_type == "event" && _id==$id]{_id,"cook":cook->{name},"dishes":coalesce(dishes[]->{name,course,"image":image.asset->url,recipe}, []),date}[0]';
  const params = {
    id: req.query.eventid,
  };

  const event = await client.fetch<EventResult>(query, params);

  // TODO: sort dishes based on type
  res.status(200).json(event);
}
