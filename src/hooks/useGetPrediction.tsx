import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export const useGetPrediction = (data: string) => {
  return useQuery({
    queryKey: ["prediction"],
    queryFn: async () => {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_MODEL_API}/predict`, {
        symptoms: data
      })
      return res.data
    },
  })
}
