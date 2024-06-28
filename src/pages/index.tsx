import LandingPage from "@/components/LandingPage/LandingPage";
import { SelectSymptoms } from "@/components/Symptoms/SelectSymptoms";
import TypeWritterEffect from "@/components/Symptoms/TypewriterEffect";
import { useState, useEffect } from "react";

export default function Home() {
  const [lattitude, setLattitude] = useState("");
  const [longitude, setLongitude] = useState("");
  function getCurrentLocation() {
    try {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          setLattitude(String(position.coords.latitude));
          console.log(lattitude);

          setLongitude(String(position.coords.longitude));
          console.log(longitude);
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
  getCurrentLocation();

  return (
    <div className="px-3">
      <div className="h-full md:h-screen">
        <LandingPage />
      </div>

      <div id="symptoms" className="h-screen pt-10">
        <div className="w-full flex flex-row justify-center items-center">
          <div className="w-full text-primary text-xl font-bold md:w-[500px] rounded-md h-[150px] flex flex-col justify-center items-center">
            <TypeWritterEffect />
          </div>
        </div>

        <div className="w-full flex flex-row justify-center items-center">
          <div className="w-full flex flex-col justify-center items-center mb-4">
            <SelectSymptoms lat={setLattitude} long={setLongitude} />
          </div>
        </div>
      </div>
    </div>
  );
}

