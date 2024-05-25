import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  BsBriefcase,
  BsGeoAlt,
  BsFillGearFill,
  BsArrowReturnRight,
} from "react-icons/bs";
import { AiOutlineClockCircle } from "react-icons/ai";
import { useSearchContext } from "../States/SearchContext"; // Import the context

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const { searchTerm } = useSearchContext(); // Use the context

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get("http://localhost:8088/data/getJobs");
        setJobs(response.data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, []); // Fetch jobs only once on component mount

  const filteredJobs = searchTerm
    ? jobs.filter((job) =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : jobs;

  return (
    <section className="bg-gray-100 min-h-screen w-[35%] flex justify-center py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-gray-800 text-center">
          Latest Jobs
        </h1>
        <ul className="grid items-center gap-6">
          {filteredJobs.map((job) => (
            <li
              key={job._id}
              className="bg-white shadow-lg rounded-lg overflow-hidden min-h-full w-auto relative"
            >
              <Link to={`/jobDetails/${job.id}`} className="block">
                <div className="flex justify-end p-4">
                  <img
                    src={job.companyLogo}
                    alt={job.company}
                    className="h-10 w-10 object-contain"
                  />
                </div>
                <div className="p-4">
                  <h2 className="text-lg font-bold mb-2">{job.title}</h2>
                  <div className="flex items-center text-gray-600 mb-2">
                    <BsBriefcase className="mr-2" />
                    <p>{job.company}</p>
                  </div>
                  <div className="flex items-center text-gray-600 mb-2">
                    <BsGeoAlt className="mr-2" />
                    <p>{job.location}</p>
                  </div>
                  <div className="flex items-center text-gray-600 mb-2">
                    <AiOutlineClockCircle className="mr-2" />
                    <p>{job.experience}</p>
                  </div>
                  <div className="flex items-center text-gray-600 mb-2">
                    <BsFillGearFill className="mr-2" />
                    <p>{job.mustHaveSkills}</p>
                  </div>
                  <div className="flex items-center text-gray-600 mb-2">
                    <BsFillGearFill className="mr-2" />
                    <p>{job.skills}</p>
                  </div>
                </div>
              </Link>
              <div className="absolute bottom-4 right-4">
                <Link
                  to={`/jobDetails/${job.id}`}
                  className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 flex items-center gap-2"
                >
                  Apply
                  <BsArrowReturnRight className="ml-2" />
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Jobs;
