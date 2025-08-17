import { X, Users, Info } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useGroupChatStore } from "../store/useGroupChatStore";
import { useState } from "react";

const GroupChatHeader = () => {
  const { selectedGroup, setSelectedGroup } = useGroupChatStore();
  const { onlineUsers } = useAuthStore();
  const [showGroupInfo, setShowGroupInfo] = useState(false);

  if (!selectedGroup) return null;

  const onlineMembers = selectedGroup.members.filter(member => 
    onlineUsers.includes(member._id)
  );

  return (
    <>
      <div className="p-2.5 border-b border-base-300">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Group Avatar */}
            <div className="avatar">
              <div className="size-10 rounded-full relative bg-primary/20 flex items-center justify-center">
                <Users className="size-5 text-primary" />
                <span className="absolute -bottom-1 -right-1 size-4 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center">
                  {selectedGroup.members.length}
                </span>
              </div>
            </div>

            {/* Group info */}
            <div>
              <h3 className="font-medium">{selectedGroup.name}</h3>
              <p className="text-sm text-base-content/70">
                {selectedGroup.members.length} members
                {onlineMembers.length > 0 && (
                  <span className="text-green-600">
                    , {onlineMembers.length} online
                  </span>
                )}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Group Info Button */}
            <button 
              onClick={() => setShowGroupInfo(true)}
              className="btn btn-ghost btn-sm btn-circle"
              title="Group Info"
            >
              <Info className="size-4" />
            </button>

            {/* Close button */}
            <button 
              onClick={() => setSelectedGroup(null)}
              className="btn btn-ghost btn-sm btn-circle"
            >
              <X className="size-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Group Info Modal */}
      {showGroupInfo && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Group Information</h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Group Name:</label>
                <p className="text-base-content/80">{selectedGroup.name}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium">Members ({selectedGroup.members.length}):</label>
                <div className="mt-2 space-y-2">
                  {selectedGroup.members.map((member) => (
                    <div key={member._id} className="flex items-center gap-3">
                      <img
                        src={member.avatarUrl || member.profilePic || "/avatar.png"}
                        alt={member.name}
                        className="size-8 rounded-full"
                      />
                      <div className="flex-1">
                        <span className="text-sm">{member.name || member.fullName}</span>
                        <span className={`ml-2 text-xs ${
                          onlineUsers.includes(member._id) ? 'text-green-600' : 'text-base-content/50'
                        }`}>
                          {onlineUsers.includes(member._id) ? 'Online' : 'Offline'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium">Created:</label>
                <p className="text-base-content/80 text-sm">
                  {new Date(selectedGroup.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            
            <div className="modal-action">
              <button 
                className="btn" 
                onClick={() => setShowGroupInfo(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GroupChatHeader;