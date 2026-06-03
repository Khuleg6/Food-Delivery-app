import { Food } from "@/src/generated/prisma/client";

interface CardProps {
  onClick: () => void;
  className?: string;
  food: Food;
}
export const Cart = ({
  className = "bg-gray-200",
  onClick,
  food,
}: CardProps) => {
  return (
    <div
      onClick={onClick}
      className="w-[280px] h-[395px] transition-all duration-300 shadow-md rounded-xl overflow-hidden hover:shadow-xl  flex flex-col bg-cover gap-2.5"
    >
      <div className="">
        <img
          src={food.image || undefined}
          className="relative w-full h-[210px] "
          alt=""
        />
      </div>
      <div className="flex flex-col items-center mt-5">
        <p className="text-[16px] font-normal text-gray-600 leading-7">
          ${food.price}
        </p>
        <p className="text-[18px] font-semibold leading-8   text-black">
          {food.foodName}
        </p>
        <div className="mt-2">
          <p className="text-[14px] font-normal leading-5 text-gray-700  px-3">
            {food.ingredients}
          </p>
        </div>
        <hr className="border mt-6 w-[110px]"></hr>
      </div>
    </div>
  );
};
