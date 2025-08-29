// src/pages/HomePage.jsx
import { useState, useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import { useGroupChatStore } from "../store/useGroupChatStore";
import { MessageSquare, Users } from "lucide-react";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";

import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";
import GroupSidebar from "../components/GroupSidebar";
import NoGroupSelected from "../components/NoGroupSelected";
import GroupChatContainer from "../components/GroupChatContainer";
import GroupChat from "../components/GroupChat";

const HomePage = () => {
  const { selectedUser } = useChatStore();
  const { selectedGroup } = useGroupChatStore();
  const { authUser } = useAuthStore();

  const [activeTab, setActiveTab] = useState("private");
  const [showCreateGroup, setShowCreateGroup] = useState(false);

  // --- Show Users state ---
  const [users, setUsers] = useState([]);
  const [showUsers, setShowUsers] = useState(false);

  const computeBadgeCount = (u) =>
    Number(
      (u?.badgeCount ??
        (Array.isArray(u?.badges) ? u.badges.length : undefined) ??
        u?.badge ??
        0) || 0
    );

  const badgeCount = computeBadgeCount(authUser);
  const canUsePrivate = badgeCount > 5;

  useEffect(() => {
    if (!canUsePrivate && activeTab === "private") {
      setActiveTab("group");
    }
  }, [canUsePrivate, activeTab]);

  const handleCreateGroup = () => setShowCreateGroup(true);
  const handleGroupCreated = () => setShowCreateGroup(false);
  const handleCancelCreateGroup = () => setShowCreateGroup(false);

  const handlePrivateTabClick = () => {
    if (!canUsePrivate) {
      toast.error("Private Chats unlock at 6+ badges. Use Group Chats for now.");
      return;
    }
    setActiveTab("private");
  };
  const handleGroupTabClick = () => setActiveTab("group");

  if (showCreateGroup) {
    return (
      <div className="h-screen w-screen">
        <GroupChat
          onGroupCreated={handleGroupCreated}
          currentUser={authUser}
          onCancel={handleCancelCreateGroup}
        />
      </div>
    );
  }

  return (
    <div className="h-screen bg-base-200">
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
          {/* Tab Navigation */}
          <div className="flex items-center justify-between border-b border-base-300 bg-base-100 rounded-t-lg px-2">
            <div className="flex">
              <button
                onClick={handlePrivateTabClick}
                disabled={!canUsePrivate}
                className={`px-6 py-3 flex items-center gap-2 font-medium transition-colors
                  ${activeTab === "private" && canUsePrivate
                    ? "border-b-2 border-primary text-primary bg-primary/5"
                    : "text-base-content/70 hover:text-base-content hover:bg-base-200"}
                  ${!canUsePrivate ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <MessageSquare className="size-4" />
                Private Chats
              </button>

              <button
                onClick={handleGroupTabClick}
                className={`px-6 py-3 flex items-center gap-2 font-medium transition-colors
                  ${activeTab === "group"
                    ? "border-b-2 border-primary text-primary bg-primary/5"
                    : "text-base-content/70 hover:text-base-content hover:bg-base-200"}`}
              >
                <Users className="size-4" />
                Group Chats
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex h-[calc(100%-60px)] overflow-hidden">
            {activeTab === "private" && canUsePrivate ? (
              <>
                <Sidebar />
                {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
              </>
            ) : activeTab === "group" ? (
              <>
                <GroupSidebar onCreateGroup={handleCreateGroup} />
                {!selectedGroup ? (
                  <NoGroupSelected onCreateGroup={handleCreateGroup} />
                ) : (
                  <GroupChatContainer />
                )}
              </>
            ) : null}
          </div>

          {/* --- Show Users button + list AT THE BOTTOM (UPDATED) --- */}
          <div className="p-4 border-t border-base-300">
            <button
              onClick={async () => {
                try {
                  const res = await axiosInstance.get("/messages/users", {
                    withCredentials: true, // ensure cookies/session are sent
                  });
                  console.log("Response /messages/users:", res.data);

                  // Handle common response shapes
                  const list =
                    Array.isArray(res.data) ? res.data :
                    Array.isArray(res.data?.users) ? res.data.users :
                    Array.isArray(res.data?.data) ? res.data.data :
                    [];

                  if (list.length === 0) {
                    toast("No users returned from API.");
                  }

                  setUsers(list);
                  setShowUsers(true);
                } catch (err) {
                  console.error("Failed to load users:", err);
                  if (err?.response?.status === 401) {
                    toast.error("Not authorized. Please log in.");
                  } else {
                    toast.error("Failed to load users");
                  }
                }
              }}
              className="px-4 py-2 bg-primary text-white rounded"
            >
              Show Users
            </button>

            {showUsers && (
              <ul className="mt-3 list-disc list-inside">
                {users.map((u) => (
                  <li key={u._id || u.id}>
                    {u.name || u.username || u.email || "Unknown"}
                  </li>
                ))}
              </ul>
            )}
          </div>
          {/* --- END Show Users --- */}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
