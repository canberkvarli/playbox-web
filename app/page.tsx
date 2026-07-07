import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { Ticker } from "@/components/ticker";
import { VoltRibbon } from "@/components/volt-ribbon";
import { HowItWorks } from "@/components/how-it-works";
import { Sports } from "@/components/sports";
import { Sponsors } from "@/components/sponsors";
import { Waitlist } from "@/components/waitlist";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="relative">
        <VoltRibbon />
        <div className="relative z-10">
          <Hero />
          <Ticker />
          <HowItWorks />
          <Sports />
          <Sponsors />
          <Waitlist />
        </div>
      </main>
      <Footer />
    </>
  );
}
