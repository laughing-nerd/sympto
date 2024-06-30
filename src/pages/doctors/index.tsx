import React from "react";
import DocList from "@/components/DocList/DocList";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

const Map = dynamic(() => import("@/components/Map/Map"), {
  ssr: false,
});

export default function Doctors() {

  const { query } = useRouter();

  if (!query.d) return

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
    <>
      {location && location.length > 0 && (
        <div className="w-full flex flex-col md:flex-row justify-between gap-5 h-screen overflow-y-hidden">
          <div className="w-full">
            <Map location={location} />
          </div>
          <DocList doctor={query.d as string} location={location} />
        </div>
      )
      }
    </>
  );
}

