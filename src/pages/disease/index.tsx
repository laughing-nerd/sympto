import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGetPrediction } from "@/hooks/useGetPrediction";
import { useRouter } from "next/router";
import { Activity, Cross, Loader2, Pill } from "lucide-react";
import { Button } from "@/components/ui/button";
import Loader from "@/loader/Loader";

function DiseasePage() {

  const { query, push } = useRouter()
  const { data, isPending, isSuccess } = useGetPrediction(query.d as string)
  if (isPending) <Loader2 className="animate-spin" />

  return (
    <div className="py-10 space-y-10">
      <div className="font-bold text-2xl text-center">
        You might have the following disease(s)
      </div>

      {
        isPending
          ? <div className="w-full h-screen flex justify-center mt-5"><Loader /></div>
          : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center gap-7">
            {data?.map((disease: any, index: number) => (
              <Card key={index} className="py-5 relative min-h-[55vh]">

                {index === 0 && <div className="bg-primary w-fit rounded-full p-1 absolute -top-2 -right-2">
                  <Activity size={30} color="black" />
                </div>
                }
                {index === 1 && <div className="bg-primary w-fit rounded-full p-1 absolute -top-2 -right-2">
                  <Cross size={30} color="black" />
                </div>
                }
                {index === 2 && <div className="bg-primary w-fit rounded-full p-1 absolute -top-2 -right-2">
                  <Pill size={30} color="black" />
                </div>
                }

                <CardHeader className="space-y-3">
                  <CardTitle className="flex items-center justify-between">
                    {disease.result}

                  </CardTitle>
                  <CardDescription className="text-justify">
                    {disease.desc}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-10">

                  <div>
                    <p>Recommended specialist</p>
                    <p className="text-2xl font-bold">{disease.Doctor}</p>
                  </div>

                  <div>
                    <p>Diets prescribed</p>
                    <p className="text-xl font-semibold">{disease.Dietsprescribed}</p>
                  </div>

                </CardContent>
                <CardFooter className="w-full">
                  <Button className="w-full" onClick={() => push(`/doctors?d=${disease.Doctor}`)}>Check for nearby specialists</Button>
                </CardFooter>
              </Card>

            ))}
          </div>
      }
    </div>

  );
}

export default DiseasePage;
