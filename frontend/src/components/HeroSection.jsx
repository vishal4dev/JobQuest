import React from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";


const HeroSection = () => {
  return (
    <div className="text-center">
    <div className="flex flex-col gap-5 my-10">
      <span className="mx-auto px-4 py-4 rounded-full bg-gray-100 text-[#F83002] font-medium">
        No. 1 Job Hunt Website
      </span>
      <h1 className="text-5xl font-bold">
        Search, Apply & <br /> Get Your{" "}
        <span className="text-[#6A38C2]">Dream Jobs</span>
      </h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
        aspernatur temporibus nihil tempora dolor!
      </p>
      <div className="flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto">
        <input
          type="text"
          placeholder="Find your dream job"
        //   onChange={(e) => setQuery(e.target.value)}
          className="outline-none border-none w-full"
        />
        <Button
        //   onClick={searchJobHandler}
          className="rounded-r-full bg-[#6A38C2]"
        >
          <Search className="h-5 w-5" />
        </Button>
      </div>
    </div>
    </div>
  );
};

export default HeroSection;

//using span will take the width of the text inside it;
//the span tag was not doing as i expected like cover the width of the text inside it so i used it inside a div tag and gave it a margin auto to center it
