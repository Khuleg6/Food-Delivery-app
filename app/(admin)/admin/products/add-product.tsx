import { Plus } from "lucide-react";
import React from "react";

export const AddProduct = ({
  category,
  onClick,
}: {
  category: string;
  onClick: () => void;
}) => {
  return (
    <div className="flex flex-col gap-1 justify-center items-center border border-dashed w-[280px] h-[340px]  p-5 rounded-[20px] border-red-500">
      <button
        onClick={onClick}
        className="w-9 h-9 rounded-full bg-red-500 flex justify-center items-center hover:bg-red-600"
      >
        <Plus className="text-white size-4 " />
      </button>
      <span>Add new items</span>
    </div>
  );
};
