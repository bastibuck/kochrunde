import type { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../queries/client";

const setRatingHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<{ success: true }>
) => {
  await client
    .patch(req.query.id as string)
    .setIfMissing({ rating: [] })
    .append("rating", [parseInt(req.query.rating as string)])
    .commit();

  res.status(200).json({ success: true });
};

export default setRatingHandler;
