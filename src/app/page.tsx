import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ValueProps from "@/components/ValueProps";
import Cuts from "@/components/Cuts";
import Recipes from "@/components/Recipes";
import About from "@/components/About";
import BranchFinder from "@/components/BranchFinder";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <ValueProps />
        <Cuts />
        <Recipes />
        <About />
        <BranchFinder />
      </main>
      <Footer />
    </>
  );
}
