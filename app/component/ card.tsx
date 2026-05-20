export const Card = () => {
  return (
    <div className="w-[397px] p-4 rounded-[20px] bg-gray-200 flex flex-col gap-2.5">
      <div className="">
        <img
          src="/food.jpg"
          className="relative w-[365] h-[210px] rounded-xl"
          alt=""
        />
        <button className="absolute"></button>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-[24px] font-semibold leading-8 text-[#FD543F]">
          Steak and french fries
        </p>
        <p className="text-[18px] font-semibold leading-7">$12.99</p>
      </div>
      <p className="text-[14px] font-normal leading-5">
        Juicy stakes, delicious french fries.
      </p>
    </div>
  );
};
