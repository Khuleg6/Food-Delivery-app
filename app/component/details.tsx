export const FoodDetails = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="w-[836px] h-[412px] gap-2 bg-white rounded-[20px] flex items-center space-x-6 justify-center">
      <img className="w-[50%] h-[90%] rounded-[15px]" src="/food.jpg" alt="" />
      <div className="flex flex-col gap-10">
        <div className="flex gap-2 flex-col">
          <span className="text-[30px] font-semibold leading-8   text-black">
            Steak and french fries
          </span>
          <span className="text-[16px] font-normal leading-5 text-gray-700 ">
            Juicy stakes, delicious french fries.
          </span>
        </div>
        <div className="flex flex-col mt-15 space-x-6 space-y-10 ">
          <div className="flex">
            <div className="flex flex-col space-x-30">
              <span className="">Total price</span>
              <span>$12.99</span>
            </div>
            <div className="flex gap-3 items-center">
              <button className="h-11 w-11 rounded-full border">-</button>
              <span className="text-[18px] font-semibold leading-7">1</span>
              <button className="h-11 w-11 rounded-full border">+</button>
            </div>
          </div>
          <button
            onClick={onClose}
            className="absolute top-6 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-black transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <button className="flex items-center justify-center  h-11 px-25 py-2 bg-black gap-2 rounded-full">
            <span className="text-[14px] font-medium  leading-5 text-white">
              Add to cart
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
