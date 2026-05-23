import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { HowItWorks } from "@/components/how-it-works";
import { Sports } from "@/components/sports";
import { ForPlayers } from "@/components/for-players";
import { ForPartners } from "@/components/for-partners";
import { FAQ } from "@/components/faq";
import { Waitlist } from "@/components/waitlist";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <HowItWorks />
        <Sports />
        <ForPlayers />
        <ForPartners />
        <FAQ />
        <Waitlist />
      </main>
      <Footer />
    </>
  );
}
