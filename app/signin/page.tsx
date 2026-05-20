import Link from "next/link";
import React from "react";
import { TextField } from "../component/textfield";

export default function Home() {
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
          <p className="text-2xl font-semibold">Log in</p>
          <p className="text-[16px] font-normal text-[#71717A]">
            Log in to enjoy your favorite dishes.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <TextField placeholder="Enter your email address" type="email" />
          <TextField placeholder="Enter your password" type="password" />
          <p className="underline hover:cursor-pointer">Forgot password ?</p>
        </div>
        <div>
          <button className="w-full bg-[#D1D1D1] text-white py-2 rounded-md">
            Let's Go
          </button>
        </div>
        <div className="flex justify-center gap-1">
          <p className="text-[#71717A] text-[16px]">Don't have an account?</p>
          <p className="text-[#2563EB]">Sign up </p>
        </div>
      </div>
      <div>
        <img src="/frame.png" className="w-full" alt="" />
      </div>
    </div>
  );
}
