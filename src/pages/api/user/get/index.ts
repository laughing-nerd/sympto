import type { NextApiRequest, NextApiResponse } from "next";
import { client } from "@/lib/mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { email } = req.query;
    const mc = await client();
    const db = mc.db("sympto")
    const userDetails = db.collection("users").findOne({ email: email });
    mc.close()
    res.status(200).json(userDetails);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

