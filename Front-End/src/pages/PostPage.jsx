// src/pages/PostPage.jsx
import { useRef } from "react";
import CreatePost from "../components/CreatePost";
import PostFeed from "../components/PostFeed";
import PostSkeleton from "../components/skeletons/PostSkeleton";
import { usepostStore } from "../store/usepostStore";

export default function PostPage() {
  const { isFetchingPosts } = usepostStore();

  return (
    <div className="container mx-auto max-w-2xl px-3 pt-20 pb-10">
      <div className="space-y-4">
        <CreatePost />
        {isFetchingPosts ? <PostSkeleton /> : <PostFeed />}
      </div>
    </div>
  );
}
