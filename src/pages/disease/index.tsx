import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";
import { Loader2Icon } from "lucide-react";

function DiseasePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(true);

  // const query =

  const [responseData, setResponseData] = React.useState([]);
  const query = decodeURIComponent(router.query.query as string);
  console.log(query);
  const handlePostRequest = async () => {
    try {
      console.log("Sending request....");

      const response = await fetch(
        "https://diagnox-model-api.onrender.com/predict",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Additional headers if needed
          },
          body: JSON.stringify({
            symptoms: query,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setResponseData(data);
      console.log(responseData); // Logging the received data
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    console.log("Inside useEffect...");
    handlePostRequest();
  }, []);
  return (
    <>
      {responseData.length > 0 ? (
        <>
          {responseData.map((i, index) => {

            return (
              <Card className="w-full mb-4 min-h-[180px] h-auto shadow-sm hover:shadow-md transition-all">
                <CardHeader>
                  <CardTitle className="text-xl text-primary font-bold">
                    {/* {i.dietsPrescribed} */}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-md foont-light">
                    Docrors Name
                  </CardDescription>
                </CardContent>
                <CardFooter className="text-lg font-regular">
                  Diets Prescribed
                </CardFooter>
                <Button className="mx-5 mb-4" variant="outline">
                  Check
                </Button>
              </Card>
            );
          })}
        </>
      ) : (
        <Loader2Icon className="animate-spin" />
      )}
    </>
  );
}

export default DiseasePage;
