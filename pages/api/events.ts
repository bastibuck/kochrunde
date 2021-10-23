import type { NextApiRequest, NextApiResponse } from "next";
import sanityClient from "@sanity/client";

import type { Event } from "../../types/event";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<Event[]>
) {
  const client = sanityClient({
    projectId: process.env.SANITY_PROJECT_ID,
    dataset: process.env.SANITY_DATASET,
    apiVersion: "2021-10-23",
    token: process.env.SANITY_TOKEN,
    useCdn: false, // can not be true with private data
  });

  const query =
    '*[_type == "event"]{"cook":cook->{name},"dishes":dishes[]->{name,course,"image":image.asset->url,recipe},date} | order(date desc)';

  const events = await client.fetch<Event[]>(query);

  res.status(200).json(events);
}
