"use client";
import Link from "next/link";
import { useState } from "react";
import { SubmitButton, TextField } from "../../component/textfield";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";

export default function Home() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmitForm = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post("/api/auth", { email })
      .then((res) => {
        setLoading(false);
        alert(res.data.message);
        router.push(`/signin/otp?email=${email}`);
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

        <div>
          <p className="text-2xl font-semibold">Log in</p>
          <p className="text-[16px] font-normal text-[#71717A]">
            Log in to enjoy your favorite dishes.
          </p>
        </div>
        <form className="flex flex-col gap-4" onSubmit={handleSubmitForm}>
          <TextField
            name="email"
            placeholder="Enter your email address"
            value={email}
            type="email"
            autoComplete="email"
            id=""
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <SubmitButton loading={loading}>{"Login"}</SubmitButton>
        </form>
      </div>
      <div>
        <img src="/frame.png" className="w-full" alt="" />
      </div>
    </div>
  );
}
