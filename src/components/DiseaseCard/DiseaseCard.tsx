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

function DeseaseCard() {
  return (
    <>
      <Card className="w-full mb-4 min-h-[180px] h-auto shadow-sm hover:shadow-md transition-all">
        <CardHeader>
          <CardTitle className="text-xl text-primary font-bold">Diseases Name</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-md foont-light">Docrors Name</CardDescription>
        </CardContent>
        <CardFooter className="text-lg font-regular">
          Diets Prescribed
        </CardFooter>
        <Button className="mx-5 mb-4" variant="outline">
          Check
        </Button>
      </Card>
    </>
  );
}

export default DeseaseCard;
