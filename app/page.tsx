import Image from "next/image";
import { Navigation } from "./component/navigation";
import { Footer } from "./component/footer";
import { Card } from "./component/ card";

export default function Home() {
  return (
    <div>
      <div>
        <Navigation />
        <img className="w-full h-[800px]" src="/img.png" alt="Logo" />
      </div>
      <div className="h-[960px]">
        <p>Appetizers</p>
        <Card />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
