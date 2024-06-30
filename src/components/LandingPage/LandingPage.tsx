import React, { useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import FeatureCard from "../FeatureCard/FeatureCard";

import Aos from "aos";
import "aos/dist/aos.css";

function LandingPage() {
  useEffect(() => {
    Aos.init({ duration: 550 });
  }, []);
  return (
    <>
      <div className="space-y-5">
        <div className="landing-page-wrapper grid grid-cols-1 md:grid-cols-2">
          <div className="landing-page-left h-full md:h-[70vh] pt-14">
            <div className="text-[54px] font-bold mt-10" data-aos="fade-right">
              Decoding Wellness with{" "}
              <span className="text-[54px] font-bold text-gradient">
                SymptΩ
              </span>
            </div>
            <div className="text-[18px] font-weight-6800 mt-6" data-aos="fade-right">Predictive symptom analysis for personalized health recommendations. Find relevant specialists for tailored care. Your health, our priority</div>
            <Button
              onClick={() => {
                const scrollToSymptoms = document.querySelector("#symptoms")
                scrollToSymptoms?.scrollIntoView({
                  behavior: "smooth"
                })
              }}
              className="mt-5 text-2xl h-14 px-5" data-aos="fade-right">Get Started</Button>
          </div>

          <div className="hidden md:block w-full landingpage-right">
            <div className="relative w-full h-full" data-aos="fade-left">
              <Image
                src="/hero.png"
                alt="Doctor"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
        <div>
          <FeatureCard />
        </div>
      </div>
    </>
  );
}

export default LandingPage;
