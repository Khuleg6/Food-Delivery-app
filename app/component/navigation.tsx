import { NaviLogo } from "./naviLogo";

export const Navigation = () => {
  return (
    <div className="bg-[#18181B]  py-3 ">
      <div className="flex justify-between container mx-auto items-center">
        <NaviLogo />
        <div className="text-[14px] font-medium flex gap-[12.81px]">
          <button className="bg-[#F4F4F5] py-1 px-2  rounded-full">
            Sign up
          </button>
          <button className="bg-[#EF4444] py-1 px-1.5  rounded-full">
            Log in
          </button>
        </div>
      </div>
    </div>
  );
};
