import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function UpdateProfile() {
  // Editable state
  const [profilePicFile, setProfilePicFile] = useState(null);
  const [profilePicPreview, setProfilePicPreview] = useState("");
  const [universityName, setUniversityName] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");

  // Fixed display-only values
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  // Fetch current user info on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/auth/check", {
          credentials: "include", // send cookies
        });
        const data = await res.json();
        if (res.ok) {
          const [fName, lName] = data.fullName.split(" ");
          setFirstName(fName);
          setLastName(lName || "");
          setEmail(data.email);
          setUniversityName(data.universityName || "");
          setExperienceLevel(data.experienceLevel || "");
          setProfilePicPreview(data.profilePic || "");
        } else {
          toast.error(data.message || "Failed to fetch user");
        }
      } catch (err) {
        toast.error("Server error while fetching user");
      }
    };
    fetchUser();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicFile(file);
      setProfilePicPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!profilePicFile && !universityName && !experienceLevel) {
      toast("No changes to save!", { icon: "ℹ️" });
      return;
    }

    const formData = new FormData();
    if (profilePicFile) formData.append("profilePic", profilePicFile);
    if (universityName) formData.append("universityName", universityName);
    if (experienceLevel) formData.append("experienceLevel", experienceLevel);

    try {
      const res = await fetch("http://localhost:5000/api/auth/update-profile", {
        method: "PUT",
        body: formData,
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Profile updated successfully!");
      } else {
        toast.error(data.message || "Update failed");
      }
    } catch (err) {
      toast.error("Error connecting to server");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8 flex flex-col items-center w-full">
      {/* Header */}
      <div className="relative w-full max-w-4xl bg-gray-300 rounded-lg p-8 flex items-center mb-8">
        <div className="relative w-32 h-32 rounded-full border-2 border-white">
          <img
            src={profilePicPreview || "https://via.placeholder.com/150"}
            alt="Profile"
            className="w-full h-full object-cover rounded-full"
          />
          <label
            htmlFor="profilePicInput"
            className="absolute bottom-1 right-1 bg-white p-1 rounded-full cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-gray-600"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
              <path
                fillRule="evenodd"
                d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                clipRule="evenodd"
              />
            </svg>
            <input
              id="profilePicInput"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
        </div>
        <div className="ml-6">
          <h1 className="text-3xl font-bold text-gray-800">{`${firstName} ${lastName}`}</h1>
          <p className="text-gray-700 mt-1">{email}</p>
        </div>
        <button
          onClick={handleSubmit}
          className="absolute right-8 top-8 bg-blue-600 text-white font-semibold py-2 px-6 rounded-md hover:bg-blue-700"
        >
          Save changes
        </button>
      </div>

      {/* Editable form */}
      <div className="w-full max-w-xl bg-white rounded-lg shadow-lg p-6 space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">Personal details</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">First name</label>
            <input
              type="text"
              value={firstName}
              disabled
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 text-gray-500 bg-gray-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Last name</label>
            <input
              type="text"
              value={lastName}
              disabled
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 text-gray-500 bg-gray-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">University</label>
            <input
              type="text"
              value={universityName}
              onChange={(e) => setUniversityName(e.target.value)}
              placeholder="Enter university"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 text-gray-900 bg-gray-50 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Experience Level</label>
            <input
              type="text"
              value={experienceLevel}
              onChange={(e) => setExperienceLevel(e.target.value)}
              placeholder="Enter experience level"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 text-gray-900 bg-gray-50 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
