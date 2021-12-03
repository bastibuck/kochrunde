import type { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../queries/client";
import { dishRatingQuery, DishRatingResult } from "../../queries/dish";

const ratingHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<DishRatingResult>
) => {
  const rating = await client.fetch<DishRatingResult>(dishRatingQuery, {
    id: req.query.id,
  });

  res.status(200).json(rating);
};

export default ratingHandler;
