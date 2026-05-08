import { allPostWithoutPagination, getAllAdminPost, postAction } from "@/services/helper/apiFunction/adminModeration.function"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export const useAdminGetALLPostWithoutPagination = ()=>{
    return useQuery({
        queryKey: ["get-all-post-without-pagination"],
        queryFn: allPostWithoutPagination
    })
}

export const useGetAllAdminPost = ({page, limit, search}:{page: number, limit: number, search?: string})=>{
    return useQuery({
        queryKey: ["admin-getallpost", page, limit, search],
        queryFn: ({signal})=> getAllAdminPost({page, limit, search, signal}),
        placeholderData: (previousData)=> previousData,
        enabled: page >= 0 && limit > 0,
        staleTime: 2000 // Keep data fresh for 5 seconds to prevent rapid refetches
    })
} 

export const usePostAction = ()=>{
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ["toggleBoost"],
        mutationFn: ({post_id, action, currentValue}: {post_id: string, action: "TOGGLE_PIN" | "BOOST_SCORE" | "REMOVE_POST", currentValue?: boolean | number})=> postAction({post_id, action, currentValue}),
        onSuccess: (res)=>{
            console.log(res)
            queryClient.invalidateQueries({queryKey: ["admin-getallpost"]})
            queryClient.invalidateQueries({queryKey: ["getpostbyid"]})
            queryClient.invalidateQueries({queryKey: ["infinitypost"]})
            queryClient.invalidateQueries({queryKey: ["getpost"]})


        }
    })
}