import React, { useState } from "react";
import { TextField } from "../component/textfield";

// 1. Эхлээд компонентынхоо хүлээж авах Props-ын төрлийг тодорхойлно
interface SecondstepProps {
  handleNextStep: () => void;
  handlePreviusStep: () => void;
}

// 2. Компонентдоо төрлийг нь зааж, props-оо бутлаж (destructure) авна
export const Secondstep = ({
  handleNextStep,
  handlePreviusStep,
}: SecondstepProps) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState<string[]>([]);
  const [showPassword, setShowPassword] = useState(false);

  const isPasswordValid = (value: string) => {
    setPassword(value);

    const errors = [];

    if (!/(?=.*[A-Za-z])/.test(value)) {
      errors.push("дор хаяж 1 үсэг");
    }

    if (!/(?=.*\d)/.test(value)) {
      errors.push("дор хаяж 1 тоо");
    }

    if (value.length < 8) {
      errors.push("хамгийн багадаа 8 тэмдэгт");
    }

    setPasswordError(errors);
  };

  const isConfirmPasswordValid = (value: string) => {
    setConfirmPassword(value);

    if (value !== password) {
      setConfirmPassword("Нууц үг таарахгүй байна");
    } else {
      setConfirmPassword("");
    }
  };

  return (
    <div className="flex gap-15 container">
      <div className="space-y-6 flex justify-center flex-col">
        <button onClick={handlePreviusStep}>
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
        </button>

        <div>
          <p className="text-2xl font-semibold">Create strong password</p>
          <p className="text-[16px] font-normal text-[#71717A]">
            Create a strong password with letters, numbers.
          </p>
        </div>
        <div className="flex gap-3 flex-col">
          <TextField
            placeholder="Password"
            error=""
            type={showPassword ? "text" : "password"}
            onChange={(e) => {
              isPasswordValid(e.target.value);
            }}
          />
          <div className="text-sm text-red-500 mt-2">
            {passwordError.map((error, index) => (
              <p key={index}>• {error}</p>
            ))}
          </div>
          <TextField
            id=""
            placeholder="Confirm password"
            error={confirmPassword}
            type={showPassword ? "text" : "password"}
            onChange={(e) => {
              isConfirmPasswordValid(e.target.value);
            }}
          />
          <div className="flex gap-2 items-center">
            <input
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
              className="h-[16px] w-[16px] border border-[#71717A]"
              type="checkbox"
            />
            <p className="text-[16px] font-normal text-[#71717A]">
              Show password
            </p>
          </div>
        </div>

        <div>
          <button
            onClick={handleNextStep}
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
