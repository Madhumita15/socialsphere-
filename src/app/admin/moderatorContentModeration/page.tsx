"use client";

import Image from "next/image";
import { Check, X, ShieldAlert } from "lucide-react";
import {
  useApproveModeratorFlaggedControl,
  useGetModeratorFlaggedControl,
  useRejectModeratorFlaggedControl,
} from "@/hooks/useModeratorFlaggedControl";
import { Spinner } from "@/components/ui/spinner";

export default function ContentModerationPage() {
  const { data } = useGetModeratorFlaggedControl();
  // console.log("data", data);
  const {
    mutate: rejectMutate,
    isPending: rejectIsPending,
    variables: rejectVariables,
  } = useRejectModeratorFlaggedControl();
  const {
    mutate: approveMutate,
    isPending: approveIsPending,
    variables: approveVariables,
  } = useApproveModeratorFlaggedControl();

  return (
    <div className="pl-64 bg-[#151515] min-h-screen p-8 text-white">
      <div className="mb-10">
        <h1 className="text-3xl font-black text-[#D493FF] flex items-center gap-3">
          <ShieldAlert size={32} />
          Content Review
        </h1>
        <p className="text-gray-500 mt-2">
          Approve or Reject flagged media and comments.
        </p>
      </div>

      {/* 2nd Section: Flagged Posts Grid */}
      <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
        Flagged Posts{" "}
        <span className="bg-gray-800 text-[#D493FF] px-2 py-0.5 rounded text-xs">
          {data?.length}
        </span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {data?.map((post) => {
          const isApproveThis =
            approveIsPending && approveVariables === post.id;
          const isRejectThis = rejectIsPending && rejectVariables === post.id;
          return (
            <div
              key={post.id}
              className="bg-[#1A1A1A] border border-gray-700 rounded-2xl overflow-hidden group"
            >
              {/* The "Review" Image */}
              <div className="relative aspect-square bg-black">
                <Image
                  width={"50"}
                  height={"50"}
                  src={post.media_url}
                  alt="flagged"
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                />
              </div>

              {/* Post Details */}
              <div className="p-4">
                <p className="text-xs text-[#D493FF] font-bold mb-1">
                  @{post.author.fullname}
                </p>
                <p className="text-sm text-gray-400 line-clamp-2 italic">
                  {post.caption}
                </p>

                <div className="mt-2 flex flex-wrap gap-1">
                  {post.report
                    ?.slice(0, 3)
                    .map((r: { id: string; category: string }) => (
                      <span
                        key={r.id}
                        className="text-[10px] bg-red-950 text-red-400 px-1.5 py-0.5 rounded border border-red-900"
                      >
                        {r.category}
                      </span>
                    ))}
                </div>

                {/* Approve / Reject Buttons */}

                <div className="grid grid-cols-2 gap-3 mt-4">
                  <button
                    disabled={isApproveThis}
                    onClick={() => approveMutate(post.id)}
                    className="flex items-center cursor-pointer justify-center gap-2 bg-gray-800 hover:bg-green-600 text-white py-2 rounded-xl text-sm font-bold border border-gray-700 transition-all"
                  >
                    <Check size={16} />{" "}
                    {isApproveThis ? (
                      <Spinner width={5} height={5} />
                    ) : (
                      "Approve"
                    )}
                  </button>
                  <button
                    disabled={isRejectThis}
                    onClick={() => rejectMutate(post.id)}
                    className="flex items-center cursor-pointer justify-center gap-2 bg-gray-800 hover:bg-red-700 text-white py-2 rounded-xl text-sm font-bold border border-gray-700 transition-all"
                  >
                    <X size={16} />{" "}
                    {isRejectThis ? (
                      <Spinner width={5} height={5} />
                    ) : (
                      " Reject"
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {data?.length === 0 && (
        <div className="flex justify-center items-center mt-10">
          <h1 className="text-sm text-gray-500">No Flagged Post</h1>
        </div>
      )}

      {/* 3rd Section: Moderate Comments List */}
      {/* <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
        Reported Comments <span className="bg-gray-800 text-[#D493FF] px-2 py-0.5 rounded text-xs">{items.filter(i => i.type === 'comment').length}</span>
      </h2>

      <div className="space-y-4">
        {items.filter(i => i.type === 'comment').map((comment) => (
          <div key={comment.id} className="bg-[#1A1A1A] border border-gray-700 p-5 rounded-2xl flex items-center justify-between">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-gray-800 rounded-full text-[#D493FF]">
                <MessageCircle size={20} />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-200">
                  <span className="text-[#D493FF]">@{comment.author}</span> on <span className="text-gray-500 underline">Post {comment.post_id}</span>
                </p>
                <p className="text-gray-400 mt-1">{comment.text}</p>
                <span className="text-[10px] text-red-400 font-black uppercase mt-2 block tracking-widest">Reason: {comment.reason}</span>
              </div>
            </div>

            <div className="flex gap-2">
               <button 
              //  onClick={() => handleAction(comment.id, "approve")}
                className="p-2 bg-gray-800 hover:bg-green-600 rounded-lg border border-gray-700 transition-colors">
                  <Check size={18} />
               </button>
               <button
                // onClick={() => handleAction(comment.id, "reject")}
                 className="p-2 bg-gray-800 hover:bg-red-700 rounded-lg border border-gray-700 transition-colors">
                  <X size={18} />
               </button>
            </div>
          </div>
        ))}
      </div> */}
    </div>
  );
}
