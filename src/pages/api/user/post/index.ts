import type { NextApiRequest, NextApiResponse } from "next";
import { client } from "@/lib/mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { name, email, image } = req.body

    const mc = await client()
    await mc.db('sympto').collection("users").insertOne({
      name: name,
      email: email,
      image: image,
      doctors: []
    })
    await mc.close()
    res.status(200).json({
      "message": "Successful!"
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

