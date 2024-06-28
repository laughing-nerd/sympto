import React from "react";
import Typewriter from "typewriter-effect";

function TypeWritter() {
  return (
    <>
      <Typewriter
        options={{
          loop: false,
        }}
        onInit={(typewriter) => {
          typewriter
            .typeString("Choose the symptoms or issues you're experiencing...")
            .typeString("and we'll work together to address them")
            .callFunction(() => {
              console.log("String typed out!");
            })
            .start();
        }}
      />
    </>
  );
}

export default TypeWritter;
