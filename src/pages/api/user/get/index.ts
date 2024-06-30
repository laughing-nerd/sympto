import type { NextApiRequest, NextApiResponse } from "next";
import { client } from "@/lib/mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { email } = req.query;
    const mc = await client();
    const userDetails = await mc.db("sympto").collection("users").findOne({ email: email });
    await mc.close()
    res.status(201).json(userDetails);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
