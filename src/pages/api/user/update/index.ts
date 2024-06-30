import type { NextApiRequest, NextApiResponse } from "next";
import { client } from "@/lib/mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {

    // Only update the doctors
    // Bad design, I know
    // My brain is not braining
    const { email, doctor } = req.body
    const mc = await client()

    const filter = { email: email }
    const update = {
      $push: { doctors: doctor }
    }
    await mc.db('sympto').collection("users").updateOne(filter, update)
    await mc.close()

    res.status(200).json({
      "message": "Successful!"
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
