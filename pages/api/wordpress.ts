import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = await fetch(
    `${process.env.WEBSITE_URL}/wp-json/wp/v2/posts?filter[posts_per_page]=1`
  );

  console.log({ data });
  console.log({ body: data.body });

  res.status(200).json(data.body);
}
