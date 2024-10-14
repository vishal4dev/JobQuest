import React from "react";
import Navbar from "./shared/Navbar.jsx";
import FilterCard from "./FilterCard.jsx";
import Job from "./Job.jsx";

const jobsArray = [1, 2, 3, 4, 5, 6, 7, 8];
const Jobs = () => {
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5">
        <div className="flex gap-5">
          {/*flex defining div*/}
          <div className="w-20%">
            {/*width defining div*/}
            <FilterCard />
          </div>
          {jobsArray.length <= 0 ? (
            <span>No Jobs Available</span>
          ) : (
            <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
              <div className="grid grid-cols-3 gap-4">
                {jobsArray?.map((job) => (
                  <Job key={job} job={job} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;

//flex 1 is used to take the remaining space of the parent div and then apply various grid properties to it that wont affect the div that is fixed in width 

//make it scrollable in y direction when used with overflow-y-auto