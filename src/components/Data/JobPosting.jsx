import React, { useState } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const JobPosting = () => {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    salaryFrom: "",
    salaryTo: "",
    location: "",
    experience: "",
    mustHaveSkills: "",
    skills: "",
    description: "",
  });
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageDrop = (acceptedFiles) => {
    setImage(acceptedFiles[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataWithImage = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataWithImage.append(key, formData[key]);
    });
    if (image) {
      formDataWithImage.append("image", image);
    }

    try {
      const response = await axios.post("http://localhost:8088/data/postJobs", formDataWithImage, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Job posted successfully:", response.data);
      toast.success("Job posted successfully!", {
        position: "bottom-left",
        autoClose: 3000,
      });
      // Clear form data after successful submission
      setFormData({
        title: "",
        company: "",
        salaryFrom: "",
        salaryTo: "",
        location: "",
        experience: "",
        mustHaveSkills: "",
        skills: "",
        description: "",
      });
      // setImage(image);
    } catch (error) {
      console.error("Error posting job:", error);
      toast.error("Failed to post job. Please try again later.", {
        position: "bottom-left",
        autoClose: 3000,
      });
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleImageDrop,
    accept: "image/*",
  });

  return (
    <section>
      <ToastContainer />
      <div className="bg-gray-200 min-h-screen flex justify-center items-center overflow-auto">
        <div className="container mx-auto px-4 py-8 max-w-lg bg-white rounded-lg shadow-lg relative top-20 bottom-40">
          <h1 className="text-3xl font-bold mb-8 text-center">Post a Job</h1>
          <form onSubmit={handleSubmit}>
            {/* <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Job Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="input-field px-5 py-2 bg-white"
                placeholder="Enter job title"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Company Name
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="input-field px-5 py-2 bg-white"
                placeholder="Enter company name"
                required
              />
            </div>
            <div className="mb-6 flex">
              <div className="w-1/2 mr-2">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Salary From
                </label>
                <input
                  type="number"
                  name="salaryFrom"
                  value={formData.salaryFrom}
                  onChange={handleChange}
                  className="input-field px-5 py-2 bg-white"
                  placeholder="From"
                  required
                />
              </div>
              <div className="w-1/2 ml-2">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Salary To
                </label>
                <input
                  type="number"
                  name="salaryTo"
                  value={formData.salaryTo}
                  onChange={handleChange}
                  className="input-field px-5 py-2 bg-white"
                  placeholder="To"
                  required
                />
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="input-field px-5 py-2 bg-white"
                placeholder="Enter job location"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Experience
              </label>
              <input
                type="text"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                className="input-field px-5 py-2 bg-white"
                placeholder="Enter required experience"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Must-Have Skills
              </label>
              <input
                type="text"
                name="mustHaveSkills"
                value={formData.mustHaveSkills}
                onChange={handleChange}
                className="input-field px-5 py-2 bg-white"
                placeholder="Enter must-have skills"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Skills
              </label>
              <input
                type="text"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                className="input-field px-5 py-2 bg-white"
                placeholder="Enter additional skills"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Job Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="input-field px-5 py-2 bg-white h-32"
                placeholder="Enter job description"
                required
              ></textarea>
            </div> */}
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Company Logo
              </label>
              <div
                {...getRootProps()}
                className="border-2 border-dashed border-gray-400 p-4 text-center cursor-pointer"
              >
                <input {...getInputProps()} />
                {image ? (
                  <p>{image.name}</p>
                ) : (
                  <p>Drag 'n' drop an image, or click to select one</p>
                )}
              </div>
            </div>
            <button
              type="submit"
              className="bg-indigo-500 text-white py-3 px-6 rounded hover:bg-indigo-600 w-full"
            >
              Post Job
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default JobPosting;
