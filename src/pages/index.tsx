import React from "react";
import LandingPage from "@/components/LandingPage/LandingPage";
import { SelectSymptoms } from "@/components/Symptoms/SelectSymptoms";
import { symptomsInfo } from "@/data/symptoms";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";

export default function Home() {

  const [symptoms, setSymptoms] = React.useState(symptomsInfo)
  const [selectedSymptoms, setSelectedSymptoms] = React.useState<string[]>([])
  const { push } = useRouter()

  return (
    <div className="px-3">

      <div className="h-full md:h-screen">
        <LandingPage />
      </div>

      <div className="h-screen space-y-10 py-10" id="symptoms">
        <Input
          placeholder="🔎 Search for a symptom. Select at least 2 to proceed"
          onChange={(e) => {
            const filteredSymptoms = symptomsInfo.filter((symptom) => symptom.name.toLowerCase().includes(e.target.value.toLowerCase()))
            setSymptoms(filteredSymptoms)
          }}
        />
        <SelectSymptoms symptomsInfo={symptoms} selectedSymptoms={selectedSymptoms} setSelectedSymptoms={setSelectedSymptoms} />

        <div className="w-full text-center">
          <Button
            disabled={selectedSymptoms.length < 2}
            className="text-xl mt-5 disabled:cursor-no-drop"
            onClick={() => {
              push(`/disease?d=${selectedSymptoms.join(",")}`)
            }}>
            Predict Now!
          </Button>
        </div>
      </div>

    </div >
  );
}
