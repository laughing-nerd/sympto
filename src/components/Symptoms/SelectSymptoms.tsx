import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function SelectSymptoms({ symptomsInfo, selectedSymptoms, setSelectedSymptoms }: {
  symptomsInfo: { name: string, description: string, dangerLevel: string }[]
  selectedSymptoms: string[]
  setSelectedSymptoms: (symptoms: string[]) => void
}) {
  const dangerLevels = {
    "low": "text-green-600",
    "medium": "text-yellow-600",
    "high": "text-red-600"
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 h-full md:h-[75%] overflow-y-auto scrollbar">

      {symptomsInfo.map((symptom, index) => (
        <Card
          key={index}
          className={`${selectedSymptoms.includes(symptom.name) && "bg-primary/20"} max-h-44 min-h-44 cursor-pointer hover:bg-primary/20 transition-all flex items-start justify-start`}
          onClick={() => {
            if (selectedSymptoms.includes(symptom.name)) {
              setSelectedSymptoms(selectedSymptoms.filter((selectedSymptom) => selectedSymptom !== symptom.name))
              return
            }
            setSelectedSymptoms([...selectedSymptoms, symptom.name])
          }}>


          <div>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">

                <div className="rounded-full w-4 h-4 border border-primary flex items-center justify-center">
                  {selectedSymptoms.includes(symptom.name) && <div className="w-2 h-2 bg-primary rounded-full" />}
                </div>

                <div>
                  {symptom.name}
                </div>
              </CardTitle>
              <CardDescription>{symptom.description}</CardDescription>
            </CardHeader>
            <CardContent>
              {/* <p>Potential Risk: */}
              {/* @ts-ignore */}
              <span className={`${dangerLevels[symptom.dangerLevel]} font-bold`}
              >
                {symptom.dangerLevel} risk
              </span>
            </CardContent>
          </div>
        </Card>
      ))}

    </div>

  );
}
