import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export const useGetDoctor = (data: {
  Doc: string
  Lat: number
  Log: number
}) => {
  return useQuery({
    queryKey: ["docs"],
    queryFn: async () => {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/Coordinates`, {
        Doc: data.Doc,
        Lat: data.Lat,
        Log: data.Log
      })
      return res.data
    }
  })
}
