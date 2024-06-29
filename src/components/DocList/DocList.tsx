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

import { Loader2 } from "lucide-react";
import { useGetDoctor } from "@/hooks/useGetDoctors";
import Loader from "@/loader/Loader";

export default function DocList({ doctor, location }: {
  doctor: string
  location: number[]
}) {
  const { data, isPending } = useGetDoctor({
    Doc: doctor,
    Lat: location[0],
    Log: location[1],
  });

  if (isPending) return <Loader2 className="animate-spin" />

  return (
    <div className="space-y-3 w-full h-screen gap-4 mt-5 mb-5 scrollbar scrollbar-w-0 overflow-y-auto">
      {
        isPending ? <Loader /> : <>
          {data?.map((item: any, index: number) => (
            <Card
              key={index}
              className="w-full min-h-[180px] h-auto shadow-sm hover:shadow-md transition-all"
            >
              <CardHeader>
                <CardTitle className="font-3xl font-bold text-lg">
                  {item.doctorName}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-md">
                  {item.category}
                </CardDescription>
                <p className="text-primary text-md">{item.address}</p>
                <span className="flex flex-row items-centre gap-2 fill-current text-yellow-500">
                  {"★".repeat(Math.round(item.stars))}
                </span>
              </CardContent>
              <CardFooter>
                <Link target="_blank" href={item.googleUrl ? item.googleUrl : ""}>
                  <Button>View On Google Maps</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </>
      }
    </div>
  );
}
