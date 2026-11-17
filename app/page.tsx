import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Studio from "@/components/Studio";
import Models from "@/components/Models";
import Apps from "@/components/Apps";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <Studio />
        <Models />
        <Apps />
        <Services />
        <Process />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
