import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BsBriefcase, BsFillGearFill, BsGeoAlt } from "react-icons/bs";
// import { AiOutlineClockCircle } from "react-icons/ai";

const JobDetails = () => {
  const { id } = useParams(); // Assuming the job ID is passed as a URL parameter
  const [job, setJob] = useState(null);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        // Fetch details of the specific job using its ID
        const response = await axios.get(`http://localhost:8088/data/getJob/${id}`);
        setJob(response.data);
      } catch (error) {
        console.error("Error fetching job details:", error);
      }
    };

    fetchJobDetails();
  }, [id]); // Fetch details whenever the job ID changes

  if (!job) {
    return <div>Loading...</div>;
  }

  return (
    <section className="page bg-gray-100 h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Job Feed</h1>
        <div className="flex overflow-x-scroll pb-10 hide-scroll-bar">
          <div className="flex flex-nowrap gap-6">
            {job.map((job) => (
              <div key={job._id} className="job-card bg-white shadow-lg rounded-lg p-6 w-80 flex-none">
                <h2 className="text-xl font-semibold mb-4">{job.title}</h2>
                <div className="text-gray-600 mb-4">
                  <BsBriefcase className="inline-block mr-2" />
                  <span>{job.company}</span>
                </div>
                <div className="text-gray-600 mb-4">
                  <BsGeoAlt className="inline-block mr-2" />
                  <span>{job.location}</span>
                </div>
                {/* <div className="text-gray-600 mb-4">
                  <AiOutlineClockCircle className="inline-block mr-2" />
                  <span>{job.experience}</span>
                </div>
                <div className="text-gray-600 mb-4">
                  <BsFillGearFill className="inline-block mr-2" />
                  <span>{job.mustHaveSkills}</span>
                </div>
                <div className="text-gray-600">
                  <BsFillGearFill className="inline-block mr-2" />
                  <span>{job.skills}</span>
                </div> */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default JobDetails;
