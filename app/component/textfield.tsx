"use client";

import { ReactNode } from "react";

type Props = {
  error: string;
  value: string;
  onChange?: ({ target }: { target: { value: string } }) => void;
  type: string;
  id: string;
  placeholder: string;
  readOnly?: boolean;
  required?: boolean;
};

export const TextField = ({
  error,
  value,
  onChange,
  type = "email",
  id,
  placeholder,
  readOnly,
  required,
}: Props) => {
  return (
    <div>
      <input
        className="border border-gray-200 p-2 rounded-md w-[300px]"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        id={id}
        readOnly={readOnly}
        required={required}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};
export function SubmitButton({
  children,
  disabled,
  loading,
}: {
  children: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
}) {
  if (loading) {
    return (
      <button
        type="button"
        disabled={true}
        className="w-[300px] bg-black text-white py-2 rounded-md hover:opacity-80 cursor-pointer"
      >
        Loading...
      </button>
    );
  }
  return (
    <button
      type="submit"
      disabled={disabled}
      className="w-[300px] bg-black text-white py-2 rounded-md hover:opacity-80 cursor-pointer"
    >
      {children}
    </button>
  );
}
