import { X, Users, Info, UserMinus, LogOut, UserPlus, Search, Edit3 } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useGroupChatStore } from "../store/useGroupChatStore";
import { useState } from "react";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";

const GroupChatHeader = () => {
  const { selectedGroup, setSelectedGroup } = useGroupChatStore();
  const { onlineUsers = [], authUser } = useAuthStore();

  const [showGroupInfo, setShowGroupInfo] = useState(false);
  const [showConfirmLeave, setShowConfirmLeave] = useState(false);
  const [memberToRemove, setMemberToRemove] = useState(null);
  const [showConfirmRemove, setShowConfirmRemove] = useState(false);

  const [showAddMember, setShowAddMember] = useState(false);
  const [availableUsers, setAvailableUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUsersToAdd, setSelectedUsersToAdd] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);

  const [showRenameGroup, setShowRenameGroup] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");
  const [renamingGroup, setRenamingGroup] = useState(false);

  if (!selectedGroup) return null;

  // Current user is creator? (handles string/object id shapes)
  const isGroupCreator =
    authUser?._id === selectedGroup?.createdBy ||
    authUser?._id === selectedGroup?.createdBy?._id ||
    authUser?._id?.toString?.() === selectedGroup?.createdBy?.toString?.() ||
    authUser?._id?.toString?.() === selectedGroup?.createdBy?._id?.toString?.();

  const onlineMembers = (selectedGroup.members || []).filter((m) =>
    (onlineUsers || []).includes(m._id)
  );

  // ========= Actions =========

  // Leave group
  const handleLeaveGroup = async () => {
    if (!selectedGroup?._id) {
      toast.error("No group selected");
      return;
    }
    try {
      // If your API expects POST instead of DELETE, switch it:
      // await axiosInstance.post(`/group/${selectedGroup._id}/leave`, null, { withCredentials: true });
      await axiosInstance.delete(`/group/${selectedGroup._id}/leave`, {
        withCredentials: true,
      });

      toast.success("You left the group!");
      setSelectedGroup(null);
      setShowConfirmLeave(false);
      setShowGroupInfo(false);
    } catch (error) {
      console.error("Leave group error:", error);
      if (error?.response?.status === 405) {
        toast.error("Method not allowed. Try POST instead of DELETE on the server.");
      } else {
        toast.error("Failed to leave the group");
      }
    }
  };

  // Remove a member (creator only)
  const handleRemoveMember = async (memberId) => {
    if (!selectedGroup?._id) return;

    if (!isGroupCreator) {
      toast.error("Only the group creator can remove members");
      return;
    }

    try {
      const res = await axiosInstance.delete(
        `/group/${selectedGroup._id}/removeUser`,
        {
          data: { userId: memberId },
          withCredentials: true,
        }
      );

      if (res.status === 200) {
        toast.success("Member removed from the group!");

        const updatedSelectedGroup = {
          ...selectedGroup,
          members: (selectedGroup.members || []).filter((m) => m._id !== memberId),
        };
        setSelectedGroup(updatedSelectedGroup);
      }
    } catch (error) {
      console.error("Remove member error:", error);
      if (error?.response?.status === 403) {
        toast.error("Only the group creator can remove members");
      } else {
        toast.error("Failed to remove member");
      }
    } finally {
      setMemberToRemove(null);
      setShowConfirmRemove(false);
    }
  };

  const initiateRemoveMember = (memberId) => {
    setMemberToRemove(memberId);
    setShowConfirmRemove(true);
  };

  const getMemberName = (memberId) => {
    const member = (selectedGroup.members || []).find((m) => m._id === memberId);
    return member ? member.name || member.fullName || "Unknown" : "Unknown";
    };

  // Fetch users that are not in this group (creator only)
  const fetchAvailableUsers = async () => {
    if (!isGroupCreator) {
      toast.error("Only the group creator can add members");
      return;
    }
    try {
      setLoadingUsers(true);
      const response = await axiosInstance.get("/messages/users", {
        withCredentials: true,
      });

      const raw =
        Array.isArray(response.data) ? response.data :
        Array.isArray(response.data?.users) ? response.data.users :
        Array.isArray(response.data?.data) ? response.data.data :
        [];

      const currentIds = new Set((selectedGroup.members || []).map((m) => m._id));
      const filtered = raw.filter((u) => !currentIds.has(u._id));
      setAvailableUsers(filtered);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to load users");
    } finally {
      setLoadingUsers(false);
    }
  };

  const handleOpenAddMember = () => {
    if (!isGroupCreator) {
      toast.error("Only the group creator can add members");
      return;
    }
    setShowAddMember(true);
    setSearchTerm("");
    setSelectedUsersToAdd([]);
    fetchAvailableUsers();
  };

  // Add selected members (creator only)
  const handleAddMembers = async () => {
    if (!isGroupCreator) {
      toast.error("Only the group creator can add members");
      return;
    }
    if (selectedUsersToAdd.length === 0) {
      toast.error("Please select at least one user to add");
      return;
    }

    try {
      // If your backend supports batch add, replace this loop with one request.
      for (const userId of selectedUsersToAdd) {
        await axiosInstance.put(
          `/group/${selectedGroup._id}/addUser`,
          { userId },
          { withCredentials: true }
        );
      }

      toast.success(`Added ${selectedUsersToAdd.length} member(s)!`);

      const newlyAdded = availableUsers.filter((u) =>
        selectedUsersToAdd.includes(u._id)
      );
      setSelectedUsersToAdd([]);

      const updatedGroup = {
        ...selectedGroup,
        members: [...(selectedGroup.members || []), ...newlyAdded],
      };
      setSelectedGroup(updatedGroup);

      setShowAddMember(false);
      setSearchTerm("");
    } catch (error) {
      console.error("Error adding members:", error);
      if (error?.response?.status === 403) {
        toast.error("You don't have permission to add members");
      } else {
        toast.error("Failed to add members to the group");
      }
    }
  };

  const toggleUserSelection = (userId) => {
    setSelectedUsersToAdd((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const filteredUsers = (availableUsers || []).filter((u) =>
    (u.name || u.fullName || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Rename group (creator only)
  const handleOpenRenameGroup = () => {
    if (!isGroupCreator) {
      toast.error("Only the group creator can rename the group");
      return;
    }
    setNewGroupName(selectedGroup?.name || "");
    setShowRenameGroup(true);
  };

  const handleRenameGroup = async () => {
    if (!isGroupCreator) {
      toast.error("Only the group creator can rename the group");
      return;
    }
    const trimmed = (newGroupName || "").trim();
    if (!trimmed) {
      toast.error("Group name cannot be empty");
      return;
    }
    if (trimmed === selectedGroup?.name) {
      toast.error("Please enter a different name");
      return;
    }

    try {
      setRenamingGroup(true);
      const response = await axiosInstance.put(
        `/group/${selectedGroup._id}/rename`,
        { name: trimmed },
        { withCredentials: true }
      );

      if (response.status === 200) {
        toast.success("Group name updated!");
        setSelectedGroup({ ...selectedGroup, name: trimmed });
        setShowRenameGroup(false);
        setNewGroupName("");
      }
    } catch (error) {
      console.error("Error renaming group:", error);
      if (error?.response?.status === 403) {
        toast.error("Only the group creator can rename the group");
      } else if (error?.response?.status === 400) {
        toast.error("Invalid group name");
      } else {
        toast.error("Failed to rename group");
      }
    } finally {
      setRenamingGroup(false);
    }
  };

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
                  {selectedGroup.members?.length || 0}
                </span>
              </div>
            </div>

            {/* Group info */}
            <div>
              <h3 className="font-medium">{selectedGroup?.name}</h3>
              <p className="text-sm text-base-content/70">
                {selectedGroup.members?.length || 0} members
                {(onlineMembers?.length || 0) > 0 && (
                  <span className="text-green-600">, {onlineMembers.length} online</span>
                )}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Group Info Button */}
            <button
              onClick={() => setShowGroupInfo(true)}
              className="btn btn-ghost btn-sm btn-circle"
            >
              <Info className="size-4" />
            </button>

            {/* Close */}
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
              {/* Name + Rename */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium">Group Name:</label>
                  {isGroupCreator && (
                    <button
                      onClick={handleOpenRenameGroup}
                      className="btn bg-blue-400 btn-sm text-black"
                      title="Rename group"
                    >
                      <Edit3 className="size-4 mr-1" />
                      Rename
                    </button>
                  )}
                </div>
                <p className="text-base-content/80 font-medium">
                  {selectedGroup?.name}
                </p>
              </div>

              {/* Members */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium">
                    Members ({selectedGroup.members?.length || 0}):
                  </label>

                  {isGroupCreator && (
                    <button
                      onClick={handleOpenAddMember}
                      className="btn btn-sm btn-primary"
                      title="Add new members"
                    >
                      <UserPlus className="size-4 mr-1" />
                      Add Members
                    </button>
                  )}
                </div>

                <div className="mt-2 space-y-2">
                  {(selectedGroup.members || []).map((member) => {
                    const isCreatorBadge =
                      member._id === selectedGroup?.createdBy ||
                      member._id === selectedGroup?.createdBy?._id;

                    const isSelf = authUser?._id === member._id;

                    return (
                      <div
                        key={member._id}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-base-200"
                      >
                        <img
                          src={member.avatarUrl || member.profilePic || "/avatar.png"}
                          alt={member.name || "member"}
                          className="size-8 rounded-full"
                        />
                        <div className="flex-1">
                          <span className="text-sm font-medium">
                            {member.name || member.fullName || "Unknown"}
                          </span>
                          <span
                            className={`ml-2 text-xs px-2 py-1 rounded-full ${
                              (onlineUsers || []).includes(member._id)
                                ? "text-green-700 bg-green-100"
                                : "text-gray-500 bg-gray-100"
                            }`}
                          >
                            {(onlineUsers || []).includes(member._id) ? "Online" : "Offline"}
                          </span>
                          {isCreatorBadge && (
                            <span className="ml-2 text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700">
                              Creator
                            </span>
                          )}
                        </div>

                        {/* Remove (creator only, can't remove self) */}
                        {!isSelf && (
                          <button
                            onClick={() => initiateRemoveMember(member._id)}
                            className={`btn btn-sm ${
                              isGroupCreator ? "btn-error text-white" : "btn-disabled"
                            }`}
                            title={
                              isGroupCreator
                                ? "Remove member"
                                : "Only group creator can remove members"
                            }
                            disabled={!isGroupCreator}
                          >
                            <UserMinus className="size-4" />
                            Remove
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Leave Group */}
              <div className="space-y-2">
                <button
                  className="btn btn-error w-full"
                  onClick={() => setShowConfirmLeave(true)}
                >
                  <LogOut className="size-4 mr-2" />
                  Leave Group
                </button>
              </div>
            </div>

            <div className="modal-action">
              <button className="btn" onClick={() => setShowGroupInfo(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Rename Group Modal */}
      {showRenameGroup && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Rename Group</h3>

            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">New Group Name</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
                placeholder="Enter new group name"
                maxLength={50}
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !renamingGroup) {
                    handleRenameGroup();
                  }
                }}
              />
              <label className="label">
                <span className="label-text-alt text-base-content/60">
                  {newGroupName.length}/50 characters
                </span>
              </label>
            </div>

            {newGroupName.trim() && newGroupName.trim() !== selectedGroup?.name && (
              <div className="alert alert-info mb-4">
                <Info className="size-4" />
                <div>
                  <div className="text-sm">
                    <span className="font-medium">Current:</span> "{selectedGroup?.name}"
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">New:</span> "{newGroupName.trim()}"
                  </div>
                </div>
              </div>
            )}

            <div className="modal-action">
              <button
                onClick={handleRenameGroup}
                className="btn btn-primary"
                disabled={
                  !newGroupName.trim() ||
                  newGroupName.trim() === selectedGroup?.name ||
                  renamingGroup
                }
              >
                {renamingGroup ? (
                  <>
                    <span className="loading loading-spinner loading-sm mr-2"></span>
                    Renaming...
                  </>
                ) : (
                  "Update Name"
                )}
              </button>
              <button
                onClick={() => {
                  setShowRenameGroup(false);
                  setNewGroupName("");
                }}
                className="btn"
                disabled={renamingGroup}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Members Modal */}
      {showAddMember && (
        <div className="modal modal-open">
          <div className="modal-box max-w-md">
            <h3 className="font-bold text-lg mb-4">Add Members to Group</h3>

            <div className="form-control mb-4">
              <div className="input-group">
                <span className="bg-base-200">
                  <Search className="size-4" />
                </span>
                <input
                  type="text"
                  placeholder="Search users..."
                  className="input input-bordered w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {selectedUsersToAdd.length > 0 && (
              <div className="alert alert-info mb-4">
                <Info className="size-4" />
                <span>{selectedUsersToAdd.length} user(s) selected</span>
              </div>
            )}

            <div className="max-h-60 overflow-y-auto">
              {loadingUsers ? (
                <div className="flex justify-center py-4">
                  <span className="loading loading-spinner loading-md"></span>
                </div>
              ) : filteredUsers.length === 0 ? (
                <div className="text-center py-4 text-base-content/60">
                  {searchTerm ? "No users found matching your search" : "No available users to add"}
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredUsers.map((user) => (
                    <div key={user._id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-base-200">
                      <input
                        type="checkbox"
                        className="checkbox checkbox-primary"
                        checked={selectedUsersToAdd.includes(user._id)}
                        onChange={() => toggleUserSelection(user._id)}
                      />
                      <img
                        src={user.avatarUrl || user.profilePic || "/avatar.png"}
                        alt={user.name || "user"}
                        className="size-8 rounded-full"
                      />
                      <div className="flex-1">
                        <span className="text-sm font-medium">
                          {user.name || user.fullName || "Unknown"}
                        </span>
                        <div className="text-xs text-base-content/60">
                          {user.email || "No email"}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="modal-action">
              <button
                onClick={handleAddMembers}
                className="btn btn-primary"
                disabled={selectedUsersToAdd.length === 0 || loadingUsers}
              >
                Add {selectedUsersToAdd.length} Member(s)
              </button>
              <button
                onClick={() => {
                  setShowAddMember(false);
                  setSelectedUsersToAdd([]);
                  setSearchTerm("");
                }}
                className="btn"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Leave Group Confirmation Modal */}
      {showConfirmLeave && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="text-lg font-bold">Leave Group</h3>
            <p className="py-4">
              Are you sure you want to leave "{selectedGroup?.name}"? You won't be able to see messages or rejoin unless someone adds you back.
            </p>
            <div className="modal-action">
              <button onClick={handleLeaveGroup} className="btn btn-error">
                Leave Group
              </button>
              <button onClick={() => setShowConfirmLeave(false)} className="btn">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Remove Member Confirmation Modal */}
      {showConfirmRemove && memberToRemove && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="text-lg font-bold">Remove Member</h3>
            <p className="py-4">
              Are you sure you want to remove "{getMemberName(memberToRemove)}" from "{selectedGroup?.name}"?
              They will no longer be able to see messages or participate in this group.
            </p>
            <div className="modal-action">
              <button onClick={() => handleRemoveMember(memberToRemove)} className="btn btn-error">
                Remove Member
              </button>
              <button
                onClick={() => {
                  setShowConfirmRemove(false);
                  setMemberToRemove(null);
                }}
                className="btn"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GroupChatHeader;
