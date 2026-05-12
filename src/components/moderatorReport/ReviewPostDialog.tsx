import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useGetModeratorReportsById } from "@/hooks/useModeratorReports";
import { ReviewPostDialogInterface } from "@/typescript/interface/admin.interface";
import { Eye, Calendar, ShieldAlert } from "lucide-react";
import Image from "next/image";



export function ReviewPostDialog({
  onClose,
  report_id,
}: ReviewPostDialogInterface) {
  const isOpen = !!report_id;
  const { data } = useGetModeratorReportsById(report_id as string);
  const isVideo = data?.target_post?.media_type === "video";

  console.log("data", data)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-[#0A0A0A] border border-zinc-800 text-white p-0 shadow-2xl rounded-xl overflow-hidden">
        {/* Header Section */}
        <div className="p-5 border-b border-zinc-800 bg-[#0F0F0F]">
          <DialogHeader>
            <DialogTitle className="flex flex-col gap-1">
              <div className="text-[#D493FF] flex items-center gap-2 text-xl font-bold">
                <ShieldAlert size={22} />
                Evidence Review
              </div>
              <div className="flex items-center gap-1.5 text-zinc-500 font-medium text-xs mt-1">
                <Calendar size={13} />
                <span>
                  Submitted on:{" "}
                  {data?.created_at
                    ? new Date(data.created_at).toLocaleDateString()
                    : "Loading..."}
                </span>
              </div>
            </DialogTitle>
          </DialogHeader>
        </div>

        {data && (
          /* Use a specific height for the scroll area so the image has room */
          <div className="max-h-[50vh]  overflow-y-auto no-scrollbar">
            {/* 1. Media Section - Fixed height container */}
            <div className=" rounded-full flex items-center justify-center overflow-hidden  border-gray-800 p-3">
              {data?.target_post?.media_url ? (
                isVideo ? (
                  <video
                    src={data.target_post.media_url}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-24 h-24 rounded-full object-cover "
                  />
                ) : (
                  <Image
                    src={data.target_post.media_url}
                    alt="image"
                    height={100}
                    width={100}
                    className="w-24 h-24 rounded-full object-cover "
                  />
                )
              ) : (
                <div className="flex flex-col items-center justify-center py-24 text-zinc-600">
                  <Eye size={48} className="mb-2 opacity-20" />
                  <p className="text-xs uppercase tracking-widest">
                    No Media Attached
                  </p>
                </div>
              )}
            </div>

            {/* 2. Content Section */}
            <div className="p-6 space-y-6 bg-[#0A0A0A]">
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-[#D493FF] uppercase tracking-widest">
                  Post Caption
                </span>
                <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800">
                  <p className="text-base text-zinc-200 leading-relaxed italic">
                    {data?.target_post?.caption ||
                      "This post has no caption content."}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest">
                  Report Reason
                </span>
                <div className="p-4 rounded-xl bg-red-950/10 border border-red-900/20">
                  <p className="text-sm text-red-200/90 leading-relaxed font-medium">
                    {data?.description ||
                      data?.target_post?.description ||
                      "No specific reason provided."}
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-zinc-800 flex flex-col items-center">
                <div className="text-[10px] font-mono text-zinc-600 bg-zinc-900/50 px-3 py-1 rounded border border-zinc-800/50 mb-4">
                  CASE_ID: {report_id}
                </div>
                <p className="text-[9px] text-zinc-700 uppercase tracking-[0.4em]">
                  Confidential Moderation Log
                </p>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
