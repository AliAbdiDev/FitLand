import Discount from "./discount";
import HeroSection from "@/components/layout/landing/hero-section";

function Body() {
  return (
    <main className=" space-y-16 md:space-y-20">
      <HeroSection />
      <Discount />
    </main>
  );
}

export default Body;
