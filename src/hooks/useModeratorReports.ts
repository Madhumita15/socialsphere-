import {
  getModeratorReport,
  getModeratorReportById,
  getReportTrends,
  removeModeratorReports,
  resolveModeratorReports,
} from "@/services/helper/apiFunction/userReport.function";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useGetModeratorReports = () => {
  return useQuery({
    queryKey: ["get-moderator-report"],
    queryFn: getModeratorReport,
  });
};

export const useGetModeratorReportsById = (id: string) => {
  return useQuery({
    queryKey: ["get-moderator-report_id"],
    queryFn: () => getModeratorReportById(id),
    enabled: !!id,
  });
};

export const useResoveModeratorReports = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["resolve-moderator-report"],
    mutationFn: ({id,postId}:{id:string, postId:string}) => resolveModeratorReports({id, postId}),
    onSuccess: (res) => {
      if (res) {
        toast.success("Report resolved successfully!");
      }
      queryClient.invalidateQueries({ queryKey: ["get-moderator-report"] });
      queryClient.invalidateQueries({ queryKey: ["getPost"] });
      queryClient.invalidateQueries({ queryKey: ["infinitypost"] });
      queryClient.invalidateQueries({queryKey: ["get-flaged-post"]})
    },
  });
};

export const useRemoveModeratorReports = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["remove-moderator-report"],
    mutationFn: ({report_id, post_id}:{report_id: string, post_id:string}) => removeModeratorReports({report_id:report_id, post_id:post_id}),
    onSuccess: (res) => {
        if(res){
            toast.success("Report remove successfully!")
        }
      queryClient.invalidateQueries({ queryKey: ["get-moderator-report"] });
      queryClient.invalidateQueries({ queryKey: ["getPost"] });
      queryClient.invalidateQueries({ queryKey: ["infinitypost"] });
      queryClient.invalidateQueries({queryKey: ["get-flaged-post"]})
    },
  });
};



export const useGetReportTrends = ()=>{
    return useQuery({
        queryKey: ["get-report-trend"],
        queryFn: getReportTrends
    })
}