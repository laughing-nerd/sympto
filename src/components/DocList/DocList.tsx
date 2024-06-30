import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import { useGetDoctor } from "@/hooks/useGetDoctors";
import Loader from "@/loader/Loader";
import axios from "axios";
import { useSession } from "next-auth/react";
import { Rating } from "../Star/Star";

export default function DocList({ doctor, location }: {
  doctor: string
  location: number[]
}) {
  const { data, isPending } = useGetDoctor({
    Doc: doctor,
    Lat: location[0],
    Log: location[1],
  });
  const { data: user } = useSession()

  return (
    <div className="space-y-3 w-full h-screen gap-4 mt-5 mb-5 scrollbar scrollbar-w-0 overflow-y-auto">
      {
        isPending ? <Loader /> : <>
          {data?.map((item: any, index: number) => (
            <Card
              key={index}
              className="w-full min-h-[180px] h-auto shadow-sm hover:shadow-md transition-all hover:bg-primary/20"
            >
              <CardHeader>
                <CardTitle className="font-2xl font-bold text-lg">
                  {item.doctorName}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-md">
                  {item.category}
                </CardDescription>
                <p className="text-primary text-md">{item.address}</p>
                <Rating rating={item.stars} />
              </CardContent>
              <CardFooter>
                <Link target="_blank" href={item.googleUrl ? item.googleUrl : ""}>
                  <Button onClick={async () => {

                    await axios.post("http://localhost:3000/api/user/update", {
                      email: user?.user?.email,
                      doctor: item,
                    })

                    if (item.googleUrl && window) {
                      window.open(item.googleUrl)
                    }
                  }}>Check out this doctor</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </>
      }
    </div>
  );
}
