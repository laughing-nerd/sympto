import DocList from "@/components/DocList/DocList";
// import MyComponent from "@/components/DocList/DocList";
import dynamic from "next/dynamic";

// import Map from "@/components/Map/Map";
const Map = dynamic(() => import("@/components/Map/Map"), {
  ssr: false,
});
export default function doctors() {
  return (
    <div className="map-component-wrapper w-full flex justify-between gap-5 min-h-[100vh]">
      <Map />
      <div className="doctors-list">
        {/* <DocList /> */}
      </div>
    </div>
  );
}
