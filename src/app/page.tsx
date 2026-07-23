import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Works } from "@/components/Works";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Works />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
