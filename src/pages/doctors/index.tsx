import React from "react";
import DocList from "@/components/DocList/DocList";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

const Map = dynamic(() => import("@/components/Map/Map"), {
  ssr: false,
});

export default function Doctors() {

  const { query } = useRouter();
  const [location, setLocation] = React.useState<number[] | null>(null);

  React.useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          const { latitude, longitude } = coords;
          setLocation([latitude, longitude]);
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      console.error("Geolocation is not available");
    }
  }, []);

  return (
    <div className="w-full flex justify-between gap-5 h-screen overflow-y-hidden">
      {location && location.length > 0 && (
        <>
          <Map location={location} />
          <DocList doctor={query.d as string} location={location} />
        </>
      )
      }
    </div >
  );
}

