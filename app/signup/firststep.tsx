import Link from "next/link";
import { TextField } from "../component/textfield";
import { useState } from "react";
import { error } from "node:console";
import { on } from "node:events";

interface SecondstepProps {
  handleNextStep: () => void;
  handlePreviusStep: () => void;
}

// 2. Компонентдоо төрлийг нь зааж, props-оо бутлаж (destructure) авна
export const Firststep = ({
  handleNextStep,
  handlePreviusStep,
}: SecondstepProps) => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const isEmailValid = (value: string) => {
    setEmail(value); // бичиж байгаа утгыг хадгална

    // Жишээ нь: Хэрэв хоосон байвал эсвэл "za" гэж бичвэл алдаа заана
    if (value.trim() === "") {
      setEmailError("Email is required");
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) {
      setEmailError("This email is not allowed");
    } else {
      setEmailError(""); // Алдаагүй бол хоосон болгоно
    }
  };
  const onSubmit = () => {
    if (email.trim() === "") {
      setEmailError("Email is required");
      return; // Алдаатай бол дараагийн алхам руу явуулахгүй
    }

    if (!emailError) {
      handleNextStep(); // Алдаагүй бол дараагийн алхам руу шилжинэ
    }
  };

  return (
    <div className="flex gap-15 container">
      <div className="space-y-6 flex justify-center flex-col">
        <Link href={"/"}>
          {" "}
          <svg
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 0.5H30C33.0376 0.5 35.5 2.96243 35.5 6V30C35.5 33.0376 33.0376 35.5 30 35.5H6C2.96243 35.5 0.5 33.0376 0.5 30V6C0.5 2.96243 2.96243 0.5 6 0.5Z"
              fill="white"
            />
            <path
              d="M6 0.5H30C33.0376 0.5 35.5 2.96243 35.5 6V30C35.5 33.0376 33.0376 35.5 30 35.5H6C2.96243 35.5 0.5 33.0376 0.5 30V6C0.5 2.96243 2.96243 0.5 6 0.5Z"
              stroke="#E4E4E7"
            />
            <path
              d="M20 22L16 18L20 14"
              stroke="#18181B"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>

        <div>
          <p className="text-2xl font-semibold">Create your account</p>
          <p className="text-[16px] font-normal text-[#71717A]">
            Sign up to explore your favorite dishes.
          </p>
        </div>
        <div>
          <TextField
            placeholder="Enter your email address"
            error={emailError}
            type="email"
            onChange={(e) => {
              isEmailValid(e.target.value);
            }}
          />
        </div>
        <div>
          <button
            onClick={onSubmit}
            className="w-full bg-[#D1D1D1] text-white py-2 rounded-md"
          >
            Let's Go
          </button>
        </div>
        <div className="flex justify-center gap-1">
          <p className="text-[#71717A] text-[16px]">Already have an account?</p>
          <p className="text-[#2563EB]">Log in </p>
        </div>
      </div>
      <div>
        <img src="/frame.png" className="w-full" alt="" />
      </div>
    </div>
  );
};
