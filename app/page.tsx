import Image from "next/image";
import { Navigation } from "./component/navigation";
import { Footer } from "./component/footer";
import { Card } from "./component/ card";

export default function Home() {
  return (
    <div className="bg-[#404040]">
      <div>
        <Navigation />
        <img className="w-full h-[724px]" src="/hero1.png" alt="Logo" />
      </div>

      <div className="px-20 py-10">
        <p className="text-white text-3xl font-semibold">Appetizers</p>
        <div className="grid py-10 grid-cols-5 grid-rows-2 gap-6">
          {" "}
          {Array.from({ length: 10 }).map((_, index) => (
            <Card key={index} />
          ))}
        </div>
      </div>
      <div className="px-20 py-10">
        <p className="text-white text-3xl font-semibold">Appetizers</p>
        <div className="grid py-10 grid-cols-5 grid-rows-2 gap-6">
          {" "}
          {Array.from({ length: 10 }).map((_, index) => (
            <Card key={index} />
          ))}
        </div>
      </div>
      <div className="px-20 py-10">
        <p className="text-white text-3xl font-semibold">Appetizers</p>
        <div className="grid py-10 grid-cols-5 grid-rows-2 gap-6">
          {" "}
          {Array.from({ length: 10 }).map((_, index) => (
            <Card key={index} />
          ))}
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
