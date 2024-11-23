import { ModeToggle } from "@/components/mode-button";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import React from "react";
import { Link } from "react-router-dom";
import companies from "../data/companies.json";
import Autoplay from "embla-carousel-autoplay";

const Landingpage = () => {
  return (
    <main className="max-w-screen-lg mx-auto flex flex-col gap-6 sm:gap-10 py-32 sm:py-10">
      {/* Title Section */}
      <section className="text-center">
        <h1 className="text-3xl sm:text-5xl xl:text-6xl lg:text-8xl font-extrabold gradient-title tracking-tighter py-5">
          Find. Apply. Achieve.
        </h1>
        <p className="text-white text-sm sm:text-lg lg:text-xl sm:mt-4">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Labore,
          repudiandae.
        </p>
      </section>

      {/* Buttons */}
      <div className="flex flex-wrap gap-4 justify-center mt-5 sm:mt-5">
        <Link to="/jobs">
          <Button
            variant="blue"
            size="lg"
            className="sm:text-2xl sm:font-bold sm:p-8"
          >
            Find Jobs
          </Button>
        </Link>
        <Link to="/post-job">
          <Button
            variant="destructive"
            size="lg"
            className="sm:text-2xl sm:font-bold sm:p-8"
          >
            Post Jobs
          </Button>
        </Link>
      </div>

      {/* Carousel Section */}
      <Carousel
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
        className="w-full mt-14 sm:mt-36"
      >
        <CarouselContent className="flex gap-5 sm:gap-20 items-center">
          {companies.map(({ name, id, path }) => (
            <CarouselItem key={id} className="basis-1/3 lg:basis-1/6 ">
              <img
                src={path}
                alt={name}
                className="h-9 sm:h-14 object-contain"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </main>
  );
};

export default Landingpage;
