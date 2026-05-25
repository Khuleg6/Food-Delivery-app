"use client";
import { useState } from "react";
import { TextField } from "../../component/textfield";
import { Secondstep } from "./secondstep";
import { Firststep } from "./firststep";

export default function Home() {
  const [step, setStep] = useState(0);
  const steps = [Firststep, Secondstep];
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    confirmpass: "",
  });

  const handleNextStep = () => {
    setStep(step + 1);
  };
  const handlePreviusStep = () => {
    setStep(step - 1);
  };
  const StepForm = steps[step];

  return (
    <div>
      {StepForm && (
        <StepForm
          handleNextStep={handleNextStep}
          handlePreviusStep={handlePreviusStep}
        />
      )}
    </div>
  );
}
