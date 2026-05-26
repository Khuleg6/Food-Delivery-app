export const Card = () => {
  return (
    <div className="w-[280px] h-[395px] shadow-lg rounded-xl overflow-hidden hover:shadow-gray-500  bg-gray-200 flex flex-col gap-2.5">
      <div className="">
        <img src="/food.jpg" className="relative w-full h-[210px] " alt="" />
        <button className="absolute"></button>
      </div>
      <div className="flex flex-col items-center mt-5">
        <p className="text-[16px] font-normal text-gray-600 leading-7">
          $12.99
        </p>
        <p className="text-[18px] font-semibold leading-8   text-black">
          Steak and french fries
        </p>
        <div className="mt-2">
          <p className="text-[14px] font-normal leading-5 text-gray-700  px-3">
            Juicy stakes, delicious french fries.
          </p>
        </div>
        <hr className="border mt-6 w-[110px]"></hr>
      </div>
    </div>
  );
};
