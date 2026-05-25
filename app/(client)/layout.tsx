import { Footer } from "../component/footer";
import { Navigation } from "../component/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navigation />
      {children}
      <Footer />
    </>
  );
}
