

import { getAllUser, toggleBlockUnblock, updateUser } from "@/services/helper/apiFunction/getAllUser.function"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

export const useGetAllUser = ({page, limit}: {page: number, limit: number})=>{
    return useQuery({
        queryKey: ["getAllUser", page, limit],
        queryFn: ()=> getAllUser({page, limit}),
        placeholderData: (previousData)=> previousData, //when fetch new page then it keeps old data for better ui 
        enabled: page >= 0 && limit > 0 // it helps us to pause and avoid unnecessary rendering
        
    })
}


export const useToggleBlockUnblockUser = ()=>{
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ["block-unblock"],
        mutationFn: ({userId, newStatus}: {userId: string, newStatus: "active" | "blocked"})=> toggleBlockUnblock({userId: userId, newStatus: newStatus}),
        onSuccess:(res)=>{
            console.log("res", res)
            queryClient.invalidateQueries({queryKey: ["getAllUser"]})
            if(res?.[0].status === "blocked"){
                toast.success("Successfully blocked user")
            }else{
                toast.success("Successfully unblock user")
            }

        },
        onError: (err)=>{
            console.log("error", err)

        }
    })
}


export const useChangeUser = ()=>{
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ["chnageUser"],
        mutationFn: ({userId, newChange}: {userId: string, newChange: string})=> updateUser({userId: userId, newChange: newChange}),
        onSuccess:(res)=>{
            console.log("res", res)
            queryClient.invalidateQueries({queryKey: ["getAllUser"]})
            if(res){
                toast.success("Successfully change user role!")
            }

        },
        onError: (err)=>{
            console.log("error", err)

        }
    })
}