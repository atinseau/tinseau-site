import React from "react";
import About from "src/components/Home/About";
import Contact from "src/components/Home/Contact";
import Galleries from "src/components/Home/Galleries";
import NextEvent from "src/components/Home/NextEvent";
import Services from "src/components/Home/Services";

const Page: React.FC = () => {
  return (
    <div className="home__page">
      <div className="hero__black">
        <NextEvent />
        <hr />
        <About />
      </div>

      <div className="hero__white">
        <Services />
      </div>

      <div className="hero__black">
        <Galleries />
        <Contact />
      </div>
    </div>
  );
}

export default Page;