import { approveModeratorFlaggedControl, getModeratorFlaggedControl, rejectModeratorFlaggedControl } from "@/services/helper/apiFunction/moderatorFlaggedControl.function";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useGetModeratorFlaggedControl = () => {
  return useQuery({
    queryKey: ["get-flaged-post"],
    queryFn: getModeratorFlaggedControl,
    staleTime: 1000 * 60, // Data stays fresh for 1 minute
    refetchOnWindowFocus: true, // Auto-update when moderator switches back to the tab
  });
};

export const useApproveModeratorFlaggedControl = ()=>{
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ["approve-flagged-post"],
        mutationFn: (post_id:string)=> approveModeratorFlaggedControl(post_id),
        onSuccess: (res)=>{
            if(res){
                toast.success("Post approve successfuly!");

            }
            queryClient.invalidateQueries({queryKey: ["getpost"]})
            queryClient.invalidateQueries({queryKey: ["inifinitypost"]})
            queryClient.invalidateQueries({ queryKey: ["get-moderator-report"] });
            queryClient.invalidateQueries({queryKey: ["get-flaged-post"]})
        } 
    })
}


export const useRejectModeratorFlaggedControl = ()=>{
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ["reject-flagged-post"],
        mutationFn: (post_id:string)=> rejectModeratorFlaggedControl(post_id),
        onSuccess: (res)=>{
            if(res){
                toast.success("Post approve successfuly!");

            }
            queryClient.invalidateQueries({queryKey: ["getpost"]})
            queryClient.invalidateQueries({queryKey: ["inifinitypost"]})
            queryClient.invalidateQueries({ queryKey: ["get-moderator-report"] });
            queryClient.invalidateQueries({queryKey: ["get-flaged-post"]})
        } 
    })
}

