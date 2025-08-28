// src/components/PostHeader.jsx
import { Ellipsis, Pencil, Trash2 } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { usepostStore } from "../store/usepostStore";
import { useState } from "react";
import PostEditModal from "./PosteditModal";

export default function PostHeader({ post }) {
  const { authUser } = useAuthStore();
  const { deletePost } = usepostStore();
  const canEdit = authUser?._id === post?.senderId?._id;
  const [openEdit, setOpenEdit] = useState(false);

  return (
    <>
      <div className="px-4 pt-4 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="w-11 rounded-full ring ring-primary/15">
              <img
                src={post?.senderId?.profilePic || "/avatar.png"}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  const name = encodeURIComponent(post?.senderId?.fullName || "User");
                  e.currentTarget.src = `https://ui-avatars.com/api/?name=${name}&background=random`;
                }}
              />
            </div>
          </div>
          <div>
            <div className="font-semibold">{post?.senderId?.fullName || "User"}</div>
            <div className="text-xs opacity-60">{new Date(post.createdAt).toLocaleString()}</div>
          </div>
        </div>

        {canEdit ? (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-sm">
              <Ellipsis className="w-5 h-5" />
            </div>
            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-44 p-2 shadow">
              <li>
                <button onClick={() => setOpenEdit(true)}>
                  <Pencil className="w-4 h-4" />
                  Edit Post
                </button>
              </li>
              <li>
                <button className="text-error" onClick={() => deletePost(post._id)}>
                  <Trash2 className="w-4 h-4" />
                  Delete Post
                </button>
              </li>
            </ul>
          </div>
        ) : null}
      </div>

      <PostEditModal open={openEdit} onClose={() => setOpenEdit(false)} post={post} />
    </>
  );
}
