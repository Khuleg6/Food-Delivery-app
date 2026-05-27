"use client";
import Link from "next/link";
import React, { useState } from "react";
import { OTPInput, REGEXP_ONLY_DIGITS, SlotProps } from "input-otp";
import axios from "axios";
import { SubmitButton, TextField } from "@/app/component/textfield";
import { useSearchParams } from "next/navigation";
import { useUser } from "@/app/user-provider";

export default function OTPPage() {
  const { setAccessToken } = useUser();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmitForm = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post("/api/auth/otp", {
        email,
        otp: Number(otp),
      })
      .then((res) => {
        alert(res.data.message);
        setLoading(false);
        setAccessToken(res.data.accessToken);
      })
      .catch(({ response }) => {
        alert(response.message);
      });
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

        <div className="">
          <p className="text-2xl font-semibold">Log in</p>
          <p className="text-[16px] font-normal text-[#71717A]">
            Log in to enjoy your favorite dishes.
          </p>
        </div>
        <form className="flex flex-col gap-6" onSubmit={handleSubmitForm}>
          <TextField
            placeholder="Enter your email address"
            value={email}
            type="email"
            id=""
            required
            readOnly
          />

          <div className="space-y-3 flex flex-col">
            <label className="text-sm font-medium text-zinc-700">
              Enter 4-Digit Code
            </label>

            <OTPInput
              maxLength={4}
              value={otp}
              onChange={setOtp}
              pattern={REGEXP_ONLY_DIGITS}
              render={({ slots }) => (
                <div className="flex w-full gap-3">
                  {slots.map((slot: SlotProps, idx: number) => (
                    <div
                      key={idx}
                      className={`w-10 h-13 text-xl font-bold border-2 rounded-xl flex items-center justify-center transition-all bg-white text-zinc-950
                        ${slot.isActive ? "border-black ring-2 ring-zinc-100" : "border-zinc-200"}
                      `}
                    >
                      {slot.char}
                      {slot.hasFakeCaret && (
                        <div className="w-0.5 h-6 bg-black animate-caret-blink" />
                      )}
                    </div>
                  ))}
                </div>
              )}
            />
          </div>
          <SubmitButton loading={loading}>{"Login"}</SubmitButton>
        </form>

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
