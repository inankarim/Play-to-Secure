import { useState, useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User, Target } from "lucide-react"; // Ensure 'Target' icon is imported

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);
  const [universityName, setUniversityName] = useState(authUser?.universityName || "");
  const [experienceLevel, setExperienceLevel] = useState(authUser?.experienceLevel || "Beginner");
  const [points, setPoints] = useState(authUser?.points || 0);  // Points state
  const [badge, setBadge] = useState(authUser?.badge || "Bronze");  // Badge state

  // Automatically calculate badge based on points
  useEffect(() => {
    if (points >= 50) {
      setBadge("Gold");
    } else if (points >= 10) {
      setBadge("Silver");
    } else if (points > 0){
      setBadge("Bronze");
    }else{
      setBadge ("No badges earned so far")
    }
      
    
  }, [points]);

  useEffect(() => {
    // Automatically update points when user's points change
    setPoints(authUser?.points || 0);
  }, [authUser]);

  // Function to handle image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  // Function to update university name
  const handleUniversityUpdate = async () => {
    await updateProfile({ universityName });
  };

  // Function to update experience level
  const handleExperienceLevelUpdate = async () => {
    await updateProfile({ experienceLevel });
  };

  return (
    <div className="bg-[#1f1f1f] "> {/* Dark background for the profile page */}
      <div className="pt-20">
        <div className="max-w-2xl mx-auto p-4 py-8 bg-base-300 rounded-xl">
          <div className="p-6 space-y-8">
            <div className="text-center">
              <h1 className="text-2xl font-semibold">Profile</h1>
              <p className="mt-2">Your Profile</p>
            </div>

            {/* Avatar Upload Section */}
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <img
                  src={selectedImg || authUser.profilePic || "/avatar.png"}
                  alt="Profile"
                  className="size-32 rounded-full object-cover border-4"
                />
                <label
                  htmlFor="avatar-upload"
                  className={`absolute bottom-0 right-0 bg-base-content hover:scale-105 p-2 rounded-full cursor-pointer transition-all duration-200 ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}`}
                >
                  <Camera className="w-5 h-5 text-base-200" />
                  <input
                    type="file"
                    id="avatar-upload"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={isUpdatingProfile}
                  />
                </label>
              </div>
              <p className="text-sm text-zinc-400">
                {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
              </p>
            </div>

            {/* Full Name Section */}
            <div className="space-y-6">
              <div className="space-y-1.5">
                <div className="text-sm text-zinc-400 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Full Name
                </div>
                <div className="flex gap-2">
                  <p className="px-4 py-2.5 bg-base-200 rounded-lg border flex-1">
                    {authUser?.fullName}
                  </p>
                </div>
              </div>

              {/* Email Section */}
              <div className="space-y-1.5">
                <div className="text-sm text-zinc-400 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email Address
                </div>
                <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{authUser?.email}</p>
              </div>
            </div>

            {/* University Name */}
            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                University Name
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={universityName}
                  onChange={(e) => setUniversityName(e.target.value)}
                  className="px-4 py-2.5 bg-base-200 rounded-lg border flex-1"
                  placeholder="Enter your university name"
                  disabled={isUpdatingProfile}
                />
                <button
                  className="btn btn-primary"
                  onClick={handleUniversityUpdate}
                  disabled={isUpdatingProfile}
                >
                  Update
                </button>
              </div>
            </div>

            {/* Experience Level */}
            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <Target className="w-4 h-4" />
                Experience Level
              </div>
              <div className="flex gap-2">
                <select
                  value={experienceLevel}
                  onChange={(e) => setExperienceLevel(e.target.value)}
                  className="px-4 py-2.5 bg-base-200 rounded-lg border flex-1"
                  disabled={isUpdatingProfile}
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
                <button
                  className="btn btn-primary"
                  onClick={handleExperienceLevelUpdate}
                  disabled={isUpdatingProfile}
                >
                  Update
                </button>
              </div>
            </div>

            {/* Points Section (Auto-updated) */}
            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <User className="w-4 h-4" />
                Points Earned
              </div>
              <div className="flex gap-2">
                <p className="px-4 py-2.5 bg-base-200 rounded-lg border flex-1">
                  {points} Points
                </p>
              </div>
            </div>

            {/* Badge Section (Auto-updated based on points) */}
            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <Target className="w-4 h-4" />
                Badge Earned
              </div>
              <div className="flex gap-2">
                <p className="px-4 py-2.5 bg-base-200 rounded-lg border flex-1">
                  {badge} Badge
                </p>
              </div>
            </div>
          </div>

          {/* Account Information */}
          <div className="mt-6 bg-base-300 rounded-xl p-6">
            <h2 className="text-lg font-medium mb-4">Account Information</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                <span>Member Since</span>
                <span>{authUser.createdAt?.split("T")[0]}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span>Account Status</span>
                <span className="text-green-500">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
