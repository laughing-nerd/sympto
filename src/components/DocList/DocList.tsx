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
import Link from "next/link";

import axios from "axios";
import { Star } from "lucide-react";

export default function DocList(): JSX.Element {
  const [doctorsData, setDoctorsData] = React.useState<any[]>([]); // You might want to replace `any[]` with a more specific type

  useEffect(() => {
    const fetchDoctorsData = async () => {
      try {
        const response = await axios.get("/data.json");
        setDoctorsData(response.data); // Assuming your data is directly an array
        let firstDoctorAddress = response.data[0].address;
        console.log(firstDoctorAddress);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDoctorsData();
  }, []); // Empty dependency array means it runs only once after component mount

  return (
    <div className="flex flex-col w-full min-h-screen gap-4 mt-5 mb-5 scrollbar scrollbar-w-0">
      {doctorsData.map((item, index) => (
        <Card
          key={index} // Ensure to provide a unique key for each item in the list
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
    </div>
  );
}
