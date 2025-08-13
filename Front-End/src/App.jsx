import { Toaster } from "react-hot-toast";
import UpdateProfile from "./UpdateProfile.jsx";

function App() {
  return (
    <div className="h-screen w-screen bg-gray-100 flex items-center justify-center">
      <Toaster position="top-center" />
      <UpdateProfile />
    </div>
  );
}

export default App;
