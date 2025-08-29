import { useState, useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import { useGroupChatStore } from "../store/useGroupChatStore";
import { MessageSquare, Users } from "lucide-react";
import toast from "react-hot-toast";

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

  const [activeTab, setActiveTab] = useState("private"); // 'private' or 'group'
  const [showCreateGroup, setShowCreateGroup] = useState(false);

  // --- Unified badge count from any schema shape ---
  const computeBadgeCount = (u) =>
    Number(
      (u?.badgeCount ??
        (Array.isArray(u?.badges) ? u.badges.length : undefined) ??
        u?.badge ??
        0) || 0
    );

  const badgeCount = computeBadgeCount(authUser);
  const canUsePrivate = badgeCount > 5; // must have more than 5 badges

  // Force Group tab if user doesn't meet the requirement
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

  // Show full-screen group creation UI
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
                  ${!canUsePrivate ? "opacity-50 cursor-not-allowed" : ""}
                `}
              >
                <MessageSquare className="size-4" />
                Private Chats
              </button>

              <button
                onClick={handleGroupTabClick}
                className={`px-6 py-3 flex items-center gap-2 font-medium transition-colors
                  ${activeTab === "group"
                    ? "border-b-2 border-primary text-primary bg-primary/5"
                    : "text-base-content/70 hover:text-base-content hover:bg-base-200"}
                `}
              >
                <Users className="size-4" />
                Group Chats
              </button>
            </div>

            {!canUsePrivate && (
              <div className="px-3 py-1.5 text-xs sm:text-sm rounded-md bg-warning/20 text-warning mr-2">
                Private Chats locked — earn <span className="font-semibold">6+ badges</span> to unlock.
              </div>
            )}
          </div>

          {/* Content based on active tab (falls back to group if locked) */}
          <div className="flex h-[calc(100%-60px)] overflow-hidden">
            {activeTab === "private" && canUsePrivate ? (
              <>
                <Sidebar />
                {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
              </>
            ) : (
              <>
                <GroupSidebar onCreateGroup={handleCreateGroup} />
                {!selectedGroup ? (
                  <NoGroupSelected onCreateGroup={handleCreateGroup} />
                ) : (
                  <GroupChatContainer />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
