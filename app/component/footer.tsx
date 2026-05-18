import { FooterLogo } from "./footerLogo";

export const Footer = () => {
  return (
    <div className="bg-[#18181B] flex gap-20 flex-col h-188.75 justify-center">
      <div className="bg-[#EF4444] ">
        <div className="container mx-auto justify-center  py-5 flex  font-semibold text-3xl gap-8 leading-9 text-white">
          <p>Fresh fast delivered</p>
          <p>Fresh fast delivered</p>
          <p>Fresh fast delivered</p>
          <p>Fresh fast delivered</p>
        </div>
      </div>
      <div className="text-white text-[16px] font-normal leading-6 flex gap-55 justify-start container mx-auto">
        <div>
          <FooterLogo />
        </div>
        <div className="flex gap-4 flex-col">
          <span className="text-[#71717A]">NOMNOM</span>
          <p>Home</p>
          <p>Contact us</p>
          <p>Delivery zone</p>
        </div>
        <div className="flex gap-4 flex-col">
          <span className="text-[#71717A]">MENU</span>
          <p>Appetizers</p>
          <p>Salads</p>
          <p>Pizzas</p>
          <p>Lunch favorites</p>
          <p>Main dishes</p>
        </div>
        <div className="flex gap-4 flex-col">
          <div className="text-[#18181B]">SPACE</div>
          <p>Side dish</p>
          <p>Brunch</p>
          <p>Desserts</p>
          <p>Beverages</p>
          <p>Fish & Sea foods</p>
        </div>
        <div className="flex gap-4 flex-col">
          <span className="text-[#71717A]">FOLLOW US</span>
          <div className="flex gap-4">
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <rect width="28" height="27.0345" fill="url(#pattern0_23_5084)" />
              <defs>
                <pattern
                  id="pattern0_23_5084"
                  patternContentUnits="objectBoundingBox"
                  width="1"
                  height="1"
                >
                  <use
                    xlinkHref="#image0_23_5084"
                    transform="scale(0.00862069 0.00892857)"
                  />
                </pattern>
                <image
                  id="image0_23_5084"
                  width="116"
                  height="112"
                  preserveAspectRatio="none"
                  xlinkHref="data:image/png;base64,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"
                />
              </defs>
            </svg>
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <rect width="28" height="27.0345" fill="url(#pattern0_23_5087)" />
              <defs>
                <pattern
                  id="pattern0_23_5087"
                  patternContentUnits="objectBoundingBox"
                  width="1"
                  height="1"
                >
                  <use
                    xlinkHref="#image0_23_5087"
                    transform="scale(0.00862069 0.00892857)"
                  />
                </pattern>
                <image
                  id="image0_23_5087"
                  width="116"
                  height="112"
                  preserveAspectRatio="none"
                  xlinkHref="data:image/png;base64,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"
                />
              </defs>
            </svg>
          </div>
        </div>
      </div>
      <div className="flex text-[#71717A] gap-16 container mx-auto py-8 border-t text-[14px] leading-5">
        <div className="flex gap-1 ">
          <p>Copy right 2026</p>
          <p>©</p>
          <p>Nomnom LLC</p>
        </div>
        <p>Privacy policy</p>
        <p>Terms and condition</p>
        <p>Cookie policy</p>
      </div>
    </div>
  );
};
