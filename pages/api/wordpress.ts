import type { NextApiRequest, NextApiResponse } from "next";

const TAG_ID = "109";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const page = req.query.page;
  const data = await fetch(
    `${process.env.WEBSITE_URL}/wp-json/wp/v2/posts?per_page=100&page=${page}`
  );

  res.status(200).json(data.body);
}
