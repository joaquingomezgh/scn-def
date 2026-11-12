import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Offers from "@/components/Offers";
import ValueProps from "@/components/ValueProps";
import Cuts from "@/components/Cuts";
import Recipes from "@/components/Recipes";
import Asadometro from "@/components/Asadometro";
import About from "@/components/About";
import BranchFinder from "@/components/BranchFinder";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <Offers />
        <ValueProps />
        <Cuts />
        <Recipes />
        <Asadometro />
        <About />
        <BranchFinder />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
