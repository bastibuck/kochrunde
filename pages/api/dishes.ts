import type { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../queries/client";
import { dishesQuery, DishesResult } from "../../queries/dish";

const dishesHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<DishesResult>
) => {
  const dishes = await client.fetch(dishesQuery, {
    search: req.query.search || "",
  });

  res.status(200).json(dishes);
};

export default dishesHandler;
