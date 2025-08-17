import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useGroupChatStore = create((set, get) => ({
  groupMessages: [],
  groups: [],
  selectedGroup: null,
  isGroupsLoading: false,
  isGroupMessagesLoading: false,

  // Get all groups the user is part of
  getGroups: async () => {
    set({ isGroupsLoading: true });
    try {
      const res = await axiosInstance.get("/groups");
      set({ groups: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch groups");
    } finally {
      set({ isGroupsLoading: false });
    }
  },

  // Get messages for a specific group
  getGroupMessages: async (groupId) => {
    set({ isGroupMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/group/${groupId}/messages`);
      set({ groupMessages: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch group messages");
    } finally {
      set({ isGroupMessagesLoading: false });
    }
  },

  // Send a message to a group
  sendGroupMessage: async (groupId, messageData) => {
    const { groupMessages } = get();
    try {
      const res = await axiosInstance.post(`/group/${groupId}/send`, messageData);
      // Optimistically update the UI
      set({ groupMessages: [...groupMessages, res.data] });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send message");
    }
  },

  // Create a new group
  createGroup: async (groupData) => {
    try {
      const res = await axiosInstance.post("/gcreate", groupData);
      if (res.data.success) {
        // Refresh groups list
        get().getGroups();
        toast.success("Group created successfully!");
        return res.data;
      } else {
        toast.error(res.data.message || "Failed to create group");
        return null;
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create group");
      return null;
    }
  },

  // Subscribe to group messages via Socket.io
  subscribeToGroupMessages: (groupId) => {
    const socket = useAuthStore.getState().socket;
    if (!socket) return;

    // Listen for new group messages
    socket.on("newGroupMessage", (newMessage) => {
      const { selectedGroup, groupMessages } = get();
      
      // Only update if the message is for the currently selected group
      if (selectedGroup && newMessage.groupId === selectedGroup._id) {
        set({
          groupMessages: [...groupMessages, newMessage],
        });
      }
    });

    // Join the group room
    socket.emit("joinGroup", groupId);
  },

  // Unsubscribe from group messages
  unsubscribeFromGroupMessages: () => {
    const socket = useAuthStore.getState().socket;
    if (!socket) return;

    const { selectedGroup } = get();
    
    // Leave the group room
    if (selectedGroup) {
      socket.emit("leaveGroup", selectedGroup._id);
    }
    
    socket.off("newGroupMessage");
  },

  // Subscribe to group updates (when new groups are created, members added, etc.)
  subscribeToGroupUpdates: () => {
    const socket = useAuthStore.getState().socket;
    if (!socket) return;

    socket.on("groupCreated", (newGroup) => {
      const { groups } = get();
      set({ groups: [...groups, newGroup] });
      toast.success(`You were added to group: ${newGroup.name}`);
    });

    socket.on("userAddedToGroup", ({ group, user }) => {
      const { groups } = get();
      const updatedGroups = groups.map(g => 
        g._id === group._id ? { ...g, members: [...g.members, user] } : g
      );
      set({ groups: updatedGroups });
      toast.info(`${user.name} joined the group`);
    });
  },

  // Unsubscribe from group updates
  unsubscribeFromGroupUpdates: () => {
    const socket = useAuthStore.getState().socket;
    if (!socket) return;

    socket.off("groupCreated");
    socket.off("userAddedToGroup");
  },

  // Add user to group
  addUserToGroup: async (groupId, userId) => {
    try {
      const res = await axiosInstance.put(`/group/${groupId}/addUser`, { userId });
      
      // Update the selected group if it's the one being modified
      const { selectedGroup, groups } = get();
      if (selectedGroup && selectedGroup._id === groupId) {
        set({ selectedGroup: res.data });
      }
      
      // Update groups list
      const updatedGroups = groups.map(group => 
        group._id === groupId ? res.data : group
      );
      set({ groups: updatedGroups });
      
      toast.success("User added to group successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add user to group");
    }
  },

  // Set selected group
  setSelectedGroup: (selectedGroup) => {
    // Unsubscribe from previous group
    if (get().selectedGroup) {
      get().unsubscribeFromGroupMessages();
    }
    
    set({ selectedGroup, groupMessages: [] });
    
    // Subscribe to new group if one is selected
    if (selectedGroup) {
      get().subscribeToGroupMessages(selectedGroup._id);
    }
  },

  // Initialize group chat store
  initialize: () => {
    get().subscribeToGroupUpdates();
  },

  // Cleanup function
  cleanup: () => {
    get().unsubscribeFromGroupMessages();
    get().unsubscribeFromGroupUpdates();
  },
}));