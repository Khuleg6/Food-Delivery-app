"use client";
type Props = {
  error: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: string;
  id: string;
  placeholder: string;
};

export const TextField = ({
  error,
  value,
  onChange,
  type,
  id,
  placeholder,
}: Props) => {
  return (
    <div>
      <input
        className="border border-gray-200 p-2 rounded-md w-[416px]"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        id={id}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};
