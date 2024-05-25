import React, { useState } from "react";
import { BsFillPersonFill } from "react-icons/bs";
import { MdPhotoCamera } from "react-icons/md";

const Profile = () => {
  const [fullName, setFullName] = useState("");
  const [experience, setExperience] = useState("");
  const [salary, setSalary] = useState("");
  const [bio, setBio] = useState("");
  const [profileImage, setProfileImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    // You can perform validation on the file here if needed
    setProfileImage(file);
  };

  const handleSave = () => {
    // Here you can send the updated details to the server
    console.log("Full Name:", fullName);
    console.log("Experience:", experience);
    console.log("Salary:", salary);
    console.log("Bio:", bio);
    console.log("Profile Image:", profileImage);
    // Reset form fields after saving
    setFullName("");
    setExperience("");
    setSalary("");
    setBio("");
    setProfileImage(null);
  };

//   // Generate a random bio for demonstration purposes
//   const generateRandomBio = () => {
//     const randomBio = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus suscipit tristique ultricies.";
//     setBio(randomBio);
//   };

  return (
    <div className="bg-gray-100 min-h-screen py-8 px-4 md:px-8 lg:px-12 xl:px-16">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-8">Profile</h2>
        <div className="bg-white p-8 shadow-lg rounded-lg">
          <div className="flex items-center justify-center mb-8">
            <div className="relative w-24 h-24 rounded-full overflow-hidden mr-4">
              <img
                src={profileImage ? URL.createObjectURL(profileImage) : <BsFillPersonFill/>}
                alt="Profile"
                className="object-cover w-full h-full"
              />
              <label
                htmlFor="profile-image"
                className="absolute bottom-0 right-0 bg-indigo-500 text-white rounded-full cursor-pointer flex items-center justify-center w-8 h-8"
              >
                <MdPhotoCamera size={25} />
                <input
                  type="file"
                  id="profile-image"
                  className="hidden bg-white"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </label>
            </div>
            <div>
              <h3 className="text-xl font-semibold">{fullName || "Full Name"}</h3>
              <p className="text-gray-600 mt-1">{experience || "Experience"} years</p>
            </div>
          </div>
          <div className="mb-6">
            <label htmlFor="full-name" className="block text-gray-600">Full Name</label>
            <input
              type="text"
              id="full-name"
              className="w-full border-b-2 border-gray-300 bg-white focus:outline-none focus:border-indigo-500 py-2"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="experience" className="block text-gray-600">Experience (in years)</label>
            <input
              type="text"
              id="experience"
              className="w-full border-b-2 border-gray-300 bg-white focus:outline-none focus:border-indigo-500 py-2"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="salary" className="block text-gray-600">Salary Expectation (per annum)</label>
            <input
              type="text"
              id="salary"
              className="w-full border-b-2 border-gray-300 bg-white focus:outline-none focus:border-indigo-500 py-2"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="bio" className="block text-gray-600">Bio</label>
            <textarea
              id="bio"
              className="w-full border border-gray-300 bg-white focus:outline-none focus:border-indigo-500 py-2"
              rows="4"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            ></textarea>
          </div>
          <div className="flex justify-end">
            <button
              className="bg-indigo-500 text-white py-2 px-6 rounded-md hover:bg-indigo-600 mr-2"
              onClick={handleSave}
            >
              Save
            </button>
            <button
              className="bg-indigo-500 text-white py-2 px-6 rounded-md hover:bg-indigo-600 mr-2"
              onClick={handleSave}
            >
              Save....
            </button>
            {/* <button
              className="text-gray-600 hover:text-gray-800"
              onClick={generateRandomBio}
            >
              Generate Random Bio
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
