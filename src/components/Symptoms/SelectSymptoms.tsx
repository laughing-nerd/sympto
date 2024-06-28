import * as React from "react";
import { Check, ChevronsUpDown, XCircleIcon, XIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { symptoms } from "@/data/symptoms";
import Link from "next/link";

export function SelectSymptoms({lat, long}) {
  const [open, setOpen] = React.useState(false);
  const [symptomsPresent, setSymptomsPresent] = React.useState<string[]>([]);
  const query = symptomsPresent.join(",")

  return (
    <div className="pt-5 w-full h-screen">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            Select a symptom
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder="Search symptom..." />
            <CommandEmpty>No symptom found.</CommandEmpty>
            <CommandGroup className="max-h-52 overflow-y-auto">
              {symptoms.map((symptom, index) => (
                <CommandItem
                  key={index}
                  value={symptom}
                  onSelect={(e) => {
                    if (!symptomsPresent.includes(e)) {
                      setSymptomsPresent((prev) => [e, ...prev]);
                    }
                  }}
                >
                  {symptom}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3 mt-5 h-[30vh]">
        {symptomsPresent.map((ele: string, index: number) => (
          <div
            key={index}
            className="flex items-center justify-between border h-10 px-3 py-2 rounded-md"
          >
            <p>{ele}</p>
            <XCircleIcon
              className="cursor-pointer"
              color="#ff0000"
              onClick={() => {
                if (symptomsPresent.includes(ele)) {
                  setSymptomsPresent(
                    symptomsPresent.filter((item) => item != ele)
                  );
                }
              }}
            />
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        {symptomsPresent.length >= 3
          ?
          <div className="flex items-start">
            <p className="text-2xl font-bold border p-5 rounded-md">You can now start diagnosing by <Button><Link href={`/disease?query=${encodeURIComponent(query)}`}>Clicking Here</Link></Button></p>
            <Image src="/unlocked.png" alt="unlocked" width={250} height={300} />
          </div>
          : < div className="flex items-start">
            <p className="text-2xl font-bold border p-5 rounded-md">Select at least 3 symptoms</p>
            <Image src="/locked.png" alt="locked" width={250} height={300} />
          </div>
        }
      </div>
    </div >
  );
}
