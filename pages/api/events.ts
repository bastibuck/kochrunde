import type { NextApiRequest, NextApiResponse } from "next";
import sanityClient from "@sanity/client";

import type { Cook } from "../../types/cook";

export type EventsResult = {
  _id: string;
  date: string;
  cook: Cook;
}[];

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<EventsResult>
) {
  const client = sanityClient({
    projectId: process.env.SANITY_PROJECT_ID,
    dataset: process.env.SANITY_DATASET,
    apiVersion: "2021-10-23",
    token: process.env.SANITY_TOKEN,
    useCdn: false, // can not be true with private data
  });

  const query =
    '*[_type == "event"]{_id,"cook":cook->{name},date} | order(date desc)';

  const events = await client.fetch<EventsResult>(query);

  res.status(200).json(events);
}
