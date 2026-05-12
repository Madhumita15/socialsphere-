"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useUserReport } from "@/hooks/useUserReport";
import { ReportDialogInterface, ReportValueType } from "@/typescript/type/userReport.type";




// 1. Validation Schema
const reportSchema = yup.object({
  category: yup.string().required("Please select a reason"),
  description: yup
    .string()
    .min(5, "Minimum 5 characters required")
    .required("Required"),
});

export function ReportDialog({ postId, userId, open, setOpen, type }: ReportDialogInterface){
    const {mutate: reportMutate, isPending:reportIsPending} = useUserReport()
    console.log("reportMutate", reportMutate)

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<ReportValueType>({
    resolver: yupResolver(reportSchema),
    defaultValues: {
      category: "spam",
      description: "",
    },
  });

  const selectedCategory = watch("category");



  const onSubmit = async (data: ReportValueType) => {
    const newData =  { ...data, postId:postId, userId:userId, report_type:type  }
    await reportMutate(newData)
    toast.success("Thanks for reporting. We've hidden this post and our team will review it");
    setOpen(false);
    reset()
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-sm bg-gray-950 border border-gray-800 text-white shadow-2xl">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-white">
              Report Content
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 max-h-96 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
            <div className="space-y-3">
              <label className="text-md font-medium text-blue-400">
                Why are you reporting this?
              </label>

              <div className="grid gap-3 pt-3">
                {[
                  { id: "spam", label: "Spam or Misleading" },
                  { id: "harassment", label: "Harassment or Abuse" },
                  { id: "explicit", label: "Explicit Content" },
                ].map((item) => (
                  <label
                    key={item.id}
                    className={`flex items-center gap-3 p-3 rounded-md border transition-all cursor-pointer ${
                      selectedCategory === item.id
                        ? "bg-zinc-900 border-orange-500"
                        : "bg-zinc-900/50 border-zinc-800 hover:bg-zinc-900"
                    }`}
                  >
                    <input
                      type="radio"
                      value={item.id}
                      {...register("category")}
                      className="w-4 h-4 accent-orange-500 cursor-pointer"
                    />
                    <span className="text-sm font-medium text-gray-200">
                      {item.label}
                    </span>
                  </label>
                ))}
              </div>
              {errors.category && (
                <p className="text-xs text-red-500">
                  {errors.category.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="desc"
                className="text-md pb-3 font-medium text-blue-400"
              >
                Additional Details
              </label>
              <textarea
                id="desc"
                rows={5}
                placeholder="Tell us more..."
                {...register("description")}
                className={`w-full p-3  bg-zinc-900 border rounded-md text-white focus:outline-none focus:ring-1 focus:ring-orange-500 transition-all text-sm resize-none ${
                  errors.description ? "border-red-500" : "border-zinc-700"
                }`}
              />
              {errors.description && (
                <p className="text-xs text-red-500">
                  {errors.description.message}
                </p>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <DialogFooter className="flex gap-3 pt-4 bg-slate-900 border-t border-gray-900">
            <DialogClose className="inline-flex h-9 items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors bg-gray-800 border border-gray-700 text-white hover:bg-gray-700 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50">
              Cancel
            </DialogClose>

            <Button
              type="submit"
              disabled={reportIsPending}
              className="bg-linear-to-r from-[#3a170c] to-orange-500 hover:from-[#FF7354] hover:to-orange-950 text-white font-semibold disabled:opacity-50 transition-all"
            >
              {reportIsPending ? (
                <>
                  <Spinner className="w-4 h-4 mr-2" />
                  Processing...
                </>
              ) : (
                `Submit Report`
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

